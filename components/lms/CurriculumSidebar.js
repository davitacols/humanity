export function CurriculumSidebar({ course, completedLessons, activeLessonId, enrolled, onSelect, onToggle }) {
  const completedSet = new Set(completedLessons || []);
  const total = (course.modules || []).reduce((sum, module) => sum + (module.lessons || []).length, 0);
  const done = (course.modules || [])
    .flatMap((module) => module.lessons || [])
    .filter((lesson) => completedSet.has(lesson.id)).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <aside className="lms-curriculum" aria-label="Course curriculum">
      <div className="lms-curriculum__head">
        <strong>Curriculum</strong>
        <span>
          {done}/{total} lessons
        </span>
      </div>
      <div className="lms-curriculum__bar">
        <span style={{ width: `${percent}%` }} />
      </div>

      <div className="lms-curriculum__modules">
        {(course.modules || []).map((module, moduleIndex) => (
          <section key={module.id} className="lms-curriculum__module">
            <h3 className="lms-curriculum__module-title">
              <span>{String(moduleIndex + 1).padStart(2, "0")}</span>
              {module.title}
            </h3>
            <ul>
              {(module.lessons || []).map((lesson) => {
                const checked = completedSet.has(lesson.id);
                const active = lesson.id === activeLessonId;
                return (
                  <li key={lesson.id}>
                    <div className={`lms-curriculum__lesson${active ? " is-active" : ""}`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={!enrolled}
                        onChange={() => onToggle(lesson)}
                        aria-label={`Mark ${lesson.title} complete`}
                      />
                      <button type="button" className="lms-curriculum__lesson-btn" onClick={() => onSelect(lesson.id)}>
                        <span className="lms-curriculum__lesson-title">{lesson.title}</span>
                        <span className="lms-curriculum__lesson-meta">
                          {lesson.format} · {lesson.duration}
                        </span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
