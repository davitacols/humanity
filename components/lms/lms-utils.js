// Pure helpers shared across the LMS learner experience.

export const LMS_PROGRESS_KEY = "humanity-first-lms-progress";
export const LMS_LEARNER_KEY = "humanity-first-lms-learner";

export const COMPLETION_LESSON_PERCENT = 80;
export const QUIZ_PASS_PERCENT = 70;

export function defaultLocalState() {
  return {
    enrolled: true,
    completedLessons: [],
    quizAnswers: {},
    assignmentDraft: "",
    assignmentSubmitted: false
  };
}

export function getAllLessons(course) {
  return (course?.modules || []).flatMap((module) =>
    (module.lessons || []).map((lesson) => ({ ...lesson, moduleTitle: module.title }))
  );
}

export function getCourseProgress(course, state) {
  const lessons = getAllLessons(course);
  const done = lessons.filter((lesson) => state?.completedLessons?.includes(lesson.id)).length;
  const total = lessons.length;
  return { completed: done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

export function scoreQuiz(course, state) {
  const quiz = course?.quiz || [];
  const correct = quiz.reduce(
    (sum, question) => (Number(state?.quizAnswers?.[question.id]) === question.answer ? sum + 1 : sum),
    0
  );
  return { correct, total: quiz.length, percent: quiz.length ? Math.round((correct / quiz.length) * 100) : 0 };
}

// Local (anonymous-preview) certificate gate, mirroring the server rule.
export function isCertificateReadyLocally(course, state) {
  const progress = getCourseProgress(course, state);
  const quiz = scoreQuiz(course, state);
  const quizSatisfied = quiz.total === 0 ? true : quiz.percent >= QUIZ_PASS_PERCENT;
  return (
    progress.percent >= COMPLETION_LESSON_PERCENT &&
    quizSatisfied &&
    Boolean(state?.assignmentSubmitted)
  );
}

// Resolve a lesson video URL into an embeddable player descriptor.
export function getVideoEmbed(url) {
  const trimmed = typeof url === "string" ? url.trim() : "";
  if (!trimmed) return null;

  const youtube = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (youtube) {
    return { type: "iframe", src: `https://www.youtube.com/embed/${youtube[1]}`, title: "YouTube video" };
  }

  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}`, title: "Vimeo video" };
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(trimmed)) {
    return { type: "video", src: trimmed };
  }

  return { type: "link", src: trimmed };
}

export function loadJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota / serialization errors */
  }
}

export function formatDate(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric" }).format(
      new Date(value)
    );
  } catch {
    return "";
  }
}

export function initials(name) {
  return String(name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}
