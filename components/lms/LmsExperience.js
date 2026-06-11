"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AssignmentPanel } from "./AssignmentPanel";
import { CourseCatalog } from "./CourseCatalog";
import { CourseWorkspace } from "./CourseWorkspace";
import { QuizPanel } from "./QuizPanel";
import {
  LMS_LEARNER_KEY,
  LMS_PROGRESS_KEY,
  defaultLocalState,
  getAllLessons,
  getCourseProgress,
  initials,
  isCertificateReadyLocally,
  loadJson,
  saveJson,
  scoreQuiz
} from "./lms-utils";

const VIEWS = [
  { id: "catalog", label: "Courses" },
  { id: "workspace", label: "Learn" },
  { id: "quiz", label: "Assessment" },
  { id: "assignment", label: "Assignment" }
];

export function LmsExperience({ courses: initialCourses, hasDatabase = false, initialCourseId = "" }) {
  const [courses, setCourses] = useState(initialCourses || []);
  const [account, setAccount] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [localProgress, setLocalProgress] = useState({});
  const [drafts, setDrafts] = useState({});
  const [activeCourseId, setActiveCourseId] = useState(initialCourseId || initialCourses?.[0]?.id || "");
  const [activeLessonId, setActiveLessonId] = useState("");
  const [view, setView] = useState(initialCourseId ? "workspace" : "catalog");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const isAuthed = Boolean(account?.id);

  useEffect(() => {
    setCourses(initialCourses || []);
  }, [initialCourses]);

  // Establish the session and pick the source of truth.
  useEffect(() => {
    let active = true;
    async function bootstrap() {
      try {
        const res = await fetch("/api/lms/auth");
        const data = await res.json();
        const acct = data.account;
        if (active && acct?.role === "student" && acct.learnerId) {
          setAccount({ id: acct.learnerId, accountId: acct.id, fullName: acct.fullName, email: acct.email });
          const catalogRes = await fetch("/api/lms");
          const catalog = await catalogRes.json();
          if (active && catalog.ok && Array.isArray(catalog.courses)) setCourses(catalog.courses);
        } else if (active) {
          setLocalProgress(loadJson(LMS_PROGRESS_KEY, {}));
        }
      } catch {
        if (active) setLocalProgress(loadJson(LMS_PROGRESS_KEY, {}));
      } finally {
        if (active) setAuthChecked(true);
      }
    }
    bootstrap();
    return () => {
      active = false;
    };
  }, []);

  // Persist anonymous preview progress only.
  useEffect(() => {
    if (authChecked && !isAuthed) saveJson(LMS_PROGRESS_KEY, localProgress);
  }, [authChecked, isAuthed, localProgress]);

  const stateFor = useCallback(
    (course) => {
      if (isAuthed) {
        const ls = course.learnerState || {};
        const draft = drafts[course.id] || {};
        return {
          enrolled: Boolean(ls.enrolled),
          completedLessons: ls.completedLessons || [],
          quizAnswers: draft.quizAnswers ?? ls.quizAnswers ?? {},
          assignmentDraft: draft.assignmentDraft ?? ls.assignmentDraft ?? "",
          assignmentSubmitted: Boolean(ls.assignmentSubmitted),
          assignmentStatus: ls.assignmentStatus || "",
          certificate: ls.certificate || null,
          certificateReady: Boolean(ls.certificateReady),
          latestQuiz: ls.latestQuiz || null
        };
      }
      const local = localProgress[course.id] || defaultLocalState();
      return { ...local, enrolled: true, certificate: null, certificateReady: false, latestQuiz: null };
    },
    [isAuthed, drafts, localProgress]
  );

  const activeCourse = useMemo(
    () => courses.find((course) => course.id === activeCourseId) || courses[0],
    [courses, activeCourseId]
  );
  const activeState = activeCourse ? stateFor(activeCourse) : null;
  const activeLessons = useMemo(() => (activeCourse ? getAllLessons(activeCourse) : []), [activeCourse]);
  const activeLesson =
    activeLessons.find((lesson) => lesson.id === activeLessonId) ||
    activeLessons.find((lesson) => !activeState?.completedLessons?.includes(lesson.id)) ||
    activeLessons[0];

  // Keep the selected lesson valid as the course changes.
  useEffect(() => {
    if (!activeCourse || !activeLessons.length) return;
    setActiveLessonId((current) => {
      if (activeLessons.some((lesson) => lesson.id === current)) return current;
      const next = activeLessons.find((lesson) => !activeState?.completedLessons?.includes(lesson.id));
      return (next || activeLessons[0]).id;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCourse?.id, activeLessons.length]);

  const dashboard = useMemo(() => {
    const rows = courses.map((course) => {
      const state = stateFor(course);
      return {
        enrolled: Boolean(state.enrolled),
        progress: getCourseProgress(course, state),
        hasCertificate: Boolean(state.certificate) || isCertificateReadyLocally(course, state)
      };
    });
    const enrolledRows = rows.filter((row) => row.enrolled);
    return {
      enrolled: enrolledRows.length,
      certificates: rows.filter((row) => row.hasCertificate).length,
      avgProgress: enrolledRows.length
        ? Math.round(enrolledRows.reduce((sum, row) => sum + row.progress.percent, 0) / enrolledRows.length)
        : 0
    };
  }, [courses, stateFor]);

  function updateLocal(courseId, updater) {
    setLocalProgress((current) => ({
      ...current,
      [courseId]: updater(current[courseId] || defaultLocalState())
    }));
  }

  function updateDraft(courseId, patch) {
    setDrafts((current) => ({ ...current, [courseId]: { ...current[courseId], ...patch } }));
  }

  function clearDraftKey(courseId, key) {
    setDrafts((current) => {
      const next = { ...(current[courseId] || {}) };
      delete next[key];
      return { ...current, [courseId]: next };
    });
  }

  async function syncFromResponse(res) {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "That action could not be saved.");
    if (Array.isArray(data.courses)) setCourses(data.courses);
    return data;
  }

  function requireSignIn() {
    window.location.href = `/lms/login?next=${encodeURIComponent("/lms")}`;
  }

  async function enroll(course) {
    if (!isAuthed) return requireSignIn();
    if (!course?.dbId) {
      setStatus("Preview mode — sign in with a live database to enroll.");
      return;
    }
    setSaving(true);
    setStatus("");
    try {
      await syncFromResponse(
        await fetch("/api/lms/enroll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: course.dbId })
        })
      );
      setActiveCourseId(course.id);
      setStatus(`Enrolled in ${course.title}.`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleLesson(lesson) {
    if (!activeCourse) return;
    const state = stateFor(activeCourse);
    if (!state.enrolled) {
      setStatus("Enroll in this course first.");
      return;
    }
    const shouldComplete = !state.completedLessons?.includes(lesson.id);

    if (!isAuthed) {
      updateLocal(activeCourse.id, (current) => {
        const set = new Set(current.completedLessons || []);
        if (shouldComplete) set.add(lesson.id);
        else set.delete(lesson.id);
        return { ...current, completedLessons: Array.from(set) };
      });
      return;
    }

    if (!lesson.dbId) return;
    setSaving(true);
    try {
      await syncFromResponse(
        await fetch("/api/lms/progress", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId: lesson.dbId, completed: shouldComplete })
        })
      );
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSaving(false);
    }
  }

  function answerQuestion(questionId, optionIndex) {
    if (!activeCourse) return;
    if (isAuthed) {
      const current = stateFor(activeCourse).quizAnswers || {};
      updateDraft(activeCourse.id, { quizAnswers: { ...current, [questionId]: optionIndex } });
    } else {
      updateLocal(activeCourse.id, (current) => ({
        ...current,
        quizAnswers: { ...(current.quizAnswers || {}), [questionId]: optionIndex }
      }));
    }
  }

  async function submitQuiz() {
    if (!activeCourse) return;
    const state = stateFor(activeCourse);

    if (!isAuthed) {
      const score = scoreQuiz(activeCourse, state);
      setStatus(`Preview score: ${score.correct}/${score.total}. Sign in to record it.`);
      return;
    }
    if (!activeCourse.dbId || !state.enrolled) {
      setStatus("Enroll in this course to record quiz scores.");
      return;
    }
    setSaving(true);
    setStatus("");
    try {
      const data = await syncFromResponse(
        await fetch("/api/lms/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: activeCourse.dbId, answers: state.quizAnswers || {} })
        })
      );
      clearDraftKey(activeCourse.id, "quizAnswers");
      setStatus(`Quiz saved — ${data.attempt.score}/${data.attempt.total}.`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSaving(false);
    }
  }

  function setAssignmentDraft(value) {
    if (!activeCourse) return;
    if (isAuthed) {
      updateDraft(activeCourse.id, { assignmentDraft: value });
    } else {
      updateLocal(activeCourse.id, (current) => ({
        ...current,
        assignmentDraft: value,
        assignmentSubmitted: false
      }));
    }
  }

  async function submitAssignment() {
    if (!activeCourse) return;
    const state = stateFor(activeCourse);

    if (!isAuthed) {
      if (!state.assignmentDraft?.trim()) {
        setStatus("Write your submission before submitting.");
        return;
      }
      updateLocal(activeCourse.id, (current) => ({ ...current, assignmentSubmitted: true }));
      setStatus("Saved locally. Sign in to submit for review.");
      return;
    }
    if (!activeCourse.dbId || !state.enrolled) {
      setStatus("Enroll in this course to submit your assignment.");
      return;
    }
    setSaving(true);
    setStatus("");
    try {
      await syncFromResponse(
        await fetch("/api/lms/assignment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: activeCourse.dbId, response: state.assignmentDraft || "" })
        })
      );
      clearDraftKey(activeCourse.id, "assignmentDraft");
      setStatus("Assignment submitted.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    try {
      await fetch("/api/lms/auth", { method: "DELETE" });
    } catch {
      /* ignore */
    }
    if (typeof window !== "undefined") window.localStorage.removeItem(LMS_LEARNER_KEY);
    window.location.href = "/lms";
  }

  function openCourse(courseId) {
    setActiveCourseId(courseId);
    setView("workspace");
    setStatus("");
  }

  if (!activeCourse) {
    return (
      <main className="site-main lms">
        <div className="lms__inner">
          <section className="lms-card lms-empty">
            <strong>No courses available yet</strong>
            <p>Courses appear here once instructors publish them to the academy.</p>
          </section>
        </div>
      </main>
    );
  }

  const firstName = isAuthed ? account.fullName.split(" ")[0] : "";

  return (
    <main className="site-main lms">
      <header className="lms-head">
        <div className="lms-head__text">
          <p className="lms-head__eyebrow">
            Humanity First Academy
            <span className={`lms-head__status${hasDatabase ? " is-live" : ""}`}>
              {hasDatabase ? "Live" : "Preview"}
            </span>
          </p>
          <h1>{isAuthed ? `Welcome back, ${firstName}.` : "Learn practical skills, free."}</h1>
          <p className="lms-head__sub">
            {isAuthed
              ? "Pick up where you left off, take assessments, and earn verified certificates."
              : "Browse courses, work through lessons at your own pace, and sign in to save progress and earn certificates."}
          </p>
        </div>

        <div className="lms-head__account">
          {isAuthed ? (
            <div className="lms-account">
              <span className="lms-account__avatar" aria-hidden="true">
                {initials(account.fullName)}
              </span>
              <div className="lms-account__id">
                <strong>{account.fullName}</strong>
                <span>{account.email}</span>
              </div>
              <button type="button" className="button button--secondary" onClick={signOut}>
                Sign out
              </button>
            </div>
          ) : (
            <a className="button button--primary" href="/lms/login?next=/lms">
              Sign in to save progress
            </a>
          )}
        </div>
      </header>

      <section className="lms-stats" aria-label="Your learning summary">
        <div className="lms-stat">
          <span>Enrolled</span>
          <strong>{dashboard.enrolled}</strong>
        </div>
        <div className="lms-stat lms-stat--accent">
          <span>Avg progress</span>
          <strong>{dashboard.avgProgress}%</strong>
        </div>
        <div className="lms-stat lms-stat--gold">
          <span>Certificates</span>
          <strong>{dashboard.certificates}</strong>
        </div>
        <div className="lms-stat">
          <span>Continue</span>
          <strong className="lms-stat__course">{activeCourse.title}</strong>
        </div>
      </section>

      <nav className="lms-tabs" aria-label="LMS sections">
        {VIEWS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`lms-tab${view === item.id ? " is-active" : ""}`}
            onClick={() => setView(item.id)}
            aria-current={view === item.id ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="lms__inner">
        {status ? (
          <p className="lms-notice" role="status">
            {status}
          </p>
        ) : null}

        {view === "catalog" ? (
          <CourseCatalog courses={courses} stateFor={stateFor} onOpen={openCourse} />
        ) : null}

        {view === "workspace" ? (
          <CourseWorkspace
            course={activeCourse}
            state={activeState}
            activeLesson={activeLesson}
            enrolled={Boolean(activeState.enrolled)}
            saving={saving}
            isAuthed={isAuthed}
            onSelectLesson={setActiveLessonId}
            onToggleLesson={toggleLesson}
            onEnroll={() => enroll(activeCourse)}
          />
        ) : null}

        {view === "quiz" ? (
          <QuizPanel
            course={activeCourse}
            state={activeState}
            canSubmit={!isAuthed || (Boolean(activeCourse.dbId) && Boolean(activeState.enrolled))}
            saving={saving}
            latestQuiz={activeState.latestQuiz}
            onAnswer={answerQuestion}
            onSubmit={submitQuiz}
          />
        ) : null}

        {view === "assignment" ? (
          <AssignmentPanel
            course={activeCourse}
            draft={activeState.assignmentDraft || ""}
            submitted={Boolean(activeState.assignmentSubmitted)}
            status={activeState.assignmentStatus}
            canSubmit={!isAuthed || (Boolean(activeCourse.dbId) && Boolean(activeState.enrolled))}
            saving={saving}
            onChange={setAssignmentDraft}
            onSubmit={submitAssignment}
          />
        ) : null}
      </div>
    </main>
  );
}
