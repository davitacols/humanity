import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "../../../../components/PageHero";
import { Reveal } from "../../../../components/Reveal";
import { SectionIntro } from "../../../../components/SectionIntro";
import { educationLmsCourses } from "../../../../components/siteData";
import { getLmsCatalog } from "../../../../lib/lms";
import "../../lms.css";

export const dynamic = "force-dynamic";

async function loadCourse(slug) {
  const catalog = await getLmsCatalog();
  const courses = catalog.courses?.length ? catalog.courses : educationLmsCourses;
  return courses.find((item) => item.id === slug) || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await loadCourse(slug);
  if (!course) return { title: "Course — Humanity First Academy" };
  return {
    title: `${course.title} — Humanity First Academy`,
    description: course.summary
  };
}

export default async function LmsCoursePage({ params }) {
  const { slug } = await params;
  const course = await loadCourse(slug);
  if (!course) notFound();

  const lessonCount = (course.modules || []).reduce(
    (sum, module) => sum + (module.lessons || []).length,
    0
  );
  const startHref = `/lms?course=${course.id}`;

  return (
    <main className="site-main page-v2 lms-page">
      <PageHero
        eyebrow={course.track}
        title={course.title}
        body={course.summary}
        primary={{ href: startHref, label: "Start learning" }}
        secondary={{ href: "/lms", label: "Browse all courses" }}
        highlights={[
          course.level,
          course.duration,
          `${course.modules?.length || 0} modules`,
          `${lessonCount} lessons`
        ]}
        asideTitle="Course at a glance"
        asideBody="Free, self-paced, and mobile-friendly. Sign in to track progress, take the quiz, submit your assignment, and earn a verified certificate."
        asidePoints={(course.outcomes || []).slice(0, 3)}
      />

      {course.outcomes?.length ? (
        <Reveal as="section" delay={90}>
          <SectionIntro
            eyebrow="Outcomes"
            title="What you'll be able to do."
            body="Each course is built around practical skills you can apply immediately."
          />
          <ul className="lms-page__outcomes">
            {course.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      <Reveal as="section" delay={140}>
        <SectionIntro
          eyebrow="Syllabus"
          title="Modules and lessons in this course."
          body="Work through the curriculum at your own pace on any device."
        />
        <div className="lms-page__syllabus">
          {(course.modules || []).map((module, moduleIndex) => (
            <article key={module.id} className="lms-page__module">
              <h3>
                <span>{String(moduleIndex + 1).padStart(2, "0")}</span>
                {module.title}
              </h3>
              <ul>
                {(module.lessons || []).map((lesson) => (
                  <li key={lesson.id}>
                    <span className="lms-page__lesson-title">{lesson.title}</span>
                    <span className="lms-page__lesson-meta">
                      {lesson.format} · {lesson.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>

      {course.requirements?.length ? (
        <Reveal as="section" delay={180}>
          <SectionIntro eyebrow="Requirements" title="What you need to start." />
          <ul className="lms-page__outcomes lms-page__outcomes--plain">
            {course.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      <Reveal as="section" className="lms-page__cta" delay={220}>
        <h2>Ready to begin?</h2>
        <p>No fees, no prerequisites — just practical skills and a certificate when you finish.</p>
        <div className="hero-actions">
          <Link href={startHref} className="button button--primary">
            Start course
          </Link>
          <Link href="/education" className="button button--secondary">
            Back to education
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
