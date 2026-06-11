import "server-only";

import crypto from "crypto";
import { educationLmsCourses } from "../components/siteData";
import { getSql } from "./db";

// Completion thresholds used for certificate eligibility. Computed server-side
// so the rule is authoritative and cannot be spoofed by the client.
export const COMPLETION_LESSON_PERCENT = 80;
export const QUIZ_PASS_PERCENT = 70;

const fallbackLearnerState = {
  enrolled: false,
  completedLessons: [],
  quizAnswers: {},
  assignmentDraft: "",
  assignmentSubmitted: false,
  lessonPercent: 0,
  quizPercent: 0,
  certificateReady: false,
  certificate: null
};

const globalForLms = globalThis;

function toBool(value) {
  return value === true || value === "true";
}

function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseJson(value, fallback) {
  if (!value) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function isTransientDatabaseConnectivityError(error) {
  const code = typeof error?.code === "string" ? error.code.toUpperCase() : "";
  return (
    code === "CONNECT_TIMEOUT" ||
    code === "ECONNREFUSED" ||
    code === "ECONNRESET" ||
    code === "ENOTFOUND" ||
    code === "ETIMEDOUT"
  );
}

function logLmsError(message, error) {
  if (isTransientDatabaseConnectivityError(error)) {
    console.warn(`${message} The LMS is using fallback course data.`, error?.code || "DB_UNAVAILABLE");
    return;
  }

  console.error(message, error);
}

export function validateLearner(payload) {
  const data = {
    fullName: normalizeText(payload.fullName),
    email: normalizeEmail(payload.email),
    courseId: Number(payload.courseId)
  };
  const fieldErrors = {};

  if (data.fullName.length < 2 || data.fullName.length > 100) {
    fieldErrors.fullName = "Enter the learner's full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    fieldErrors.email = "Enter a valid learner email.";
  }

  if (!Number.isFinite(data.courseId)) {
    fieldErrors.courseId = "Choose a course to enroll in.";
  }

  return {
    ok: Object.keys(fieldErrors).length === 0,
    data,
    fieldErrors
  };
}

export async function ensureLmsSchema(sql = getSql()) {
  if (!sql) {
    return false;
  }

  if (!globalForLms.__humanityLmsSchemaPromise) {
    globalForLms.__humanityLmsSchemaPromise = createLmsSchema(sql).catch((error) => {
      globalForLms.__humanityLmsSchemaPromise = null;
      throw error;
    });
  }

  await globalForLms.__humanityLmsSchemaPromise;
  return true;
}

async function createLmsSchema(sql) {
  await sql`
    create table if not exists lms_learners (
      id integer generated always as identity primary key,
      full_name text not null,
      email text not null unique,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists lms_accounts (
      id integer generated always as identity primary key,
      learner_id integer references lms_learners(id) on delete set null,
      full_name text not null,
      email text not null unique,
      password_hash text not null,
      role text not null default 'student',
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists lms_sessions (
      id integer generated always as identity primary key,
      account_id integer not null references lms_accounts(id) on delete cascade,
      token_hash text not null unique,
      expires_at timestamptz not null,
      created_at timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists lms_courses (
      id integer generated always as identity primary key,
      instructor_account_id integer references lms_accounts(id) on delete set null,
      slug text not null unique,
      display_order integer not null default 1,
      track text not null,
      title text not null,
      summary text not null,
      level text not null,
      duration text not null,
      outcomes jsonb not null default '[]'::jsonb,
      resource_href text,
      external boolean not null default false,
      is_published boolean not null default true,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await sql`alter table lms_courses add column if not exists instructor_account_id integer references lms_accounts(id) on delete set null`;
  await sql`alter table lms_courses add column if not exists price_cents integer not null default 0`;
  await sql`alter table lms_courses add column if not exists language text not null default 'English'`;
  await sql`alter table lms_courses add column if not exists requirements jsonb not null default '[]'::jsonb`;

  await sql`
    create table if not exists lms_modules (
      id integer generated always as identity primary key,
      course_id integer not null references lms_courses(id) on delete cascade,
      display_order integer not null default 1,
      title text not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists lms_lessons (
      id integer generated always as identity primary key,
      module_id integer not null references lms_modules(id) on delete cascade,
      display_order integer not null default 1,
      title text not null,
      format text not null,
      duration text not null,
      objective text not null,
      content text,
      video_url text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists lms_quiz_questions (
      id integer generated always as identity primary key,
      course_id integer not null references lms_courses(id) on delete cascade,
      display_order integer not null default 1,
      question text not null,
      options jsonb not null,
      answer_index integer not null default 0,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists lms_assignments (
      id integer generated always as identity primary key,
      course_id integer not null references lms_courses(id) on delete cascade,
      prompt text not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists lms_enrollments (
      id integer generated always as identity primary key,
      learner_id integer not null references lms_learners(id) on delete cascade,
      course_id integer not null references lms_courses(id) on delete cascade,
      created_at timestamptz not null default now(),
      unique (learner_id, course_id)
    )
  `;

  await sql`
    create table if not exists lms_lesson_progress (
      learner_id integer not null references lms_learners(id) on delete cascade,
      lesson_id integer not null references lms_lessons(id) on delete cascade,
      completed_at timestamptz not null default now(),
      primary key (learner_id, lesson_id)
    )
  `;

  await sql`
    create table if not exists lms_quiz_attempts (
      id integer generated always as identity primary key,
      learner_id integer not null references lms_learners(id) on delete cascade,
      course_id integer not null references lms_courses(id) on delete cascade,
      answers jsonb not null,
      score integer not null,
      total integer not null,
      created_at timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists lms_assignment_submissions (
      id integer generated always as identity primary key,
      learner_id integer not null references lms_learners(id) on delete cascade,
      course_id integer not null references lms_courses(id) on delete cascade,
      response text not null,
      status text not null default 'submitted',
      reviewed_notes text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists lms_certificates (
      id integer generated always as identity primary key,
      learner_id integer not null references lms_learners(id) on delete cascade,
      course_id integer not null references lms_courses(id) on delete cascade,
      serial text not null unique,
      issued_at timestamptz not null default now(),
      unique (learner_id, course_id)
    )
  `;

  await sql`create index if not exists lms_modules_course_idx on lms_modules (course_id, display_order)`;
  await sql`create index if not exists lms_lessons_module_idx on lms_lessons (module_id, display_order)`;
  await sql`create index if not exists lms_quiz_course_idx on lms_quiz_questions (course_id, display_order)`;
  await sql`create index if not exists lms_enrollments_learner_idx on lms_enrollments (learner_id, created_at desc)`;
  await sql`create index if not exists lms_accounts_role_idx on lms_accounts (role, created_at desc)`;
  await sql`create index if not exists lms_sessions_account_idx on lms_sessions (account_id, expires_at desc)`;
  await sql`create index if not exists lms_certificates_learner_idx on lms_certificates (learner_id, issued_at desc)`;
  await seedFallbackCoursesIfEmpty(sql);
}

async function seedFallbackCoursesIfEmpty(sql) {
  const [{ total }] = await sql`select count(*)::int as total from lms_courses`;
  if (total > 0) {
    return;
  }

  for (const [courseIndex, course] of educationLmsCourses.entries()) {
    const [courseRow] = await sql`
      insert into lms_courses (
        slug,
        display_order,
        track,
        title,
        summary,
        level,
        duration,
        outcomes,
        resource_href,
        external,
        is_published
      )
      values (
        ${course.id},
        ${courseIndex + 1},
        ${course.track},
        ${course.title},
        ${course.summary},
        ${course.level},
        ${course.duration},
        ${sql.json(course.outcomes || [])},
        ${course.resourceHref || null},
        ${Boolean(course.external)},
        ${true}
      )
      returning id
    `;

    for (const [moduleIndex, module] of course.modules.entries()) {
      const [moduleRow] = await sql`
        insert into lms_modules (course_id, display_order, title)
        values (${courseRow.id}, ${moduleIndex + 1}, ${module.title})
        returning id
      `;

      for (const [lessonIndex, lesson] of module.lessons.entries()) {
        await sql`
          insert into lms_lessons (
            module_id,
            display_order,
            title,
            format,
            duration,
            objective,
            content,
            video_url
          )
          values (
            ${moduleRow.id},
            ${lessonIndex + 1},
            ${lesson.title},
            ${lesson.format},
            ${lesson.duration},
            ${lesson.objective || ""},
            ${lesson.content || lesson.objective || ""},
            ${lesson.videoUrl || null}
          )
        `;
      }
    }

    for (const [questionIndex, question] of course.quiz.entries()) {
      await sql`
        insert into lms_quiz_questions (
          course_id,
          display_order,
          question,
          options,
          answer_index
        )
        values (
          ${courseRow.id},
          ${questionIndex + 1},
          ${question.question},
          ${sql.json(question.options || [])},
          ${Number(question.answer || 0)}
        )
      `;
    }

    await sql`
      insert into lms_assignments (course_id, prompt)
      values (${courseRow.id}, ${course.assignment || "Submit your course assignment evidence."})
    `;
  }
}

function formatFallbackCourse(course, index) {
  return {
    ...course,
    dbId: null,
    id: course.id,
    displayOrder: index + 1,
    isPublished: true,
    modules: course.modules.map((module, moduleIndex) => ({
      ...module,
      dbId: null,
      displayOrder: moduleIndex + 1,
      lessons: module.lessons.map((lesson, lessonIndex) => ({
        ...lesson,
        dbId: null,
        displayOrder: lessonIndex + 1,
        content: lesson.content || lesson.objective || "",
        videoUrl: lesson.videoUrl || ""
      }))
    })),
    quiz: course.quiz.map((question, questionIndex) => ({
      ...question,
      dbId: null,
      displayOrder: questionIndex + 1
    })),
    assignment: course.assignment,
    learnerState: fallbackLearnerState
  };
}

function groupCourses(records) {
  const map = new Map();

  for (const row of records) {
    if (!map.has(row.course_id)) {
      map.set(row.course_id, {
        dbId: row.course_id,
        id: row.course_slug,
        displayOrder: row.course_order,
        title: row.course_title,
        level: row.course_level,
        duration: row.course_duration,
        track: row.course_track,
        summary: row.course_summary,
        outcomes: parseJson(row.course_outcomes, []),
        resourceHref: row.resource_href || "/education",
        external: Boolean(row.external),
        isPublished: Boolean(row.is_published),
        priceCents: Number(row.price_cents || 0),
        language: row.language || "English",
        requirements: parseJson(row.requirements, []),
        modules: [],
        quiz: [],
        assignment: row.assignment_prompt || "",
        learnerState: fallbackLearnerState
      });
    }

    const course = map.get(row.course_id);
    if (row.module_id && !course.modules.some((module) => module.dbId === row.module_id)) {
      course.modules.push({
        dbId: row.module_id,
        id: `module-${row.module_id}`,
        displayOrder: row.module_order,
        title: row.module_title,
        lessons: []
      });
    }

    const module = course.modules.find((item) => item.dbId === row.module_id);
    if (module && row.lesson_id && !module.lessons.some((lesson) => lesson.dbId === row.lesson_id)) {
      module.lessons.push({
        dbId: row.lesson_id,
        id: `lesson-${row.lesson_id}`,
        displayOrder: row.lesson_order,
        title: row.lesson_title,
        format: row.lesson_format,
        duration: row.lesson_duration,
        objective: row.lesson_objective,
        content: row.lesson_content || row.lesson_objective,
        videoUrl: row.video_url || ""
      });
    }
  }

  return Array.from(map.values()).map((course) => ({
    ...course,
    modules: course.modules
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((module) => ({
        ...module,
        lessons: module.lessons.sort((a, b) => a.displayOrder - b.displayOrder)
      }))
  }));
}

async function attachQuizzesAndProgress(sql, courses, learnerId) {
  if (!courses.length) {
    return courses;
  }

  const courseIds = courses.map((course) => course.dbId);
  const [questions, progressRows, attemptRows, assignmentRows, enrollmentRows, certificateRows] = await Promise.all([
    sql`
      select *
      from lms_quiz_questions
      where course_id = any(${courseIds})
      order by course_id asc, display_order asc, id asc
    `,
    learnerId
      ? sql`
          select lesson_id
          from lms_lesson_progress
          where learner_id = ${learnerId}
        `
      : Promise.resolve([]),
    learnerId
      ? sql`
          select distinct on (course_id) course_id, answers, score, total, created_at
          from lms_quiz_attempts
          where learner_id = ${learnerId}
            and course_id = any(${courseIds})
          order by course_id asc, created_at desc, id desc
        `
      : Promise.resolve([]),
    learnerId
      ? sql`
          select distinct on (course_id) course_id, response, status, created_at
          from lms_assignment_submissions
          where learner_id = ${learnerId}
            and course_id = any(${courseIds})
          order by course_id asc, created_at desc, id desc
        `
      : Promise.resolve([]),
    learnerId
      ? sql`
          select course_id, created_at
          from lms_enrollments
          where learner_id = ${learnerId}
            and course_id = any(${courseIds})
        `
      : Promise.resolve([]),
    learnerId
      ? sql`
          select course_id, serial, issued_at
          from lms_certificates
          where learner_id = ${learnerId}
            and course_id = any(${courseIds})
        `
      : Promise.resolve([])
  ]);

  const completedLessonIds = new Set(progressRows.map((row) => row.lesson_id));
  const latestAttemptByCourse = new Map(attemptRows.map((row) => [row.course_id, row]));
  const assignmentByCourse = new Map(assignmentRows.map((row) => [row.course_id, row]));
  const enrollmentByCourse = new Map(enrollmentRows.map((row) => [row.course_id, row]));
  const certificateByCourse = new Map(certificateRows.map((row) => [row.course_id, row]));

  return courses.map((course) => {
    const attempt = latestAttemptByCourse.get(course.dbId);
    const assignment = assignmentByCourse.get(course.dbId);
    const certificate = certificateByCourse.get(course.dbId);
    const quiz = questions
      .filter((question) => question.course_id === course.dbId)
      .map((question) => ({
        dbId: question.id,
        id: `question-${question.id}`,
        displayOrder: question.display_order,
        question: question.question,
        options: parseJson(question.options, []),
        answer: question.answer_index
      }));

    const completedLessons = course.modules.flatMap((module) =>
      module.lessons
        .filter((lesson) => completedLessonIds.has(lesson.dbId))
        .map((lesson) => lesson.id)
    );

    const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const lessonPercent = totalLessons
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0;
    const quizPercent = attempt?.total ? Math.round((attempt.score / attempt.total) * 100) : 0;
    const quizSatisfied = quiz.length === 0 ? true : quizPercent >= QUIZ_PASS_PERCENT;
    const certificateReady =
      lessonPercent >= COMPLETION_LESSON_PERCENT && quizSatisfied && Boolean(assignment);

    return {
      ...course,
      quiz,
      learnerState: {
        enrolled: Boolean(enrollmentByCourse.get(course.dbId)),
        enrolledAt: enrollmentByCourse.get(course.dbId)?.created_at || null,
        completedLessons,
        quizAnswers: parseJson(attempt?.answers, {}),
        assignmentDraft: assignment?.response || "",
        assignmentSubmitted: Boolean(assignment),
        assignmentStatus: assignment?.status || "",
        lessonPercent,
        quizPercent,
        certificateReady,
        certificate: certificate
          ? { serial: certificate.serial, issuedAt: certificate.issued_at }
          : null,
        latestQuiz: attempt
          ? {
              score: attempt.score,
              total: attempt.total,
              createdAt: attempt.created_at
            }
          : null
      }
    };
  });
}

export async function getLmsCatalog(learnerId = null, includeUnpublished = false) {
  const sql = getSql();

  if (!sql) {
    return {
      courses: educationLmsCourses.map(formatFallbackCourse),
      hasDatabase: false
    };
  }

  try {
    await ensureLmsSchema(sql);
    const rows = await sql`
      select
        c.id as course_id,
        c.slug as course_slug,
        c.display_order as course_order,
        c.title as course_title,
        c.level as course_level,
        c.duration as course_duration,
        c.track as course_track,
        c.summary as course_summary,
        c.outcomes as course_outcomes,
        c.resource_href,
        c.external,
        c.is_published,
        c.price_cents,
        c.language,
        c.requirements,
        a.prompt as assignment_prompt,
        m.id as module_id,
        m.display_order as module_order,
        m.title as module_title,
        l.id as lesson_id,
        l.display_order as lesson_order,
        l.title as lesson_title,
        l.format as lesson_format,
        l.duration as lesson_duration,
        l.objective as lesson_objective,
        l.content as lesson_content,
        l.video_url
      from lms_courses c
      left join lms_assignments a on a.course_id = c.id
      left join lms_modules m on m.course_id = c.id
      left join lms_lessons l on l.module_id = m.id
      where ${includeUnpublished ? sql`true` : sql`c.is_published = true`}
      order by c.display_order asc, c.id asc, m.display_order asc, m.id asc, l.display_order asc, l.id asc
    `;

    const courses = groupCourses(rows);
    return {
      courses: await attachQuizzesAndProgress(sql, courses, learnerId ? Number(learnerId) : null),
      hasDatabase: true
    };
  } catch (error) {
    logLmsError("Failed to load LMS catalog from Neon:", error);
    return {
      courses: educationLmsCourses.map(formatFallbackCourse),
      hasDatabase: false
    };
  }
}

export async function enrollLearner(data) {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  return sql.begin(async (tx) => {
    const [learner] = await tx`
      insert into lms_learners (full_name, email)
      values (${data.fullName}, ${data.email})
      on conflict (email)
      do update set full_name = excluded.full_name, updated_at = now()
      returning id, full_name, email
    `;

    const [course] = await tx`
      select id
      from lms_courses
      where id = ${data.courseId}
        and is_published = true
      limit 1
    `;

    if (!course) {
      throw new Error("Course not found.");
    }

    await tx`
      insert into lms_enrollments (learner_id, course_id)
      values (${learner.id}, ${course.id})
      on conflict (learner_id, course_id) do nothing
    `;

    return {
      id: learner.id,
      fullName: learner.full_name,
      email: learner.email
    };
  });
}

export async function enrollLoggedInLearner({ learnerId, courseId }) {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  const [course] = await sql`
    select id
    from lms_courses
    where id = ${Number(courseId)}
      and is_published = true
    limit 1
  `;

  if (!course) {
    throw new Error("Course not found or not published.");
  }

  await sql`
    insert into lms_enrollments (learner_id, course_id)
    values (${Number(learnerId)}, ${Number(courseId)})
    on conflict (learner_id, course_id) do nothing
  `;

  return { courseId: Number(courseId), learnerId: Number(learnerId) };
}

export async function setLessonProgress({ learnerId, lessonId, completed }) {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  const [lessonCourse] = await sql`
    select c.id as course_id
    from lms_lessons l
    join lms_modules m on m.id = l.module_id
    join lms_courses c on c.id = m.course_id
    where l.id = ${Number(lessonId)}
    limit 1
  `;

  if (!lessonCourse?.course_id) {
    throw new Error("Lesson not found.");
  }

  const [enrollment] = await sql`
    select id
    from lms_enrollments
    where learner_id = ${Number(learnerId)}
      and course_id = ${lessonCourse.course_id}
    limit 1
  `;

  if (!enrollment) {
    throw new Error("Enroll in this course before saving progress.");
  }

  if (toBool(completed)) {
    await sql`
      insert into lms_lesson_progress (learner_id, lesson_id)
      values (${Number(learnerId)}, ${Number(lessonId)})
      on conflict (learner_id, lesson_id)
      do update set completed_at = now()
    `;
    await issueCertificateIfEligible({ learnerId, courseId: lessonCourse.course_id });
  } else {
    await sql`
      delete from lms_lesson_progress
      where learner_id = ${Number(learnerId)}
        and lesson_id = ${Number(lessonId)}
    `;
  }
}

export async function submitQuizAttempt({ learnerId, courseId, answers }) {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  const [enrollment] = await sql`
    select id
    from lms_enrollments
    where learner_id = ${Number(learnerId)}
      and course_id = ${Number(courseId)}
    limit 1
  `;

  if (!enrollment) {
    throw new Error("Enroll in this course before submitting quiz attempts.");
  }

  const questions = await sql`
    select id, answer_index
    from lms_quiz_questions
    where course_id = ${Number(courseId)}
    order by display_order asc, id asc
  `;

  const normalizedAnswers = answers && typeof answers === "object" ? answers : {};
  const score = questions.reduce((sum, question) => {
    const selected = Number(normalizedAnswers[`question-${question.id}`]);
    return selected === question.answer_index ? sum + 1 : sum;
  }, 0);

  const [attempt] = await sql`
    insert into lms_quiz_attempts (learner_id, course_id, answers, score, total)
    values (
      ${Number(learnerId)},
      ${Number(courseId)},
      ${sql.json(normalizedAnswers)},
      ${score},
      ${questions.length}
    )
    returning id, score, total, created_at
  `;

  await issueCertificateIfEligible({ learnerId, courseId });

  return {
    id: attempt.id,
    score: attempt.score,
    total: attempt.total,
    createdAt: attempt.created_at
  };
}

export async function submitAssignment({ learnerId, courseId, response }) {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const normalizedResponse = normalizeText(response);
  if (normalizedResponse.length < 10) {
    throw new Error("Assignment response is too short.");
  }

  await ensureLmsSchema(sql);

  const [enrollment] = await sql`
    select id
    from lms_enrollments
    where learner_id = ${Number(learnerId)}
      and course_id = ${Number(courseId)}
    limit 1
  `;

  if (!enrollment) {
    throw new Error("Enroll in this course before submitting assignments.");
  }

  const [submission] = await sql`
    insert into lms_assignment_submissions (learner_id, course_id, response, status)
    values (${Number(learnerId)}, ${Number(courseId)}, ${normalizedResponse}, 'submitted')
    returning id, status, created_at
  `;

  await issueCertificateIfEligible({ learnerId, courseId });

  return {
    id: submission.id,
    status: submission.status,
    createdAt: submission.created_at
  };
}

function generateCertificateSerial(courseId, learnerId) {
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `HFA-${courseId}-${learnerId}-${random}`;
}

// Authoritative completion check used for certificate issuance. Reads progress,
// the latest quiz attempt, and assignment submission straight from the database.
async function computeCourseCompletion(sql, learnerId, courseId) {
  const [[lessonCounts], [questionCount], [attempt], [assignment]] = await Promise.all([
    sql`
      select
        count(l.id)::int as total,
        count(p.lesson_id)::int as completed
      from lms_lessons l
      join lms_modules m on m.id = l.module_id
      left join lms_lesson_progress p
        on p.lesson_id = l.id and p.learner_id = ${learnerId}
      where m.course_id = ${courseId}
    `,
    sql`select count(*)::int as total from lms_quiz_questions where course_id = ${courseId}`,
    sql`
      select score, total
      from lms_quiz_attempts
      where learner_id = ${learnerId} and course_id = ${courseId}
      order by created_at desc, id desc
      limit 1
    `,
    sql`
      select id
      from lms_assignment_submissions
      where learner_id = ${learnerId} and course_id = ${courseId}
      order by created_at desc, id desc
      limit 1
    `
  ]);

  const totalLessons = lessonCounts?.total || 0;
  const completedLessons = lessonCounts?.completed || 0;
  const lessonPercent = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const quizTotal = attempt?.total || 0;
  const quizPercent = quizTotal ? Math.round((attempt.score / quizTotal) * 100) : 0;
  const quizSatisfied = (questionCount?.total || 0) === 0 ? true : quizPercent >= QUIZ_PASS_PERCENT;
  const assignmentSubmitted = Boolean(assignment);
  const eligible =
    lessonPercent >= COMPLETION_LESSON_PERCENT && quizSatisfied && assignmentSubmitted;

  return { lessonPercent, quizPercent, assignmentSubmitted, eligible };
}

// Issues a course certificate when the learner meets the completion gate.
// Idempotent: a learner can hold at most one certificate per course.
export async function issueCertificateIfEligible({ learnerId, courseId }) {
  const sql = getSql();
  if (!sql) {
    return null;
  }

  const numericLearnerId = Number(learnerId);
  const numericCourseId = Number(courseId);
  if (!Number.isFinite(numericLearnerId) || !Number.isFinite(numericCourseId)) {
    return null;
  }

  try {
    await ensureLmsSchema(sql);
    const completion = await computeCourseCompletion(sql, numericLearnerId, numericCourseId);
    if (!completion.eligible) {
      return null;
    }

    const [inserted] = await sql`
      insert into lms_certificates (learner_id, course_id, serial)
      values (
        ${numericLearnerId},
        ${numericCourseId},
        ${generateCertificateSerial(numericCourseId, numericLearnerId)}
      )
      on conflict (learner_id, course_id) do nothing
      returning id, serial, issued_at
    `;

    if (inserted) {
      return { serial: inserted.serial, issuedAt: inserted.issued_at };
    }

    const [existing] = await sql`
      select serial, issued_at
      from lms_certificates
      where learner_id = ${numericLearnerId} and course_id = ${numericCourseId}
      limit 1
    `;
    return existing ? { serial: existing.serial, issuedAt: existing.issued_at } : null;
  } catch (error) {
    logLmsError("Failed to issue LMS certificate:", error);
    return null;
  }
}

export async function getCertificateBySerial(serial) {
  const sql = getSql();
  if (!sql) {
    return null;
  }

  try {
    await ensureLmsSchema(sql);
    const [row] = await sql`
      select
        c.serial,
        c.issued_at,
        l.full_name,
        co.title as course_title,
        co.track,
        co.level,
        co.duration
      from lms_certificates c
      join lms_learners l on l.id = c.learner_id
      join lms_courses co on co.id = c.course_id
      where c.serial = ${normalizeText(serial)}
      limit 1
    `;

    if (!row) {
      return null;
    }

    return {
      serial: row.serial,
      issuedAt: row.issued_at,
      learnerName: row.full_name,
      courseTitle: row.course_title,
      track: row.track,
      level: row.level,
      duration: row.duration
    };
  } catch (error) {
    logLmsError("Failed to load LMS certificate:", error);
    return null;
  }
}

export async function getLmsAdminData() {
  const sql = getSql();
  if (!sql) {
    return {
      hasDatabase: false,
      courses: [],
      modules: [],
      lessons: [],
      questions: [],
      assignments: [],
      learners: [],
      enrollments: [],
      submissions: []
    };
  }

  try {
    await ensureLmsSchema(sql);
    const [courses, modules, lessons, questions, assignments, learners, enrollments, submissions] =
      await Promise.all([
        sql`select * from lms_courses order by display_order asc, id asc`,
        sql`
          select m.*, c.title as course_title
          from lms_modules m
          join lms_courses c on c.id = m.course_id
          order by c.display_order asc, m.display_order asc, m.id asc
        `,
        sql`
          select l.*, c.id as course_id, m.title as module_title, c.title as course_title
          from lms_lessons l
          join lms_modules m on m.id = l.module_id
          join lms_courses c on c.id = m.course_id
          order by c.display_order asc, m.display_order asc, l.display_order asc, l.id asc
        `,
        sql`
          select q.*, c.title as course_title
          from lms_quiz_questions q
          join lms_courses c on c.id = q.course_id
          order by c.display_order asc, q.display_order asc, q.id asc
        `,
        sql`
          select a.*, c.title as course_title
          from lms_assignments a
          join lms_courses c on c.id = a.course_id
          order by c.display_order asc, a.id asc
        `,
        sql`
          select *
          from lms_learners
          order by created_at desc, id desc
          limit 50
        `,
        sql`
          select e.*, l.full_name, l.email, c.title as course_title
          from lms_enrollments e
          join lms_learners l on l.id = e.learner_id
          join lms_courses c on c.id = e.course_id
          order by e.created_at desc
          limit 80
        `,
        sql`
          select s.*, l.full_name, l.email, c.title as course_title
          from lms_assignment_submissions s
          join lms_learners l on l.id = s.learner_id
          join lms_courses c on c.id = s.course_id
          order by s.created_at desc, s.id desc
          limit 80
        `
      ]);

    return {
      hasDatabase: true,
      courses,
      modules,
      lessons,
      questions,
      assignments,
      learners,
      enrollments,
      submissions
    };
  } catch (error) {
    logLmsError("Failed to load LMS admin data:", error);
    return {
      hasDatabase: false,
      courses: [],
      modules: [],
      lessons: [],
      questions: [],
      assignments: [],
      learners: [],
      enrollments: [],
      submissions: []
    };
  }
}
