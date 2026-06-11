export default function ErrorPage({ statusCode }) {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <section style={{ maxWidth: 520, textAlign: "center" }}>
        <p style={{ margin: 0, fontWeight: 800, color: "#188449" }}>
          {statusCode ? `Error ${statusCode}` : "Something went wrong"}
        </p>
        <h1 style={{ margin: "0.5rem 0", fontSize: "2rem" }}>We could not load this page.</h1>
        <p style={{ margin: 0, color: "#5f5243" }}>
          Please refresh the page or return to the Humanity First home page.
        </p>
      </section>
    </main>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
