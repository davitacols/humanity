import { QUIZ_PASS_PERCENT, scoreQuiz } from "./lms-utils";

export function QuizPanel({ course, state, canSubmit, saving, latestQuiz, onAnswer, onSubmit }) {
  const quiz = course.quiz || [];
  const score = scoreQuiz(course, state);
  const passed = quiz.length > 0 && score.percent >= QUIZ_PASS_PERCENT;

  if (!quiz.length) {
    return (
      <section className="lms-card lms-empty">
        <strong>No quiz for this course yet</strong>
        <p>The instructor has not added assessment questions to this course.</p>
      </section>
    );
  }

  return (
    <section className="lms-card lms-quiz">
      <header className="lms-quiz__head">
        <div>
          <p className="lms-card__eyebrow">Knowledge check</p>
          <h2>{course.title}</h2>
        </div>
        <span className={`lms-pill${passed ? " lms-pill--pass" : ""}`}>
          {score.correct}/{score.total} · {score.percent}%
        </span>
      </header>

      <p className="lms-quiz__hint">Pass mark is {QUIZ_PASS_PERCENT}%. You can retake the quiz any time.</p>

      <ol className="lms-quiz__list">
        {quiz.map((question, questionIndex) => (
          <li key={question.id}>
            <fieldset className="lms-quiz__question">
              <legend>
                <span className="lms-quiz__num">{questionIndex + 1}</span>
                {question.question}
              </legend>
              <div className="lms-quiz__options">
                {question.options.map((option, optionIndex) => {
                  const id = `${question.id}-${optionIndex}`;
                  const checked = Number(state?.quizAnswers?.[question.id]) === optionIndex;
                  return (
                    <label key={id} htmlFor={id} className={`lms-quiz__option${checked ? " is-selected" : ""}`}>
                      <input
                        id={id}
                        type="radio"
                        name={question.id}
                        checked={checked}
                        onChange={() => onAnswer(question.id, optionIndex)}
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="lms-quiz__footer">
        <button type="button" className="button button--primary" onClick={onSubmit} disabled={saving || !canSubmit}>
          {saving ? "Saving…" : "Submit answers"}
        </button>
        {!canSubmit ? <span className="lms-quiz__note">Sign in and enroll to record your score.</span> : null}
        {latestQuiz ? (
          <span className="lms-quiz__note">
            Last saved score: {latestQuiz.score}/{latestQuiz.total}
          </span>
        ) : null}
      </div>
    </section>
  );
}
