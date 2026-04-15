import { revalidatePath } from "next/cache";
import { getSql } from "../../../lib/db";

const TABLES = {
  education_metrics: {
    title: "Metrics",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "value", label: "Value", type: "text" },
      { name: "label", label: "Label", type: "text" }
    ]
  },
  education_tracks: {
    title: "Tracks",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "tone", label: "Tone", type: "text" }
    ]
  },
  education_resources: {
    title: "Core Resources",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "tone", label: "Tone", type: "text" }
    ]
  },
  education_library_items: {
    title: "Library Items",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "title", label: "Title", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "category", label: "Category", type: "text" },
      { name: "format", label: "Format", type: "text" },
      { name: "level", label: "Level", type: "text" },
      { name: "action_label", label: "Action label", type: "text" },
      { name: "href", label: "Link", type: "text" },
      { name: "external", label: "External", type: "checkbox" }
    ]
  },
  education_sessions: {
    title: "Sessions",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "tone", label: "Tone", type: "text" }
    ]
  },
  education_actions: {
    title: "Actions",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "tone", label: "Tone", type: "text" }
    ]
  }
};

async function fetchTable(table) {
  const sql = getSql();
  if (!sql) {
    return [];
  }
  const tableRef = sql(table);
  return sql`select * from ${tableRef} order by display_order asc, id asc`;
}

async function updateRow(formData) {
  "use server";
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const table = formData.get("table");
  const id = Number(formData.get("id"));
  const config = TABLES[table];
  if (!config || !id) {
    return;
  }

  const values = {};
  config.columns.forEach((column) => {
    if (column.type === "checkbox") {
      values[column.name] = formData.get(column.name) === "on";
    } else if (column.type === "number") {
      values[column.name] = Number(formData.get(column.name) || 0);
    } else {
      values[column.name] = String(formData.get(column.name) || "");
    }
  });

  const tableRef = sql(table);
  const [row] = await sql`
    update ${tableRef}
    set ${sql(values, config.columns.map((col) => col.name))}
    where id = ${id}
    returning id
  `;

  if (row) {
    revalidatePath("/education");
    revalidatePath("/admin/education");
  }
}

async function createRow(formData) {
  "use server";
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const table = formData.get("table");
  const config = TABLES[table];
  if (!config) {
    return;
  }

  const values = {};
  config.columns.forEach((column) => {
    if (column.type === "checkbox") {
      values[column.name] = formData.get(column.name) === "on";
    } else if (column.type === "number") {
      values[column.name] = Number(formData.get(column.name) || 0);
    } else {
      values[column.name] = String(formData.get(column.name) || "");
    }
  });

  const tableRef = sql(table);
  await sql`insert into ${tableRef} ${sql(values, config.columns.map((col) => col.name))}`;

  revalidatePath("/education");
  revalidatePath("/admin/education");
}

async function deleteRow(formData) {
  "use server";
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const table = formData.get("table");
  const id = Number(formData.get("id"));
  const config = TABLES[table];
  if (!config || !id) {
    return;
  }

  const tableRef = sql(table);
  await sql`delete from ${tableRef} where id = ${id}`;

  revalidatePath("/education");
  revalidatePath("/admin/education");
}

export default async function EducationAdminPage() {
  const hasDb = Boolean(process.env.DATABASE_URL);
  const data = Object.fromEntries(
    await Promise.all(
      Object.keys(TABLES).map(async (table) => [table, await fetchTable(table)])
    )
  );

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Education Hub Admin</h1>
          <p>Update the education hub content displayed on the public site.</p>
          {!hasDb ? (
            <p className="admin-error">DATABASE_URL is missing. Admin edits are disabled.</p>
          ) : null}
        </div>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="button button--secondary">
            <span className="button__label">Sign out</span>
          </button>
        </form>
      </div>

      {Object.entries(TABLES).map(([table, config]) => (
        <section key={table} className="admin-section">
          <div className="admin-section__header">
            <h2>{config.title}</h2>
            <p>Table: {table}</p>
          </div>
          {hasDb ? (
            <>
              <form className="admin-form admin-form--inline" action={createRow}>
                <input type="hidden" name="table" value={table} />
                {config.columns.map((column) => (
                  <label key={column.name} className="admin-field">
                    <span>{column.label}</span>
                    {column.type === "textarea" ? (
                      <textarea name={column.name} rows={2} className="admin-textarea" />
                    ) : column.type === "checkbox" ? (
                      <input type="checkbox" name={column.name} />
                    ) : (
                      <input type={column.type} name={column.name} className="admin-input" />
                    )}
                  </label>
                ))}
                <button type="submit" className="button button--primary">
                  <span className="button__label">Add {config.title}</span>
                </button>
              </form>

              <div className="admin-table">
                {data[table]?.length ? (
                  data[table].map((row) => (
                    <form key={row.id} className="admin-row" action={updateRow}>
                      <input type="hidden" name="table" value={table} />
                      <input type="hidden" name="id" value={row.id} />
                      {config.columns.map((column) => {
                        const value = row[column.name];
                        if (column.type === "textarea") {
                          return (
                            <label key={column.name} className="admin-field">
                              <span>{column.label}</span>
                              <textarea
                                name={column.name}
                                defaultValue={value ?? ""}
                                rows={2}
                                className="admin-textarea"
                              />
                            </label>
                          );
                        }
                        if (column.type === "checkbox") {
                          return (
                            <label key={column.name} className="admin-field">
                              <span>{column.label}</span>
                              <input type="checkbox" name={column.name} defaultChecked={Boolean(value)} />
                            </label>
                          );
                        }
                        return (
                          <label key={column.name} className="admin-field">
                            <span>{column.label}</span>
                            <input
                              type={column.type}
                              name={column.name}
                              defaultValue={value ?? ""}
                              className="admin-input"
                            />
                          </label>
                        );
                      })}
                      <div className="admin-row__actions">
                        <button type="submit" className="button button--secondary">
                          <span className="button__label">Save</span>
                        </button>
                        <button
                          formAction={deleteRow}
                          className="button button--ghost"
                          type="submit"
                        >
                          <span className="button__label">Delete</span>
                        </button>
                      </div>
                    </form>
                  ))
                ) : (
                  <p className="admin-empty">No entries yet.</p>
                )}
              </div>
            </>
          ) : (
            <p className="admin-empty">Connect the database to manage this table.</p>
          )}
        </section>
      ))}
    </main>
  );
}
