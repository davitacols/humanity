import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../../lib/admin-auth";
import { getSql } from "../../../lib/db";
import { getRecentDonationPayments } from "../../../lib/donation-payments";
import { getPaymentProviderAvailability } from "../../../lib/payment-providers";

const TABLES = {
  donation_funds: {
    title: "Donation Funds",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "slug", label: "Slug", type: "text" },
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "support_area", label: "Support area", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "amount_label", label: "Amount label", type: "text" },
      { name: "target_amount_ngn", label: "Target amount (NGN)", type: "number" },
      { name: "raised_amount_ngn", label: "Raised amount (NGN)", type: "number" },
      { name: "beneficiaries_label", label: "Beneficiaries label", type: "text" },
      { name: "status_label", label: "Status label", type: "text" },
      { name: "href", label: "Route link", type: "text" },
      { name: "href_label", label: "Route link label", type: "text" },
      { name: "payment_url", label: "Hosted payment URL", type: "text" }
    ]
  },
  transparency_entries: {
    title: "Transparency Entries",
    columns: [
      { name: "display_order", label: "Order", type: "number" },
      { name: "period_label", label: "Period label", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "amount_label", label: "Amount label", type: "text" },
      { name: "allocation_label", label: "Allocation label", type: "textarea" },
      { name: "status_label", label: "Status label", type: "text" },
      { name: "href", label: "Optional link", type: "text" },
      { name: "cta_label", label: "Optional CTA label", type: "text" }
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

function revalidateDonationContent() {
  revalidatePath("/donate");
  revalidatePath("/donate/transparency");
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
    set ${sql(values, config.columns.map((column) => column.name))}
    where id = ${id}
    returning id
  `;

  if (row) {
    revalidateDonationContent();
    revalidatePath("/admin/donations");
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
  await sql`insert into ${tableRef} ${sql(values, config.columns.map((column) => column.name))}`;

  revalidateDonationContent();
  revalidatePath("/admin/donations");
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

  revalidateDonationContent();
  revalidatePath("/admin/donations");
}

function formatMoney(amount, currency) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "NGN" ? 0 : 2
  }).format(Number(amount || 0));
}

export default async function DonationAdminPage() {
  await requireAdmin();

  const hasDb = Boolean(process.env.DATABASE_URL);
  const providerAvailability = getPaymentProviderAvailability();
  const recentPayments = hasDb ? await getRecentDonationPayments(14) : [];
  const data = Object.fromEntries(
    await Promise.all(
      Object.keys(TABLES).map(async (table) => [table, await fetchTable(table)])
    )
  );

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Donation Admin</h1>
          <p>Manage live giving routes, hosted payment links, and public transparency entries.</p>
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

      <section className="admin-section">
        <div className="admin-section__header">
          <h2>Provider status</h2>
          <p>Live payment readiness for the public donate flow.</p>
        </div>
        <div className="admin-table admin-table--compact">
          {Object.values(providerAvailability).map((provider) => (
            <article key={provider.id} className="admin-provider-card">
              <div className="admin-provider-card__meta">
                <strong>{provider.label}</strong>
                <span className={`status-badge status-badge--${provider.configured ? "published" : "pending"}`}>
                  {provider.configured ? "configured" : "missing config"}
                </span>
              </div>
              <p>{provider.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section__header">
          <h2>Recent payments</h2>
          <p>Latest payment attempts and confirmations returned by Flutterwave and PayPal.</p>
        </div>
        {hasDb ? (
          recentPayments.length ? (
            <div className="admin-table admin-table--compact">
              {recentPayments.map((payment) => (
                <article key={payment.reference} className="admin-payment-card">
                  <div className="admin-payment-card__meta">
                    <strong>{payment.reference}</strong>
                    <span className={`status-badge status-badge--${payment.status}`}>
                      {payment.status}
                    </span>
                  </div>
                  <p>
                    {payment.fundTitle} · {payment.provider} · {formatMoney(payment.amount, payment.currency)}
                  </p>
                  <p>{payment.donorName} · {payment.donorEmail}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="admin-empty">No payment attempts have been recorded yet.</p>
          )
        ) : (
          <p className="admin-empty">Connect the database to track live payment attempts and confirmations.</p>
        )}
      </section>

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
