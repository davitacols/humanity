import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../lib/admin-auth";
import { getSql } from "../../../lib/db";
import { ensureLmsSchema, getLmsAdminData } from "../../../lib/lms";

const EDITABLE_TABLES = {
  lms_courses: {
    title: "Courses",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "track", label: "Track", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "level", label: "Level", type: "text" },
      { name: "duration", label: "Duration", type: "text" },
      { name: "outcomes", label: "Outcomes JSON", type: "json" },
      { name: "resource_href", label: "Resource link", type: "text" },
      { name: "external", label: "External", type: "checkbox" },
      { name: "is_published", label: "Published", type: "checkbox" }
    ]
  },
  lms_modules: {
    title: "Modules",
    columns: [
      { name: "course_id", label: "Course ID", type: "number" },
      { name: "display_order", label: "Order", type: "number" },
      { name: "title", label: "Title", type: "text" }
    ]
  },
  lms_lessons: {
    title: "Lessons",
    columns: [
      { name: "module_id", label: "Module ID", type: "number" },
      { name: "display_order", label: "Order", type: "number" },
      { name: "title", label: "Title", type: "text" },
      { name: "format", label: "Format", type: "text" },
      { name: "duration", label: "Duration", type: "text" },
      { name: "objective", label: "Objective", type: "textarea" },
      { name: "content", label: "Lesson content", type: "textarea" },
      { name: "video_url", label: "Video URL", type: "text" }
    ]
  },
  lms_quiz_questions: {
    title: "Quiz Questions",
    columns: [
      { name: "course_id", label: "Course ID", type: "number" },
      { name: "display_order", label: "Order", type: "number" },
      { name: "question", label: "Question", type: "textarea" },
      { name: "options", label: "Options JSON", type: "json" },
      { name: "answer_index", label: "Answer index", type: "number" }
    ]
  },
  lms_assignments: {
    title: "Assignments",
    columns: [
      { name: "course_id", label: "Course ID", type: "number" },
      { name: "prompt", label: "Prompt", type: "textarea" }
    ]
  }
};

function parseColumnValue(column, formData) {
  if (column.type === "checkbox") {
    return formData.get(column.name) === "on";
  }

  if (column.type === "number") {
    return Number(formData.get(column.name) || 0);
  }

  if (column.type === "json") {
    const raw = String(formData.get(column.name) || "").trim();
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  }

  return String(formData.get(column.name) || "");
}

function stringifyValue(value) {
  if (Array.isArray(value) || (value && typeof value === "object")) {
    return JSON.stringify(value, null, 2);
  }

  return value ?? "";
}

function hasValidLmsReferences(table, values) {
  if (table === "lms_modules") {
    return Number(values.course_id) > 0;
  }

  if (table === "lms_lessons") {
    return Number(values.module_id) > 0;
  }

  if (table === "lms_quiz_questions" || table === "lms_assignments") {
    return Number(values.course_id) > 0;
  }

  return true;
}

async function createLmsRow(formData) {
  "use server";
  await requireAdmin();

  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  const table = String(formData.get("table") || "");
  const config = EDITABLE_TABLES[table];
  if (!config) {
    return;
  }

  const values = {};
  for (const column of config.columns) {
    values[column.name] = parseColumnValue(column, formData);
  }

  if (!hasValidLmsReferences(table, values)) {
    return;
  }

  const tableRef = sql(table);
  await sql`insert into ${tableRef} ${sql(values, config.columns.map((column) => column.name))}`;

  revalidatePath("/education");
  revalidatePath("/admin/lms");
}

async function updateLmsRow(formData) {
  "use server";
  await requireAdmin();

  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  const table = String(formData.get("table") || "");
  const id = Number(formData.get("id"));
  const config = EDITABLE_TABLES[table];
  if (!config || !Number.isFinite(id)) {
    return;
  }

  const values = {};
  for (const column of config.columns) {
    values[column.name] = parseColumnValue(column, formData);
  }

  if (!hasValidLmsReferences(table, values)) {
    return;
  }

  values.updated_at = new Date();

  const tableRef = sql(table);
  await sql`
    update ${tableRef}
    set ${sql(values, [...config.columns.map((column) => column.name), "updated_at"])}
    where id = ${id}
  `;

  revalidatePath("/education");
  revalidatePath("/admin/lms");
}

async function deleteLmsRow(formData) {
  "use server";
  await requireAdmin();

  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  const table = String(formData.get("table") || "");
  const id = Number(formData.get("id"));
  const config = EDITABLE_TABLES[table];
  if (!config || !Number.isFinite(id)) {
    return;
  }

  const tableRef = sql(table);
  await sql`delete from ${tableRef} where id = ${id}`;

  revalidatePath("/education");
  revalidatePath("/admin/lms");
}

async function deleteCourse(formData) {
  "use server";
  await requireAdmin();

  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) {
    return;
  }

  await sql`delete from lms_courses where id = ${id}`;

  revalidatePath("/education");
  revalidatePath("/admin/lms");
}

async function updateSubmissionStatus(formData) {
  "use server";
  await requireAdmin();

  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureLmsSchema(sql);

  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "submitted");
  const reviewedNotes = String(formData.get("reviewed_notes") || "");

  if (!Number.isFinite(id)) {
    return;
  }

  await sql`
    update lms_assignment_submissions
    set status = ${status}, reviewed_notes = ${reviewedNotes || null}, updated_at = now()
    where id = ${id}
  `;

  revalidatePath("/admin/lms");
}

function renderInput(column, value, data = null) {
  if (column.name === "course_id" && data?.courses?.length) {
    return (
      <select name={column.name} defaultValue={value || ""} className="admin-input">
        <option value="">Choose course</option>
        {data.courses.map((course) => (
          <option key={course.id} value={course.id}>{course.title}</option>
        ))}
      </select>
    );
  }

  if (column.name === "module_id" && data?.modules?.length) {
    return (
      <select name={column.name} defaultValue={value || ""} className="admin-input">
        <option value="">Choose module</option>
        {data.modules.map((module) => (
          <option key={module.id} value={module.id}>{module.course_title} / {module.title}</option>
        ))}
      </select>
    );
  }

  if (column.type === "textarea" || column.type === "json") {
    return (
      <textarea
        name={column.name}
        defaultValue={stringifyValue(value)}
        rows={column.type === "json" ? 4 : 3}
        className="admin-textarea"
      />
    );
  }

  if (column.type === "checkbox") {
    return <input type="checkbox" name={column.name} defaultChecked={Boolean(value)} />;
  }

  return <input type={column.type} name={column.name} defaultValue={value ?? ""} className="admin-input" />;
}

function getCourseImpact(data, courseId) {
  return {
    modules: data.modules.filter((row) => row.course_id === courseId).length,
    lessons: data.lessons.filter((row) => row.course_id === courseId).length,
    questions: data.questions.filter((row) => row.course_id === courseId).length,
    assignments: data.assignments.filter((row) => row.course_id === courseId).length,
    enrollments: data.enrollments.filter((row) => row.course_id === courseId).length,
    submissions: data.submissions.filter((row) => row.course_id === courseId).length
  };
}

export default async function LmsAdminPage() {
  await requireAdmin();

  const data = await getLmsAdminData();

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>LMS Admin</h1>
          <p>Manage courses, modules, lessons, quizzes, assignments, learners, enrollments, and submissions.</p>
          {!data.hasDatabase ? (
            <p className="admin-error">DATABASE_URL is missing or unavailable. LMS admin needs the database.</p>
          ) : null}
        </div>
        <div className="admin-row__actions">
          <a href="/lms" className="button button--secondary">
            <span className="button__label">Open LMS</span>
          </a>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="button button--secondary">
              <span className="button__label">Sign out</span>
            </button>
          </form>
        </div>
      </div>

      <section className="admin-overview">
        <article className="admin-overview__metric"><strong>{data.courses.length}</strong><span>courses</span></article>
        <article className="admin-overview__metric"><strong>{data.learners.length}</strong><span>recent learners</span></article>
        <article className="admin-overview__metric"><strong>{data.enrollments.length}</strong><span>recent enrollments</span></article>
        <article className="admin-overview__metric"><strong>{data.submissions.length}</strong><span>assignment submissions</span></article>
      </section>

      <section className="admin-section">
        <div className="admin-section__header">
          <h2>Delete Courses</h2>
          <p>Removing a course also removes its modules, lessons, quizzes, assignments, enrollments, and learner progress for that course.</p>
        </div>
        <div className="admin-table">
          {data.courses.length ? data.courses.map((course) => {
            const impact = getCourseImpact(data, course.id);
            return (
              <form key={course.id} className="admin-row admin-row--danger" action={deleteCourse}>
                <input type="hidden" name="id" value={course.id} />
                <div>
                  <p><strong>{course.title}</strong></p>
                  <p className="admin-empty">ID {course.id} / {course.slug}</p>
                </div>
                <p>
                  {impact.modules} modules / {impact.lessons} lessons / {impact.questions} quiz questions / {impact.assignments} assignments
                </p>
                <p>
                  {impact.enrollments} recent enrollments / {impact.submissions} recent submissions shown here
                </p>
                <button type="submit" className="button button--danger">
                  <span className="button__label">Delete course</span>
                </button>
              </form>
            );
          }) : <p className="admin-empty">No courses to delete.</p>}
        </div>
      </section>

      {Object.entries(EDITABLE_TABLES).map(([table, config]) => {
        const rows =
          table === "lms_courses"
            ? data.courses
            : table === "lms_modules"
              ? data.modules
              : table === "lms_lessons"
                ? data.lessons
                : table === "lms_quiz_questions"
                  ? data.questions
                  : data.assignments;

        return (
          <section key={table} className="admin-section">
            <div className="admin-section__header">
              <h2>{config.title}</h2>
              <p>Table: {table}</p>
            </div>

            {data.hasDatabase ? (
              <>
                <form className="admin-form admin-form--inline" action={createLmsRow}>
                  <input type="hidden" name="table" value={table} />
                  {config.columns.map((column) => (
                    <label key={column.name} className="admin-field">
                      <span>{column.label}</span>
                      {renderInput(column, column.type === "json" ? [] : "", data)}
                    </label>
                  ))}
                  <button type="submit" className="button button--primary">
                    <span className="button__label">Add {config.title}</span>
                  </button>
                </form>

                <div className="admin-table">
                  {rows.length ? rows.map((row) => (
                    <form key={row.id} className="admin-row" action={updateLmsRow}>
                      <input type="hidden" name="table" value={table} />
                      <input type="hidden" name="id" value={row.id} />
                      {row.course_title ? <p className="admin-empty">Course: {row.course_title}</p> : null}
                      {row.module_title ? <p className="admin-empty">Module: {row.module_title}</p> : null}
                      {config.columns.map((column) => (
                        <label key={column.name} className="admin-field">
                          <span>{column.label}</span>
                          {renderInput(column, row[column.name], data)}
                        </label>
                      ))}
                      <div className="admin-row__actions">
                        <button type="submit" className="button button--secondary">
                          <span className="button__label">Save</span>
                        </button>
                        <button type="submit" formAction={deleteLmsRow} className="button button--ghost">
                          <span className="button__label">Delete</span>
                        </button>
                      </div>
                    </form>
                  )) : <p className="admin-empty">No entries yet.</p>}
                </div>
              </>
            ) : (
              <p className="admin-empty">Connect the database to manage LMS records.</p>
            )}
          </section>
        );
      })}

      <section className="admin-section">
        <div className="admin-section__header">
          <h2>Learners and Enrollments</h2>
          <p>Recent learner activity from the LMS backend.</p>
        </div>
        <div className="admin-table">
          {data.enrollments.length ? data.enrollments.map((row) => (
            <article key={row.id} className="admin-row">
              <p><strong>{row.full_name}</strong> / {row.email}</p>
              <p>{row.course_title}</p>
              <p>{new Date(row.created_at).toLocaleString()}</p>
            </article>
          )) : <p className="admin-empty">No enrollments yet.</p>}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section__header">
          <h2>Assignment Submissions</h2>
          <p>Review learner evidence and mark submitted work.</p>
        </div>
        <div className="admin-table">
          {data.submissions.length ? data.submissions.map((row) => (
            <form key={row.id} className="admin-row" action={updateSubmissionStatus}>
              <input type="hidden" name="id" value={row.id} />
              <p><strong>{row.full_name}</strong> / {row.email}</p>
              <p>{row.course_title}</p>
              <p>{row.response}</p>
              <label className="admin-field">
                <span>Status</span>
                <select name="status" defaultValue={row.status} className="admin-input">
                  <option value="submitted">Submitted</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                  <option value="needs_revision">Needs revision</option>
                </select>
              </label>
              <label className="admin-field">
                <span>Review notes</span>
                <textarea name="reviewed_notes" defaultValue={row.reviewed_notes || ""} rows={2} className="admin-textarea" />
              </label>
              <button type="submit" className="button button--secondary">
                <span className="button__label">Save review</span>
              </button>
            </form>
          )) : <p className="admin-empty">No assignment submissions yet.</p>}
        </div>
      </section>
    </main>
  );
}
