import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getSql } from "../../../lib/db";
import { ensureLmsSchema, getLmsAdminData } from "../../../lib/lms";
import { requireLmsRole } from "../../../lib/lms-auth";
import "./instructor.css";

export const metadata = {
  title: "Instructor Studio - Humanity First Academy",
  description: "Course studio for LMS courses, modules, lessons, quizzes, assignments, and publishing."
};

function text(formData, key) {
  return String(formData.get(key) || "").trim();
}

function numberValue(formData, key, fallback = 0) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function listFromLines(value) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function listValue(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return value
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return [];
}

function listText(value) {
  return listValue(value).join("\n");
}

function revalidateLms(slug) {
  revalidatePath("/education");
  revalidatePath("/lms");
  revalidatePath("/lms/instructor");
  revalidatePath("/admin/lms");
  if (slug) revalidatePath(`/lms/courses/${slug}`);
}

async function getCourseSlug(sql, courseId) {
  if (!courseId) return null;
  const [course] = await sql`select slug from lms_courses where id = ${courseId} limit 1`;
  return course?.slug || null;
}

// Resolve a slug that doesn't collide with the unique lms_courses.slug constraint.
// Appends -2, -3, … until free. `excludeId` lets an edit keep its own slug.
async function uniqueCourseSlug(sql, baseSlug, excludeId = null) {
  const base = baseSlug || "course";
  let candidate = base;
  for (let n = 2; n < 1000; n += 1) {
    const taken = excludeId
      ? await sql`select 1 from lms_courses where slug = ${candidate} and id <> ${excludeId} limit 1`
      : await sql`select 1 from lms_courses where slug = ${candidate} limit 1`;
    if (taken.length === 0) return candidate;
    candidate = `${base}-${n}`;
  }
  // Fallback: extremely unlikely, but never block creation on slug exhaustion.
  return `${base}-${Date.now()}`;
}

async function createCourse(formData) {
  "use server";
  const account = await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const title = text(formData, "title");
  const summary = text(formData, "summary");
  const baseSlug = slugify(text(formData, "slug") || title);
  if (!title || !summary || !baseSlug) return;
  const slug = await uniqueCourseSlug(sql, baseSlug);

  const [{ next_order: nextOrder }] = await sql`
    select coalesce(max(display_order), 0)::int + 1 as next_order
    from lms_courses
  `;

  const [course] = await sql`
    insert into lms_courses (
      instructor_account_id,
      slug,
      display_order,
      track,
      title,
      summary,
      level,
      duration,
      outcomes,
      requirements,
      resource_href,
      price_cents,
      language,
      external,
      is_published
    )
    values (
      ${account.id},
      ${slug},
      ${numberValue(formData, "display_order", Number(nextOrder || 1))},
      ${text(formData, "track") || "General"},
      ${title},
      ${summary},
      ${text(formData, "level") || "Beginner"},
      ${text(formData, "duration") || "Self-paced"},
      ${sql.json(listFromLines(text(formData, "outcomes")))},
      ${sql.json(listFromLines(text(formData, "requirements")))},
      ${text(formData, "resource_href") || `/lms/courses/${slug}`},
      ${numberValue(formData, "price_cents", 0)},
      ${text(formData, "language") || "English"},
      ${formData.get("external") === "on"},
      ${formData.get("is_published") === "on"}
    )
    returning id
  `;

  await sql`
    insert into lms_assignments (course_id, prompt)
    values (${course.id}, ${text(formData, "assignment") || "Submit the course assignment evidence."})
  `;

  revalidateLms(slug);
}

async function updateCourse(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const courseId = numberValue(formData, "course_id");
  const title = text(formData, "title");
  const baseSlug = slugify(text(formData, "slug") || title);
  if (!courseId || !title || !baseSlug) return;
  const slug = await uniqueCourseSlug(sql, baseSlug, courseId);

  const oldSlug = await getCourseSlug(sql, courseId);

  await sql`
    update lms_courses
    set
      slug = ${slug},
      display_order = ${numberValue(formData, "display_order", 1)},
      track = ${text(formData, "track") || "General"},
      title = ${title},
      summary = ${text(formData, "summary") || title},
      level = ${text(formData, "level") || "Beginner"},
      duration = ${text(formData, "duration") || "Self-paced"},
      outcomes = ${sql.json(listFromLines(text(formData, "outcomes")))},
      requirements = ${sql.json(listFromLines(text(formData, "requirements")))},
      resource_href = ${text(formData, "resource_href") || `/lms/courses/${slug}`},
      price_cents = ${numberValue(formData, "price_cents", 0)},
      language = ${text(formData, "language") || "English"},
      external = ${formData.get("external") === "on"},
      is_published = ${formData.get("is_published") === "on"},
      updated_at = now()
    where id = ${courseId}
  `;

  revalidateLms(oldSlug);
  revalidateLms(slug);
}

async function createModule(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const courseId = numberValue(formData, "course_id");
  const title = text(formData, "title");
  if (!courseId || !title) return;

  const [{ next_order: nextOrder }] = await sql`
    select coalesce(max(display_order), 0)::int + 1 as next_order
    from lms_modules
    where course_id = ${courseId}
  `;

  await sql`
    insert into lms_modules (course_id, display_order, title)
    values (${courseId}, ${numberValue(formData, "display_order", Number(nextOrder || 1))}, ${title})
  `;

  revalidateLms(await getCourseSlug(sql, courseId));
}

async function updateModule(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const moduleId = numberValue(formData, "module_id");
  const courseId = numberValue(formData, "course_id");
  const title = text(formData, "title");
  if (!moduleId || !courseId || !title) return;

  await sql`
    update lms_modules
    set course_id = ${courseId}, display_order = ${numberValue(formData, "display_order", 1)}, title = ${title}, updated_at = now()
    where id = ${moduleId}
  `;

  revalidateLms(await getCourseSlug(sql, courseId));
}

async function createLesson(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const moduleId = numberValue(formData, "module_id");
  const title = text(formData, "title");
  if (!moduleId || !title) return;

  const [{ next_order: nextOrder }] = await sql`
    select coalesce(max(display_order), 0)::int + 1 as next_order
    from lms_lessons
    where module_id = ${moduleId}
  `;

  await sql`
    insert into lms_lessons (module_id, display_order, title, format, duration, objective, content, video_url)
    values (
      ${moduleId},
      ${numberValue(formData, "display_order", Number(nextOrder || 1))},
      ${title},
      ${text(formData, "format") || "Lesson"},
      ${text(formData, "duration") || "20 min"},
      ${text(formData, "objective") || title},
      ${text(formData, "content") || text(formData, "objective") || title},
      ${text(formData, "video_url") || null}
    )
  `;

  const [module] = await sql`select course_id from lms_modules where id = ${moduleId} limit 1`;
  revalidateLms(await getCourseSlug(sql, module?.course_id));
}

async function updateLesson(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const lessonId = numberValue(formData, "lesson_id");
  const moduleId = numberValue(formData, "module_id");
  const title = text(formData, "title");
  if (!lessonId || !moduleId || !title) return;

  await sql`
    update lms_lessons
    set
      module_id = ${moduleId},
      display_order = ${numberValue(formData, "display_order", 1)},
      title = ${title},
      format = ${text(formData, "format") || "Lesson"},
      duration = ${text(formData, "duration") || "20 min"},
      objective = ${text(formData, "objective") || title},
      content = ${text(formData, "content") || null},
      video_url = ${text(formData, "video_url") || null},
      updated_at = now()
    where id = ${lessonId}
  `;

  const [module] = await sql`select course_id from lms_modules where id = ${moduleId} limit 1`;
  revalidateLms(await getCourseSlug(sql, module?.course_id));
}

async function createQuizQuestion(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const courseId = numberValue(formData, "course_id");
  const question = text(formData, "question");
  const options = listFromLines(text(formData, "options"));
  if (!courseId || !question || options.length < 2) return;

  const [{ next_order: nextOrder }] = await sql`
    select coalesce(max(display_order), 0)::int + 1 as next_order
    from lms_quiz_questions
    where course_id = ${courseId}
  `;

  await sql`
    insert into lms_quiz_questions (course_id, display_order, question, options, answer_index)
    values (
      ${courseId},
      ${numberValue(formData, "display_order", Number(nextOrder || 1))},
      ${question},
      ${sql.json(options)},
      ${numberValue(formData, "answer_index", 0)}
    )
  `;

  revalidateLms(await getCourseSlug(sql, courseId));
}

async function updateQuizQuestion(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const questionId = numberValue(formData, "question_id");
  const courseId = numberValue(formData, "course_id");
  const question = text(formData, "question");
  const options = listFromLines(text(formData, "options"));
  if (!questionId || !courseId || !question || options.length < 2) return;

  await sql`
    update lms_quiz_questions
    set
      course_id = ${courseId},
      display_order = ${numberValue(formData, "display_order", 1)},
      question = ${question},
      options = ${sql.json(options)},
      answer_index = ${numberValue(formData, "answer_index", 0)},
      updated_at = now()
    where id = ${questionId}
  `;

  revalidateLms(await getCourseSlug(sql, courseId));
}

async function upsertAssignment(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const assignmentId = numberValue(formData, "assignment_id");
  const courseId = numberValue(formData, "course_id");
  const prompt = text(formData, "prompt");
  if (!courseId || !prompt) return;

  if (assignmentId) {
    await sql`
      update lms_assignments
      set prompt = ${prompt}, updated_at = now()
      where id = ${assignmentId}
    `;
  } else {
    await sql`
      insert into lms_assignments (course_id, prompt)
      values (${courseId}, ${prompt})
    `;
  }

  revalidateLms(await getCourseSlug(sql, courseId));
}

async function setCoursePublication(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const courseId = numberValue(formData, "course_id");
  const shouldPublish = formData.get("publish") === "true";
  if (!courseId) return;

  await sql`
    update lms_courses
    set is_published = ${shouldPublish}, updated_at = now()
    where id = ${courseId}
  `;

  revalidateLms(await getCourseSlug(sql, courseId));
}

async function deleteCourse(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const courseId = numberValue(formData, "course_id");
  if (!courseId) return;
  const slug = await getCourseSlug(sql, courseId);
  await sql`delete from lms_courses where id = ${courseId}`;
  revalidateLms(slug);
}

async function deleteModule(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const moduleId = numberValue(formData, "module_id");
  const courseId = numberValue(formData, "course_id");
  if (!moduleId) return;
  await sql`delete from lms_modules where id = ${moduleId}`;
  revalidateLms(await getCourseSlug(sql, courseId));
}

async function deleteLesson(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const lessonId = numberValue(formData, "lesson_id");
  const courseId = numberValue(formData, "course_id");
  if (!lessonId) return;
  await sql`delete from lms_lessons where id = ${lessonId}`;
  revalidateLms(await getCourseSlug(sql, courseId));
}

async function deleteQuizQuestion(formData) {
  "use server";
  await requireLmsRole(["instructor"]);
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured.");
  await ensureLmsSchema(sql);

  const questionId = numberValue(formData, "question_id");
  const courseId = numberValue(formData, "course_id");
  if (!questionId) return;
  await sql`delete from lms_quiz_questions where id = ${questionId}`;
  revalidateLms(await getCourseSlug(sql, courseId));
}

function CourseSelect({ name = "course_id", courses, defaultValue = "" }) {
  return (
    <select name={name} className="inst__input" required defaultValue={defaultValue}>
      <option value="">Choose course</option>
      {courses.map((course) => (
        <option key={course.id} value={course.id}>
          {course.title}
        </option>
      ))}
    </select>
  );
}

function ModuleSelect({ modules, defaultValue = "" }) {
  return (
    <select name="module_id" className="inst__input" required defaultValue={defaultValue}>
      <option value="">Choose module</option>
      {modules.map((module) => (
        <option key={module.id} value={module.id}>
          {module.course_title} / {module.title}
        </option>
      ))}
    </select>
  );
}

function PublishButton({ course }) {
  return (
    <form action={setCoursePublication}>
      <input type="hidden" name="course_id" value={course.id} />
      <input type="hidden" name="publish" value={course.is_published ? "false" : "true"} />
      <button className="button button--secondary" type="submit">
        {course.is_published ? "Unpublish" : "Publish"}
      </button>
    </form>
  );
}

export default async function InstructorLmsPage() {
  const account = await requireLmsRole(["instructor"]);
  const data = await getLmsAdminData();

  return (
    <main className="site-main inst">
      <header className="inst__header">
          <div>
            <p className="inst__eyebrow">Instructor Studio</p>
            <h1 className="inst__title">Build and manage real courses</h1>
            <p className="inst__subtitle">
              Signed in as {account.fullName}. Create courses, structure modules, edit lessons, write quizzes,
              manage assignments, and preview the student experience.
            </p>
          </div>
          <div className="inst__header-actions">
            <Link href="/lms" className="button button--secondary">
              Student LMS
            </Link>
            <Link href="/admin/lms" className="button button--primary">
              Admin panel
            </Link>
          </div>
        </header>

        <div className="inst__metrics">
          <div className="inst__metric">
            <strong>{data.courses.length}</strong>
            <span>Courses</span>
          </div>
          <div className="inst__metric">
            <strong>{data.modules.length}</strong>
            <span>Modules</span>
          </div>
          <div className="inst__metric">
            <strong>{data.lessons.length}</strong>
            <span>Lessons</span>
          </div>
          <div className="inst__metric">
            <strong>{data.questions.length}</strong>
            <span>Questions</span>
          </div>
          <div className="inst__metric">
            <strong>{data.submissions.length}</strong>
            <span>Submissions</span>
          </div>
        </div>

        <section className="inst__panel inst__panel--hero">
          <div>
            <p className="inst__eyebrow">Studio workflow</p>
            <h2 className="inst__panel-title inst__panel-title--plain">Create the course, then build the curriculum</h2>
            <p className="inst__subtitle">
              A course only feels like Udemy or Alison when it has a clear landing page, ordered modules,
              complete lessons, a quiz, and an assignment. Use the quick forms to add new items, then refine
              everything from the course studio below.
            </p>
          </div>
          <div className="inst__workflow">
            <span>Course page</span>
            <span>Modules</span>
            <span>Lessons</span>
            <span>Quiz</span>
            <span>Publish</span>
          </div>
        </section>

        <div className="inst__grid">
          <section className="inst__panel inst__panel--wide">
            <h2 className="inst__panel-title">
              <span>01</span> Create course shell
            </h2>
            <form className="inst__form" action={createCourse}>
              <div className="inst__form-row">
                <label className="inst__field">
                  <span>Title</span>
                  <input className="inst__input" name="title" required />
                </label>
                <label className="inst__field">
                  <span>Slug</span>
                  <input className="inst__input" name="slug" placeholder="auto-generated" />
                </label>
                <label className="inst__field">
                  <span>Order</span>
                  <input className="inst__input" type="number" name="display_order" min="1" placeholder="Auto" />
                </label>
              </div>
              <div className="inst__form-row">
                <label className="inst__field">
                  <span>Track</span>
                  <input className="inst__input" name="track" placeholder="Digital Skills" />
                </label>
                <label className="inst__field">
                  <span>Level</span>
                  <input className="inst__input" name="level" placeholder="Beginner" />
                </label>
                <label className="inst__field">
                  <span>Duration</span>
                  <input className="inst__input" name="duration" placeholder="8 weeks" />
                </label>
                <label className="inst__field">
                  <span>Language</span>
                  <input className="inst__input" name="language" placeholder="English" />
                </label>
                <label className="inst__field">
                  <span>Price cents</span>
                  <input className="inst__input" type="number" name="price_cents" min="0" defaultValue="0" />
                </label>
              </div>
              <label className="inst__field">
                <span>Summary</span>
                <textarea className="inst__input inst__textarea" name="summary" rows={3} required />
              </label>
              <div className="inst__form-row">
                <label className="inst__field">
                  <span>Outcomes (one per line)</span>
                  <textarea className="inst__input inst__textarea" name="outcomes" rows={4} />
                </label>
                <label className="inst__field">
                  <span>Requirements (one per line)</span>
                  <textarea className="inst__input inst__textarea" name="requirements" rows={4} />
                </label>
              </div>
              <label className="inst__field">
                <span>Assignment prompt</span>
                <textarea className="inst__input inst__textarea" name="assignment" rows={2} />
              </label>
              <div className="inst__form-footer">
                <div className="inst__checks">
                  <label className="inst__check">
                    <input type="checkbox" name="is_published" />
                    <span>Publish immediately</span>
                  </label>
                  <label className="inst__check">
                    <input type="checkbox" name="external" />
                    <span>External resource</span>
                  </label>
                </div>
                <button className="button button--primary" type="submit">
                  Create course
                </button>
              </div>
            </form>
          </section>

          <section className="inst__panel">
            <h2 className="inst__panel-title">
              <span>02</span> Add module
            </h2>
            <form className="inst__form" action={createModule}>
              <label className="inst__field">
                <span>Course</span>
                <CourseSelect courses={data.courses} />
              </label>
              <div className="inst__form-row">
                <label className="inst__field">
                  <span>Order</span>
                  <input className="inst__input" type="number" name="display_order" min="1" placeholder="Auto" />
                </label>
                <label className="inst__field">
                  <span>Module title</span>
                  <input className="inst__input" name="title" required />
                </label>
              </div>
              <button className="button button--secondary" type="submit">
                Add module
              </button>
            </form>
          </section>

          <section className="inst__panel">
            <h2 className="inst__panel-title">
              <span>03</span> Add lesson
            </h2>
            <form className="inst__form" action={createLesson}>
              <label className="inst__field">
                <span>Module</span>
                <ModuleSelect modules={data.modules} />
              </label>
              <div className="inst__form-row">
                <label className="inst__field">
                  <span>Order</span>
                  <input className="inst__input" type="number" name="display_order" min="1" placeholder="Auto" />
                </label>
                <label className="inst__field">
                  <span>Lesson title</span>
                  <input className="inst__input" name="title" required />
                </label>
              </div>
              <div className="inst__form-row">
                <label className="inst__field">
                  <span>Format</span>
                  <input className="inst__input" name="format" placeholder="Video, Practice, Assignment" />
                </label>
                <label className="inst__field">
                  <span>Duration</span>
                  <input className="inst__input" name="duration" placeholder="20 min" />
                </label>
              </div>
              <label className="inst__field">
                <span>Video URL</span>
                <input className="inst__input" name="video_url" placeholder="https://..." />
              </label>
              <label className="inst__field">
                <span>Objective</span>
                <textarea className="inst__input inst__textarea" name="objective" rows={2} />
              </label>
              <label className="inst__field">
                <span>Lesson notes/content</span>
                <textarea className="inst__input inst__textarea" name="content" rows={3} />
              </label>
              <button className="button button--secondary" type="submit">
                Add lesson
              </button>
            </form>
          </section>

          <section className="inst__panel">
            <h2 className="inst__panel-title">
              <span>04</span> Add quiz question
            </h2>
            <form className="inst__form" action={createQuizQuestion}>
              <label className="inst__field">
                <span>Course</span>
                <CourseSelect courses={data.courses} />
              </label>
              <label className="inst__field">
                <span>Question</span>
                <textarea className="inst__input inst__textarea" name="question" rows={2} required />
              </label>
              <label className="inst__field">
                <span>Options (one per line)</span>
                <textarea className="inst__input inst__textarea" name="options" rows={4} required />
              </label>
              <div className="inst__form-row">
                <label className="inst__field">
                  <span>Correct index</span>
                  <input className="inst__input" type="number" name="answer_index" defaultValue="0" min="0" />
                </label>
                <label className="inst__field">
                  <span>Order</span>
                  <input className="inst__input" type="number" name="display_order" min="1" placeholder="Auto" />
                </label>
              </div>
              <button className="button button--secondary" type="submit">
                Add question
              </button>
            </form>
          </section>
        </div>

        <section className="inst__courses">
          <div className="inst__section-head">
            <div>
              <p className="inst__eyebrow">Course Studio</p>
              <h2 className="inst__section-title">Edit existing courses</h2>
            </div>
            <span className="inst__section-note">Drafts stay hidden until published.</span>
          </div>

          <div className="inst__course-list">
            {data.courses.length ? (
              data.courses.map((course) => {
                const modules = data.modules.filter((module) => module.course_id === course.id);
                const lessons = data.lessons.filter((lesson) => lesson.course_id === course.id);
                const questions = data.questions.filter((question) => question.course_id === course.id);
                const assignment = data.assignments.find((item) => item.course_id === course.id);

                return (
                  <article key={course.id} className="inst__course-item">
                    <div className="inst__course-item-head">
                      <div>
                        <span className="inst__eyebrow">
                          {course.track} / {course.level}
                        </span>
                        <h3>{course.title}</h3>
                        <p>
                          {modules.length} modules / {lessons.length} lessons / {questions.length} questions /{" "}
                          {course.is_published ? "Published" : "Draft"}
                        </p>
                      </div>
                      <div className="inst__course-item-actions">
                        <Link href={`/lms/courses/${course.slug}`} className="button button--secondary">
                          Preview
                        </Link>
                        <PublishButton course={course} />
                        <form action={deleteCourse}>
                          <input type="hidden" name="course_id" value={course.id} />
                          <button className="button button--danger" type="submit">
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>

                    <div className="inst__studio">
                      <details className="inst__course-editor" open>
                        <summary>Course landing page</summary>
                        <form className="inst__form inst__form--studio" action={updateCourse}>
                          <input type="hidden" name="course_id" value={course.id} />
                          <div className="inst__form-row">
                            <label className="inst__field">
                              <span>Title</span>
                              <input className="inst__input" name="title" defaultValue={course.title} required />
                            </label>
                            <label className="inst__field">
                              <span>Slug</span>
                              <input className="inst__input" name="slug" defaultValue={course.slug} required />
                            </label>
                            <label className="inst__field">
                              <span>Order</span>
                              <input
                                className="inst__input"
                                type="number"
                                name="display_order"
                                min="1"
                                defaultValue={course.display_order}
                              />
                            </label>
                          </div>
                          <div className="inst__form-row">
                            <label className="inst__field">
                              <span>Track</span>
                              <input className="inst__input" name="track" defaultValue={course.track} />
                            </label>
                            <label className="inst__field">
                              <span>Level</span>
                              <input className="inst__input" name="level" defaultValue={course.level} />
                            </label>
                            <label className="inst__field">
                              <span>Duration</span>
                              <input className="inst__input" name="duration" defaultValue={course.duration} />
                            </label>
                            <label className="inst__field">
                              <span>Language</span>
                              <input className="inst__input" name="language" defaultValue={course.language || "English"} />
                            </label>
                            <label className="inst__field">
                              <span>Price cents</span>
                              <input
                                className="inst__input"
                                type="number"
                                name="price_cents"
                                min="0"
                                defaultValue={course.price_cents || 0}
                              />
                            </label>
                          </div>
                          <label className="inst__field">
                            <span>Summary</span>
                            <textarea
                              className="inst__input inst__textarea"
                              name="summary"
                              rows={3}
                              defaultValue={course.summary}
                            />
                          </label>
                          <div className="inst__form-row">
                            <label className="inst__field">
                              <span>Learning outcomes</span>
                              <textarea
                                className="inst__input inst__textarea"
                                name="outcomes"
                                rows={5}
                                defaultValue={listText(course.outcomes)}
                              />
                            </label>
                            <label className="inst__field">
                              <span>Requirements</span>
                              <textarea
                                className="inst__input inst__textarea"
                                name="requirements"
                                rows={5}
                                defaultValue={listText(course.requirements)}
                              />
                            </label>
                          </div>
                          <label className="inst__field">
                            <span>Resource or thumbnail link</span>
                            <input className="inst__input" name="resource_href" defaultValue={course.resource_href || ""} />
                          </label>
                          <div className="inst__form-footer">
                            <div className="inst__checks">
                              <label className="inst__check">
                                <input type="checkbox" name="is_published" defaultChecked={course.is_published} />
                                <span>Published</span>
                              </label>
                              <label className="inst__check">
                                <input type="checkbox" name="external" defaultChecked={course.external} />
                                <span>External resource</span>
                              </label>
                            </div>
                            <button className="button button--primary" type="submit">
                              Save course
                            </button>
                          </div>
                        </form>
                      </details>

                      <details className="inst__course-editor">
                        <summary>Curriculum modules and lessons</summary>
                        <div className="inst__module-stack">
                          {modules.length ? (
                            modules.map((module) => {
                              const moduleLessons = lessons.filter((lesson) => lesson.module_id === module.id);

                              return (
                                <div key={module.id} className="inst__module-card">
                                  <form className="inst__form inst__module-edit" action={updateModule}>
                                    <input type="hidden" name="module_id" value={module.id} />
                                    <input type="hidden" name="course_id" value={course.id} />
                                    <label className="inst__field inst__field--order">
                                      <span>Order</span>
                                      <input
                                        className="inst__input"
                                        type="number"
                                        name="display_order"
                                        min="1"
                                        defaultValue={module.display_order}
                                      />
                                    </label>
                                    <label className="inst__field">
                                      <span>Module title</span>
                                      <input className="inst__input" name="title" defaultValue={module.title} required />
                                    </label>
                                    <button className="button button--secondary" type="submit">
                                      Save module
                                    </button>
                                  </form>

                                  <div className="inst__lesson-stack">
                                    {moduleLessons.length ? (
                                      moduleLessons.map((lesson) => (
                                        <details key={lesson.id} className="inst__lesson-editor">
                                          <summary>
                                            <span>
                                              {lesson.display_order}. {lesson.title}
                                            </span>
                                            <small>{lesson.format} / {lesson.duration}</small>
                                          </summary>
                                          <form className="inst__form inst__form--studio" action={updateLesson}>
                                            <input type="hidden" name="lesson_id" value={lesson.id} />
                                            <input type="hidden" name="course_id" value={course.id} />
                                            <div className="inst__form-row">
                                              <label className="inst__field">
                                                <span>Module</span>
                                                <ModuleSelect modules={data.modules} defaultValue={lesson.module_id} />
                                              </label>
                                              <label className="inst__field">
                                                <span>Order</span>
                                                <input
                                                  className="inst__input"
                                                  type="number"
                                                  name="display_order"
                                                  min="1"
                                                  defaultValue={lesson.display_order}
                                                />
                                              </label>
                                              <label className="inst__field">
                                                <span>Title</span>
                                                <input className="inst__input" name="title" defaultValue={lesson.title} required />
                                              </label>
                                            </div>
                                            <div className="inst__form-row">
                                              <label className="inst__field">
                                                <span>Format</span>
                                                <input className="inst__input" name="format" defaultValue={lesson.format} />
                                              </label>
                                              <label className="inst__field">
                                                <span>Duration</span>
                                                <input className="inst__input" name="duration" defaultValue={lesson.duration} />
                                              </label>
                                            </div>
                                            <label className="inst__field">
                                              <span>Video URL</span>
                                              <input className="inst__input" name="video_url" defaultValue={lesson.video_url || ""} />
                                            </label>
                                            <label className="inst__field">
                                              <span>Objective</span>
                                              <textarea
                                                className="inst__input inst__textarea"
                                                name="objective"
                                                rows={2}
                                                defaultValue={lesson.objective}
                                              />
                                            </label>
                                            <label className="inst__field">
                                              <span>Lesson notes/content</span>
                                              <textarea
                                                className="inst__input inst__textarea"
                                                name="content"
                                                rows={4}
                                                defaultValue={lesson.content || ""}
                                              />
                                            </label>
                                            <div className="inst__form-footer">
                                              <button
                                                className="button button--danger"
                                                type="submit"
                                                formAction={deleteLesson}
                                                formNoValidate
                                              >
                                                Delete lesson
                                              </button>
                                              <button className="button button--primary" type="submit">
                                                Save lesson
                                              </button>
                                            </div>
                                          </form>
                                        </details>
                                      ))
                                    ) : (
                                      <p className="inst__empty inst__empty--compact">No lessons in this module yet.</p>
                                    )}
                                  </div>

                                  <form className="inst__inline-delete" action={deleteModule}>
                                    <input type="hidden" name="module_id" value={module.id} />
                                    <input type="hidden" name="course_id" value={course.id} />
                                    <button type="submit">Delete module</button>
                                  </form>
                                </div>
                              );
                            })
                          ) : (
                            <p className="inst__empty inst__empty--compact">No modules yet. Add a module above to begin the curriculum.</p>
                          )}
                        </div>
                      </details>

                      <details className="inst__course-editor">
                        <summary>Quiz and assignment</summary>
                        <div className="inst__question-stack">
                          {questions.length ? (
                            questions.map((question) => (
                              <form key={question.id} className="inst__form inst__question-card" action={updateQuizQuestion}>
                                <input type="hidden" name="question_id" value={question.id} />
                                <input type="hidden" name="course_id" value={course.id} />
                                <div className="inst__form-row">
                                  <label className="inst__field">
                                    <span>Order</span>
                                    <input
                                      className="inst__input"
                                      type="number"
                                      name="display_order"
                                      min="1"
                                      defaultValue={question.display_order}
                                    />
                                  </label>
                                  <label className="inst__field">
                                    <span>Correct index</span>
                                    <input
                                      className="inst__input"
                                      type="number"
                                      name="answer_index"
                                      min="0"
                                      defaultValue={question.answer_index}
                                    />
                                  </label>
                                </div>
                                <label className="inst__field">
                                  <span>Question</span>
                                  <textarea
                                    className="inst__input inst__textarea"
                                    name="question"
                                    rows={2}
                                    defaultValue={question.question}
                                  />
                                </label>
                                <label className="inst__field">
                                  <span>Options</span>
                                  <textarea
                                    className="inst__input inst__textarea"
                                    name="options"
                                    rows={4}
                                    defaultValue={listText(question.options)}
                                  />
                                </label>
                                <div className="inst__form-footer">
                                  <button
                                    className="button button--danger"
                                    type="submit"
                                    formAction={deleteQuizQuestion}
                                    formNoValidate
                                  >
                                    Delete question
                                  </button>
                                  <button className="button button--primary" type="submit">
                                    Save question
                                  </button>
                                </div>
                              </form>
                            ))
                          ) : (
                            <p className="inst__empty inst__empty--compact">No quiz questions yet.</p>
                          )}
                        </div>

                        <form className="inst__form inst__assignment-card" action={upsertAssignment}>
                          <input type="hidden" name="course_id" value={course.id} />
                          <input type="hidden" name="assignment_id" value={assignment?.id || ""} />
                          <label className="inst__field">
                            <span>Assignment prompt</span>
                            <textarea
                              className="inst__input inst__textarea"
                              name="prompt"
                              rows={4}
                              defaultValue={assignment?.prompt || ""}
                              placeholder="Describe the project evidence students must submit."
                            />
                          </label>
                          <button className="button button--primary" type="submit">
                            Save assignment
                          </button>
                        </form>
                      </details>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="inst__empty">No courses yet. Use the builder above to create one.</p>
            )}
          </div>
        </section>
    </main>
  );
}
