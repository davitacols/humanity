import { revalidatePath } from "next/cache";
import Link from "next/link";
import { requireAdmin } from "../../../lib/admin-auth";
import { getSql } from "../../../lib/db";

const BLOG_COLUMNS = [
  { name: "display_order", label: "Order", type: "number" },
  { name: "slug", label: "Slug", type: "text" },
  { name: "title", label: "Title", type: "text" },
  { name: "excerpt", label: "Excerpt", type: "textarea" },
  { name: "category", label: "Category", type: "text", defaultValue: "Field notes" },
  { name: "author", label: "Author", type: "text", defaultValue: "Humanity First Initiative" },
  { name: "published_at", label: "Published date", type: "date" },
  { name: "reading_time", label: "Reading time", type: "text" },
  { name: "image_src", label: "Image src", type: "text" },
  { name: "image_alt", label: "Image alt", type: "textarea" },
  { name: "status", label: "Status", type: "text", defaultValue: "draft" },
  { name: "featured", label: "Featured", type: "checkbox" },
  { name: "body", label: "Body", type: "textarea", rows: 8 }
];

async function fetchPosts() {
  const sql = getSql();

  if (!sql) {
    return [];
  }

  try {
    const table = sql("blog_posts");
    return await sql`
      select *
      from ${table}
      order by featured desc, published_at desc nulls last, display_order asc, id asc
    `;
  } catch (error) {
    if (error?.code !== "42P01") {
      console.error("Failed to load admin blog posts:", error);
    }

    return [];
  }
}

function getFormValues(formData) {
  const values = {};

  BLOG_COLUMNS.forEach((column) => {
    if (column.type === "checkbox") {
      values[column.name] = formData.get(column.name) === "on";
    } else if (column.type === "number") {
      values[column.name] = Number(formData.get(column.name) || 0);
    } else if (column.type === "date") {
      values[column.name] = String(formData.get(column.name) || "") || null;
    } else {
      values[column.name] = String(formData.get(column.name) || "");
    }
  });

  return values;
}

function getInputValue(value, column) {
  if (!value) {
    return "";
  }

  if (column.type === "date") {
    return value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);
  }

  return String(value);
}

function revalidateBlogContent(slugs = []) {
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");

  slugs.filter(Boolean).forEach((slug) => {
    revalidatePath(`/blog/${slug}`);
  });
}

async function updatePost(formData) {
  "use server";
  await requireAdmin();

  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const id = Number(formData.get("id"));
  if (!id) {
    return;
  }

  const table = sql("blog_posts");
  const [existing] = await sql`select slug from ${table} where id = ${id}`;
  const values = getFormValues(formData);
  const [row] = await sql`
    update ${table}
    set ${sql(values, BLOG_COLUMNS.map((column) => column.name))}
    where id = ${id}
    returning slug
  `;

  if (row) {
    revalidateBlogContent([existing?.slug, row.slug]);
  }
}

async function createPost(formData) {
  "use server";
  await requireAdmin();

  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const table = sql("blog_posts");
  const values = getFormValues(formData);
  const [row] = await sql`
    insert into ${table} ${sql(values, BLOG_COLUMNS.map((column) => column.name))}
    returning slug
  `;

  revalidateBlogContent([row?.slug]);
}

async function deletePost(formData) {
  "use server";
  await requireAdmin();

  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const id = Number(formData.get("id"));
  if (!id) {
    return;
  }

  const table = sql("blog_posts");
  const [row] = await sql`delete from ${table} where id = ${id} returning slug`;

  revalidateBlogContent([row?.slug]);
}

function BlogField({ column, value }) {
  const resolvedValue = value ?? column.defaultValue ?? "";

  return (
    <label className="admin-field">
      <span>{column.label}</span>
      {column.type === "textarea" ? (
        <textarea
          name={column.name}
          defaultValue={getInputValue(resolvedValue, column)}
          rows={column.rows || 2}
          className="admin-textarea"
        />
      ) : column.type === "checkbox" ? (
        <input type="checkbox" name={column.name} defaultChecked={Boolean(resolvedValue)} />
      ) : (
        <input
          type={column.type}
          name={column.name}
          defaultValue={getInputValue(resolvedValue, column)}
          className="admin-input"
        />
      )}
    </label>
  );
}

export default async function BlogAdminPage() {
  await requireAdmin();

  const hasDb = Boolean(process.env.DATABASE_URL);
  const posts = await fetchPosts();

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Blog CMS</h1>
          <p>Write and publish field notes, articles, and public updates for the blog.</p>
          {!hasDb ? (
            <p className="admin-error">DATABASE_URL is missing. Blog edits are disabled.</p>
          ) : null}
        </div>
        <div className="admin-row__actions">
          <Link href="/blog" className="button button--secondary">
            <span className="button__label">View Blog</span>
          </Link>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="button button--secondary">
              <span className="button__label">Sign out</span>
            </button>
          </form>
        </div>
      </div>

      <section className="admin-section">
        <div className="admin-section__header">
          <h2>Create post</h2>
          <p>Use status "published" to make the post public. Any other value stays out of the public blog.</p>
        </div>

        {hasDb ? (
          <form className="admin-form admin-form--inline admin-form--blog" action={createPost}>
            {BLOG_COLUMNS.map((column) => (
              <BlogField key={column.name} column={column} />
            ))}
            <button type="submit" className="button button--primary">
              <span className="button__label">Add blog post</span>
            </button>
          </form>
        ) : (
          <p className="admin-empty">Connect the database to create blog posts.</p>
        )}
      </section>

      <section className="admin-section">
        <div className="admin-section__header">
          <h2>Manage posts</h2>
          <p>Table: blog_posts</p>
        </div>

        {hasDb ? (
          <div className="admin-table">
            {posts.length ? (
              posts.map((post) => (
                <form key={post.id} className="admin-row admin-row--blog" action={updatePost}>
                  <input type="hidden" name="id" value={post.id} />
                  {BLOG_COLUMNS.map((column) => (
                    <BlogField key={column.name} column={column} value={post[column.name]} />
                  ))}
                  <div className="admin-row__actions">
                    {post.status === "published" ? (
                      <Link href={`/blog/${post.slug}`} className="button button--ghost">
                        <span className="button__label">View public post</span>
                      </Link>
                    ) : (
                      <span className="admin-label">Draft hidden from public blog</span>
                    )}
                    <button type="submit" className="button button--secondary">
                      <span className="button__label">Save</span>
                    </button>
                    <button formAction={deletePost} className="button button--ghost" type="submit">
                      <span className="button__label">Delete</span>
                    </button>
                  </div>
                </form>
              ))
            ) : (
              <p className="admin-empty">
                No blog posts found yet. Run the database seed or create the first post above.
              </p>
            )}
          </div>
        ) : (
          <p className="admin-empty">Connect the database to manage blog posts.</p>
        )}
      </section>
    </main>
  );
}
