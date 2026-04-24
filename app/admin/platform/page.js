import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../lib/admin-auth";
import { getSql } from "../../../lib/db";

const TABLES = {
  changemakers: {
    title: "Changemakers",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "tags", label: "Tags (comma separated)", type: "text" },
      { name: "href", label: "Link", type: "text" },
      { name: "href_label", label: "Link label", type: "text" },
      { name: "image_src", label: "Image src", type: "text" },
      { name: "image_alt", label: "Image alt", type: "textarea" },
      { name: "image_label", label: "Image label", type: "text" },
      { name: "image_ratio", label: "Image ratio", type: "text" }
    ]
  },
  platform_updates: {
    title: "Platform Updates",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "category", label: "Category", type: "text" },
      { name: "date_label", label: "Date label", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "href", label: "Optional link", type: "text" },
      { name: "cta_label", label: "Optional CTA label", type: "text" }
    ]
  },
  gallery_items: {
    title: "Gallery Items",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "src", label: "Image src", type: "text" },
      { name: "alt", label: "Image alt", type: "textarea" },
      { name: "label", label: "Image label", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "ratio", label: "Ratio", type: "text" }
    ]
  }
};

async function fetchTable(table) {
  const sql = getSql();
  if (!sql) {
    return [];
  }

  try {
    const tableRef = sql(table);
    return await sql`select * from ${tableRef} order by display_order asc, id asc`;
  } catch (error) {
    if (error?.code === "42P01") {
      return [];
    }

    console.error(`Failed to load admin table ${table}:`, error);
    return [];
  }
}

function revalidatePlatformContent() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/blog");
  revalidatePath("/gallery");
  revalidatePath("/get-involved");
}

async function updateRow(formData) {
  "use server";
  await requireAdmin();

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
    if (column.type === "number") {
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
    revalidatePlatformContent();
    revalidatePath("/admin/platform");
  }
}

async function createRow(formData) {
  "use server";
  await requireAdmin();

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
    if (column.type === "number") {
      values[column.name] = Number(formData.get(column.name) || 0);
    } else {
      values[column.name] = String(formData.get(column.name) || "");
    }
  });

  const tableRef = sql(table);
  await sql`insert into ${tableRef} ${sql(values, config.columns.map((col) => col.name))}`;

  revalidatePlatformContent();
  revalidatePath("/admin/platform");
}

async function deleteRow(formData) {
  "use server";
  await requireAdmin();

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

  revalidatePlatformContent();
  revalidatePath("/admin/platform");
}

export default async function PlatformAdminPage() {
  await requireAdmin();

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
          <h1>Platform Content Admin</h1>
          <p>Manage changemakers, platform updates, and gallery content on the public site.</p>
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
                        <button formAction={deleteRow} className="button button--ghost" type="submit">
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
