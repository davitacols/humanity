import { getVideoEmbed } from "./lms-utils";

export function LessonPlayer({ lesson, completed, enrolled, saving, onToggle }) {
  if (!lesson) {
    return (
      <div className="lms-player">
        <div className="lms-player__stage lms-player__stage--empty">
          <p>Select a lesson from the curriculum to begin.</p>
        </div>
      </div>
    );
  }

  const embed = getVideoEmbed(lesson.videoUrl);
  const body = lesson.content || lesson.objective || "This lesson does not have written notes yet.";

  return (
    <article className="lms-player">
      <div className="lms-player__stage">
        {embed?.type === "iframe" ? (
          <iframe
            className="lms-player__frame"
            src={embed.src}
            title={embed.title || lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : embed?.type === "video" ? (
          <video className="lms-player__frame" src={embed.src} controls preload="metadata" />
        ) : (
          <div className="lms-player__poster">
            <span className="lms-player__poster-kicker">{lesson.format || "Lesson"}</span>
            <strong>{lesson.title}</strong>
            <span>{lesson.duration || "Self-paced"}</span>
          </div>
        )}
      </div>

      <div className="lms-player__body">
        <div className="lms-player__heading">
          <p className="lms-player__eyebrow">
            {lesson.moduleTitle ? `${lesson.moduleTitle} · ` : ""}
            {lesson.format || "Lesson"} · {lesson.duration || "Self-paced"}
          </p>
          <h2>{lesson.title}</h2>
        </div>

        {lesson.objective && lesson.content ? (
          <p className="lms-player__objective">{lesson.objective}</p>
        ) : null}

        <div className="lms-player__content">
          {String(body)
            .split(/\n{2,}/)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>

        <div className="lms-player__actions">
          {embed?.type === "link" ? (
            <a href={embed.src} target="_blank" rel="noreferrer" className="button button--secondary">
              Open resource
            </a>
          ) : null}
          <button
            type="button"
            className={`button button--primary${completed ? " is-complete" : ""}`}
            onClick={onToggle}
            disabled={!enrolled || saving}
          >
            {completed ? "✓ Completed" : saving ? "Saving…" : "Mark complete"}
          </button>
        </div>
      </div>
    </article>
  );
}
