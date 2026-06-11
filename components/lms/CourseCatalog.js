import { getAllLessons, getCourseProgress } from "./lms-utils";

export function CourseCatalog({ courses, stateFor, onOpen }) {
  if (!courses.length) {
    return (
      <section className="lms-card lms-empty">
        <strong>No courses available yet</strong>
        <p>Courses appear here once instructors publish them to the academy.</p>
      </section>
    );
  }

  return (
    <div className="lms-catalog">
      {courses.map((course) => {
        const state = stateFor(course);
        const progress = getCourseProgress(course, state);
        const lessons = getAllLessons(course);
        const enrolled = Boolean(state.enrolled);

        return (
          <article key={course.id} className="lms-course-card">
            <div className="lms-course-card__top">
              <span className="lms-course-card__track">{course.track}</span>
              <span className="lms-course-card__level">{course.level}</span>
            </div>
            <h3 className="lms-course-card__title">{course.title}</h3>
            <p className="lms-course-card__summary">{course.summary}</p>

            <ul className="lms-course-card__meta">
              <li>{course.duration}</li>
              <li>{course.modules?.length || 0} modules</li>
              <li>{lessons.length} lessons</li>
            </ul>

            {enrolled && progress.total ? (
              <div className="lms-course-card__progress">
                <div className="lms-progress-bar">
                  <span style={{ width: `${progress.percent}%` }} />
                </div>
                <small>{progress.percent}% complete</small>
              </div>
            ) : null}

            <div className="lms-course-card__footer">
              <span className={`lms-pill${enrolled ? " lms-pill--pass" : ""}`}>
                {enrolled ? "Enrolled" : "Free"}
              </span>
              <button type="button" className="button button--primary" onClick={() => onOpen(course.id)}>
                {enrolled ? "Continue" : "Open course"}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
