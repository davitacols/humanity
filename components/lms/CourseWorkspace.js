import { CurriculumSidebar } from "./CurriculumSidebar";
import { LessonPlayer } from "./LessonPlayer";
import { getCourseProgress, scoreQuiz } from "./lms-utils";

export function CourseWorkspace({
  course,
  state,
  activeLesson,
  enrolled,
  saving,
  isAuthed,
  onSelectLesson,
  onToggleLesson,
  onEnroll
}) {
  const progress = getCourseProgress(course, state);
  const quiz = scoreQuiz(course, state);
  const certificate = state.certificate;
  const certificateReady = isAuthed ? Boolean(state.certificateReady) : false;

  return (
    <div className="lms-workspace">
      <div className="lms-workspace__main">
        {!enrolled ? (
          <div className="lms-enroll-gate">
            <div>
              <strong>Enroll to unlock this course</strong>
              <p>Save lesson progress, quiz scores, and your assignment, and earn a certificate.</p>
            </div>
            <button type="button" className="button button--primary" onClick={onEnroll} disabled={saving}>
              {saving ? "Enrolling…" : isAuthed ? "Enroll now" : "Sign in to enroll"}
            </button>
          </div>
        ) : null}

        <LessonPlayer
          lesson={activeLesson}
          completed={Boolean(activeLesson && state.completedLessons?.includes(activeLesson.id))}
          enrolled={enrolled}
          saving={saving}
          onToggle={() => activeLesson && onToggleLesson(activeLesson)}
        />

        {course.outcomes?.length ? (
          <section className="lms-card lms-outcomes">
            <p className="lms-card__eyebrow">What you'll be able to do</p>
            <ul>
              {course.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={`lms-card lms-cert-card${certificate ? " is-issued" : certificateReady ? " is-ready" : ""}`}>
          <div className="lms-cert-card__info">
            <p className="lms-card__eyebrow">Certificate</p>
            <strong>
              {certificate ? "Certificate issued" : certificateReady ? "Certificate ready" : "Keep going"}
            </strong>
            <small>
              Lessons {progress.percent}% · Quiz {quiz.percent}%
              {state.assignmentSubmitted ? " · Assignment submitted" : ""}
            </small>
          </div>
          {certificate ? (
            <a className="button button--primary" href={`/lms/certificate/${certificate.serial}`}>
              View certificate
            </a>
          ) : (
            <span className="lms-cert-card__hint">
              {isAuthed
                ? "Finish lessons, pass the quiz, and submit the assignment."
                : "Sign in to earn a verified certificate."}
            </span>
          )}
        </section>
      </div>

      <CurriculumSidebar
        course={course}
        completedLessons={state.completedLessons}
        activeLessonId={activeLesson?.id}
        enrolled={enrolled}
        onSelect={onSelectLesson}
        onToggle={onToggleLesson}
      />
    </div>
  );
}
