export function AssignmentPanel({ course, draft, submitted, status, canSubmit, saving, onChange, onSubmit }) {
  return (
    <section className="lms-card lms-assignment">
      <header className="lms-assignment__head">
        <div>
          <p className="lms-card__eyebrow">Final assignment</p>
          <h2>{course.title}</h2>
        </div>
        <span className={`lms-pill${submitted ? " lms-pill--pass" : ""}`}>
          {submitted ? status || "Submitted" : "Pending"}
        </span>
      </header>

      <p className="lms-assignment__prompt">
        {course.assignment || "Submit your project link, notes, or evidence for this course."}
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label className="lms-field">
          <span>Your submission</span>
          <textarea
            value={draft}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Paste your project link, notes, or assignment evidence…"
            rows={7}
          />
        </label>

        <div className="lms-assignment__footer">
          <button type="submit" className="button button--primary" disabled={saving || !canSubmit}>
            {saving ? "Saving…" : submitted ? "Resubmit assignment" : "Submit assignment"}
          </button>
          {!canSubmit ? <span className="lms-quiz__note">Sign in and enroll to submit your assignment.</span> : null}
        </div>
      </form>
    </section>
  );
}
