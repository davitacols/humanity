"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "humanity-first-lms-progress";
const LEARNER_KEY = "humanity-first-lms-learner";

function getAllLessons(course) {
  return (course.modules || []).flatMap((module) =>
    (module.lessons || []).map((lesson) => ({ ...lesson, moduleTitle: module.title }))
  );
}

function loadJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function getCourseState(progress, courseId) {
  return progress[courseId] || {
    completedLessons: [],
    quizAnswers: {},
    assignmentDraft: "",
    assignmentSubmitted: false
  };
}

function scoreQuiz(course, state) {
  const quiz = course.quiz || [];
  const correct = quiz.reduce((sum, question) => {
    return Number(state.quizAnswers?.[question.id]) === question.answer ? sum + 1 : sum;
  }, 0);

  return {
    correct,
    total: quiz.length,
    percent: quiz.length ? Math.round((correct / quiz.length) * 100) : 0
  };
}

function getCourseProgress(course, state) {
  const lessons = getAllLessons(course);
  const completed = lessons.filter((lesson) => state.completedLessons?.includes(lesson.id)).length;
  return {
    completed,
    total: lessons.length,
    percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0
  };
}

function getMergedState(course, progress, learner) {
  const localState = getCourseState(progress, course.id);
  const backendState = course.learnerState || getCourseState({}, course.id);

  if (!learner?.id) {
    return localState;
  }

  return {
    ...backendState,
    quizAnswers: {
      ...(backendState.quizAnswers || {}),
      ...(localState.quizAnswers || {})
    },
    assignmentDraft: localState.assignmentDraft || backendState.assignmentDraft || ""
  };
}

export function EducationLmsExperience({ courses: initialCourses, hasDatabase = false, initialCourseId = "" }) {
  const [courses, setCourses] = useState(initialCourses || []);
  const [activeCourseId, setActiveCourseId] = useState(initialCourseId || initialCourses?.[0]?.id || "");
  const [activeLessonId, setActiveLessonId] = useState("");
  const [progress, setProgress] = useState({});
  const [learner, setLearner] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLearner(loadJson(LEARNER_KEY, null));
    setProgress(loadJson(STORAGE_KEY, {}));
    setHydrated(true);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadAccountSession() {
      try {
        const response = await fetch("/api/lms/auth");
        const data = await response.json();
        const account = data.account;

        if (!active || !account || account.role !== "student" || !account.learnerId) {
          return;
        }

        const sessionLearner = {
          id: account.learnerId,
          accountId: account.id,
          fullName: account.fullName,
          email: account.email
        };

        setLearner(sessionLearner);
        window.localStorage.setItem(LEARNER_KEY, JSON.stringify(sessionLearner));
      } catch {
        if (active) {
          setStatusMessage("Student session could not be checked. Sign in again if progress does not load.");
        }
      }
    }

    loadAccountSession();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setCourses(initialCourses || []);
    setActiveCourseId((current) => current || initialCourseId || initialCourses?.[0]?.id || "");
  }, [initialCourseId, initialCourses]);

  useEffect(() => {
    if (hydrated && !learner?.id) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [hydrated, learner?.id, progress]);

  useEffect(() => {
    if (!hydrated || !learner?.id) {
      return;
    }

    let active = true;

    async function refreshLearnerProgress() {
      try {
        const response = await fetch(`/api/lms?learnerId=${encodeURIComponent(learner.id)}`);
        const data = await response.json();
        if (active && data.ok && Array.isArray(data.courses)) {
          setCourses(data.courses);
        }
      } catch {
        if (active) {
          setStatusMessage("Progress sync is temporarily unavailable. You can keep learning and try again shortly.");
        }
      }
    }

    refreshLearnerProgress();
    return () => {
      active = false;
    };
  }, [hydrated, learner?.id]);

  const activeCourse = useMemo(
    () => courses.find((course) => course.id === activeCourseId) || courses[0],
    [activeCourseId, courses]
  );

  const activeState = activeCourse ? getMergedState(activeCourse, progress, learner) : null;
  const activeLessons = useMemo(() => (activeCourse ? getAllLessons(activeCourse) : []), [activeCourse]);
  const activeLesson =
    activeLessons.find((lesson) => lesson.id === activeLessonId) ||
    activeLessons.find((lesson) => !activeState?.completedLessons?.includes(lesson.id)) ||
    activeLessons[0];

  const activeRequiresEnrollment = Boolean(activeCourse?.dbId);
  const activeEnrolled = !activeRequiresEnrollment || Boolean(learner?.id && activeCourse?.learnerState?.enrolled);
  const courseProgress = activeCourse
    ? getCourseProgress(activeCourse, activeState)
    : { completed: 0, total: 0, percent: 0 };
  const quizScore = activeCourse ? scoreQuiz(activeCourse, activeState) : { correct: 0, total: 0, percent: 0 };
  const certificateReady =
    courseProgress.percent >= 80 &&
    quizScore.percent >= 70 &&
    Boolean(activeState?.assignmentSubmitted);

  const dashboard = useMemo(() => {
    const courseStats = courses.map((course) => {
      const state = getMergedState(course, progress, learner);
      const lessonProgress = getCourseProgress(course, state);
      const quiz = scoreQuiz(course, state);
      return {
        course,
        lessonProgress,
        quiz,
        enrolled: Boolean(state.enrolled),
        assignmentSubmitted: Boolean(state.assignmentSubmitted)
      };
    });

    const enrolledCourses = courseStats.filter((item) => item.enrolled).length;
    const completedCourses = courseStats.filter((item) =>
      item.lessonProgress.percent >= 80 && item.quiz.percent >= 70 && item.assignmentSubmitted
    ).length;
    const averageProgress = courseStats.length
      ? Math.round(courseStats.reduce((sum, item) => sum + item.lessonProgress.percent, 0) / courseStats.length)
      : 0;
    const nextCourse =
      courseStats.find((item) => item.enrolled && item.lessonProgress.percent < 100)?.course ||
      courseStats[0]?.course;

    return { courseStats, enrolledCourses, completedCourses, averageProgress, nextCourse };
  }, [courses, learner, progress]);

  useEffect(() => {
    if (!activeCourse || !activeLessons.length) {
      setActiveLessonId("");
      return;
    }

    setActiveLessonId((current) => {
      if (activeLessons.some((lesson) => lesson.id === current)) {
        return current;
      }
      return activeLessons.find((lesson) => !activeState?.completedLessons?.includes(lesson.id))?.id || activeLessons[0].id;
    });
  }, [activeCourse?.id, activeLessons, activeState?.completedLessons]);

  function updateCourseState(courseId, updater) {
    setProgress((current) => {
      const state = getCourseState(current, courseId);
      return { ...current, [courseId]: updater(state) };
    });
  }

  async function syncCoursesFromResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "The LMS could not save that update.");
    }
    if (Array.isArray(data.courses)) {
      setCourses(data.courses);
    }
    return data;
  }

  async function enrollInCourse(course) {
    if (!learner?.id) {
      window.location.href = "/lms/login?next=/lms";
      return;
    }

    if (!course?.dbId) {
      setStatusMessage("This course can be previewed, but database enrollment is unavailable.");
      return;
    }

    setIsSaving(true);
    setStatusMessage("");

    try {
      await syncCoursesFromResponse(
        await fetch("/api/lms/enroll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: course.dbId })
        })
      );
      setActiveCourseId(course.id);
      setStatusMessage(`You are enrolled in ${course.title}.`);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleLesson(lesson) {
    if (!activeEnrolled) {
      setStatusMessage("Enroll in this course before saving lesson progress.");
      return;
    }

    const shouldComplete = !activeState.completedLessons?.includes(lesson.id);

    updateCourseState(activeCourse.id, (state) => {
      const completed = new Set(state.completedLessons || []);
      if (shouldComplete) {
        completed.add(lesson.id);
      } else {
        completed.delete(lesson.id);
      }
      return { ...state, completedLessons: Array.from(completed) };
    });

    if (!learner?.id || !lesson.dbId) {
      return;
    }

    try {
      setIsSaving(true);
      await syncCoursesFromResponse(
        await fetch("/api/lms/progress", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            learnerId: learner.id,
            lessonId: lesson.dbId,
            completed: shouldComplete
          })
        })
      );
      setStatusMessage("Lesson progress saved.");
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  function answerQuestion(questionId, optionIndex) {
    updateCourseState(activeCourse.id, (state) => ({
      ...state,
      quizAnswers: { ...(state.quizAnswers || {}), [questionId]: optionIndex }
    }));
  }

  function updateAssignment(value) {
    updateCourseState(activeCourse.id, (state) => ({
      ...state,
      assignmentDraft: value,
      assignmentSubmitted: false
    }));
  }

  async function submitQuiz() {
    if (!activeEnrolled) {
      setStatusMessage("Enroll in this course before submitting quiz attempts.");
      return;
    }

    if (!learner?.id || !activeCourse?.dbId) {
      setStatusMessage("Sign in before saving a quiz attempt.");
      return;
    }

    setIsSaving(true);
    setStatusMessage("");

    try {
      const data = await syncCoursesFromResponse(
        await fetch("/api/lms/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            learnerId: learner.id,
            courseId: activeCourse.dbId,
            answers: activeState.quizAnswers || {}
          })
        })
      );
      setStatusMessage(`Quiz saved. Score: ${data.attempt.score}/${data.attempt.total}.`);
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function submitAssignment(event) {
    event.preventDefault();

    if (!activeEnrolled) {
      setStatusMessage("Enroll in this course before submitting assignments.");
      return;
    }

    if (!learner?.id || !activeCourse?.dbId) {
      setStatusMessage("Sign in before submitting an assignment.");
      return;
    }

    setIsSaving(true);
    setStatusMessage("");

    try {
      await syncCoursesFromResponse(
        await fetch("/api/lms/assignment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            learnerId: learner.id,
            courseId: activeCourse.dbId,
            response: activeState.assignmentDraft || ""
          })
        })
      );
      setStatusMessage("Assignment submitted to the LMS backend.");
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsSaving(false);
    }

    updateCourseState(activeCourse.id, (state) => ({
      ...state,
      assignmentSubmitted: Boolean(state.assignmentDraft?.trim())
    }));
  }

  if (!activeCourse) {
    return null;
  }

  return (
    <section className="lms-pro" id="lms">
      <div className="lms-pro__topbar">
        <div>
          <p className="academy__eyebrow">Education LMS / {hasDatabase ? "Backend active" : "Local preview"}</p>
          <h2>{learner?.id ? `Welcome back, ${learner.fullName}` : "A real learning dashboard for students."}</h2>
          <p>
            Browse courses, enroll, continue lessons, complete quizzes, submit assignments,
            and track certificate readiness from one focused workspace.
          </p>
        </div>
        <div className="lms-pro__account">
          <strong>{learner?.id ? "Signed in" : "Student access"}</strong>
          <span>{learner?.email || "Create an account to save progress"}</span>
          {learner?.id ? (
            <button
              type="button"
              onClick={() => {
                setLearner(null);
                window.localStorage.removeItem(LEARNER_KEY);
                setStatusMessage("Learner session cleared on this browser.");
              }}
            >
              Change learner
            </button>
          ) : (
            <a href="/lms/login?next=/lms">Sign in</a>
          )}
        </div>
      </div>

      {statusMessage ? <p className="lms-pro__notice">{statusMessage}</p> : null}

      <div className="lms-pro__dashboard">
        <article>
          <span>Enrolled</span>
          <strong>{dashboard.enrolledCourses}</strong>
        </article>
        <article>
          <span>Average progress</span>
          <strong>{dashboard.averageProgress}%</strong>
        </article>
        <article>
          <span>Certificates ready</span>
          <strong>{dashboard.completedCourses}</strong>
        </article>
        <article className="lms-pro__continue">
          <span>Continue learning</span>
          <strong>{dashboard.nextCourse?.title || "Choose a course"}</strong>
          {dashboard.nextCourse ? (
            <button type="button" onClick={() => setActiveCourseId(dashboard.nextCourse.id)}>
              Open course
            </button>
          ) : null}
        </article>
      </div>

      <div className="lms-pro__layout">
        <aside className="lms-pro__sidebar" aria-label="LMS navigation">
          <strong>Learning</strong>
          <a href="#marketplace">Course marketplace</a>
          <a href="#workspace">Course workspace</a>
          <a href="#curriculum">Curriculum</a>
          <a href="#assessment">Assessment</a>
          <a href="#assignment">Assignment</a>
        </aside>

        <div className="lms-pro__main">
          <section id="marketplace" className="lms-market">
            <div className="lms-section-head">
              <div>
                <p className="academy__eyebrow">Course marketplace</p>
                <h3>Pick a pathway and start learning.</h3>
              </div>
              <span>{courses.length} courses available</span>
            </div>

            <div className="lms-market__grid">
              {courses.map((course) => {
                const state = getMergedState(course, progress, learner);
                const stat = getCourseProgress(course, state);
                const lessons = getAllLessons(course);
                const selected = course.id === activeCourse.id;

                return (
                  <article key={course.id} className={`lms-market-card${selected ? " is-selected" : ""}`}>
                    <button type="button" onClick={() => setActiveCourseId(course.id)}>
                      <span className="lms-market-card__image">
                        <i>{course.track}</i>
                      </span>
                      <span className="lms-market-card__level">{course.level}</span>
                      <strong>{course.title}</strong>
                      <span>{course.summary}</span>
                      <small>{course.duration} / {course.modules.length} modules / {lessons.length} lessons</small>
                      <span className="lms-market-card__progress">
                        <i style={{ width: `${stat.percent}%` }} />
                      </span>
                      <em>{state.enrolled ? "Enrolled" : "Free enrollment"} / {stat.percent}% complete</em>
                    </button>
                    <a href={`/lms/courses/${course.id}`}>View details</a>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="workspace" className="lms-course-shell">
            <div className="lms-course-shell__hero">
              <div>
                <p className="academy__eyebrow">{activeCourse.track}</p>
                <h3>{activeCourse.title}</h3>
                <p>{activeCourse.summary}</p>
                <div className="lms-course-shell__meta">
                  <span>{activeCourse.level}</span>
                  <span>{activeCourse.duration}</span>
                  <span>{activeLessons.length} lessons</span>
                  <span>{activeCourse.quiz?.length || 0} quiz questions</span>
                </div>
              </div>
              <div className={`lms-certificate-card${certificateReady ? " is-ready" : ""}`}>
                <span>{certificateReady ? "Certificate ready" : "Certificate progress"}</span>
                <strong>{courseProgress.percent}%</strong>
                <small>Lessons {courseProgress.completed}/{courseProgress.total} / Quiz {quizScore.percent}%</small>
              </div>
            </div>

            {!activeEnrolled ? (
              <div className="lms-enroll-gate">
                <div>
                  <strong>Enroll to unlock saved progress</strong>
                  <p>Enrollment connects this course to your student account, quiz scores, assignments, and certificate readiness.</p>
                </div>
                <button type="button" className="button button--primary" onClick={() => enrollInCourse(activeCourse)} disabled={isSaving}>
                  {isSaving ? "Enrolling..." : learner?.id ? "Enroll now" : "Sign in to enroll"}
                </button>
              </div>
            ) : null}

            <div className="lms-player-grid">
              <div className="lms-player-main">
                <section className="lms-player-card">
                  <div className="lms-player-card__video">
                    <span>{activeLesson?.format || "Lesson"}</span>
                    <strong>{activeLesson?.duration || "Self-paced"}</strong>
                  </div>
                  <div className="lms-player-card__body">
                    <p className="academy__eyebrow">Now playing</p>
                    <h4>{activeLesson?.title || "Choose a lesson"}</h4>
                    <p>{activeLesson?.objective || "Select a lesson from the curriculum to begin."}</p>
                    {activeLesson?.content ? <p>{activeLesson.content}</p> : null}
                    <div className="lms-player-card__actions">
                      {activeLesson?.videoUrl ? (
                        <a href={activeLesson.videoUrl} target="_blank" rel="noreferrer" className="button button--secondary">
                          Open video
                        </a>
                      ) : null}
                      {activeLesson ? (
                        <button type="button" className="button button--primary" onClick={() => toggleLesson(activeLesson)} disabled={!activeEnrolled}>
                          {activeState.completedLessons?.includes(activeLesson.id) ? "Mark incomplete" : "Mark complete"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </section>

                <section className="lms-outcomes">
                  <div className="lms-section-head">
                    <div>
                      <p className="academy__eyebrow">Learning outcomes</p>
                      <h3>Skills this course should produce</h3>
                    </div>
                    {activeCourse.external ? (
                      <a href={activeCourse.resourceHref} target="_blank" rel="noreferrer">Open resource</a>
                    ) : (
                      <a href={activeCourse.resourceHref}>Open resource</a>
                    )}
                  </div>
                  <div>
                    {(activeCourse.outcomes || []).map((outcome) => <span key={outcome}>{outcome}</span>)}
                  </div>
                </section>
              </div>

              <aside id="curriculum" className="lms-curriculum">
                <div className="lms-curriculum__top">
                  <strong>Curriculum</strong>
                  <span>{courseProgress.completed}/{courseProgress.total} complete</span>
                </div>
                <div className="lms-curriculum__bar"><span style={{ width: `${courseProgress.percent}%` }} /></div>
                {(activeCourse.modules || []).map((module, moduleIndex) => (
                  <section key={module.id}>
                    <h4><span>{String(moduleIndex + 1).padStart(2, "0")}</span>{module.title}</h4>
                    {(module.lessons || []).map((lesson) => {
                      const checked = activeState.completedLessons?.includes(lesson.id);
                      const selected = activeLesson?.id === lesson.id;
                      return (
                        <div key={lesson.id} className={`lms-curriculum__lesson${checked ? " is-complete" : ""}${selected ? " is-selected" : ""}`}>
                          <input
                            type="checkbox"
                            checked={Boolean(checked)}
                            disabled={!activeEnrolled}
                            aria-label={`Mark ${lesson.title} complete`}
                            onChange={() => toggleLesson(lesson)}
                          />
                          <button type="button" onClick={() => setActiveLessonId(lesson.id)}>
                            <strong>{lesson.title}</strong>
                            <small>{lesson.format} / {lesson.duration}</small>
                          </button>
                        </div>
                      );
                    })}
                  </section>
                ))}
              </aside>
            </div>
          </section>

          <section id="assessment" className="lms-assessment">
            <div className="lms-section-head">
              <div>
                <p className="academy__eyebrow">Assessment</p>
                <h3>Knowledge check</h3>
              </div>
              <strong>{quizScore.correct}/{quizScore.total}</strong>
            </div>
            <div className="lms-assessment__grid">
              {(activeCourse.quiz || []).map((question, questionIndex) => (
                <fieldset key={question.id}>
                  <legend><span>{questionIndex + 1}</span>{question.question}</legend>
                  {question.options.map((option, optionIndex) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={question.id}
                        checked={Number(activeState.quizAnswers?.[question.id]) === optionIndex}
                        onChange={() => answerQuestion(question.id, optionIndex)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>
              ))}
            </div>
            <button type="button" className="button button--primary" onClick={submitQuiz} disabled={isSaving || !learner?.id || !activeEnrolled}>
              {isSaving ? "Saving..." : "Submit quiz attempt"}
            </button>
          </section>

          <form id="assignment" className="lms-assignment" onSubmit={submitAssignment}>
            <div className="lms-section-head">
              <div>
                <p className="academy__eyebrow">Project submission</p>
                <h3>{activeState.assignmentSubmitted ? "Assignment submitted" : "Final assignment"}</h3>
              </div>
              <span>{activeState.assignmentSubmitted ? "Under review" : "Evidence required"}</span>
            </div>
            <p>{activeCourse.assignment}</p>
            <textarea
              value={activeState.assignmentDraft || ""}
              onChange={(event) => updateAssignment(event.target.value)}
              placeholder="Paste your project link, notes, reflection, or assignment evidence."
            />
            <button type="submit" className="button button--primary" disabled={isSaving || !learner?.id || !activeEnrolled}>
              {isSaving ? "Saving..." : "Submit assignment"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
