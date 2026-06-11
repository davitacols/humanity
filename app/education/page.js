import Link from "next/link";
import { LoadingLink } from "../../components/LoadingLink";
import { StockPhoto } from "../../components/StockPhoto";
import { educationLmsCourses, educationLibraryItems } from "../../components/siteData";
import { stockMedia } from "../../components/stockMedia";
import "./education.css";

export const revalidate = 300;

export const metadata = {
  title: "Education — Humanity First Academy",
  description: "Free courses, learning resources, and facilitator tools for community learners across Africa."
};

export default function EducationPage() {
  const courses = educationLmsCourses.slice(0, 3);
  const resources = educationLibraryItems.slice(0, 3);

  return (
    <main className="site-main edu">
      {/* Hero */}
      <section className="edu__hero">
        <div className="edu__hero-content">
          <h1>Education for community learners.</h1>
          <p>
            Digital skills, coding, and facilitator training — mobile-friendly, 
            self-paced, and built for learners who need practical skills, not just certificates.
          </p>
          <div className="edu__hero-actions">
            <LoadingLink href="/lms" className="button button--primary" loadingLabel="Opening">Start learning</LoadingLink>
            <LoadingLink href="/education/contribute" className="button button--ghost" loadingLabel="Opening">Contribute a resource</LoadingLink>
          </div>
        </div>
        <div className="edu__hero-media">
          <StockPhoto src={stockMedia.educationFeature.src} alt={stockMedia.educationFeature.alt} sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </section>

      {/* Courses */}
      <section className="edu__section">
        <div className="edu__section-top">
          <h2>Courses</h2>
          <LoadingLink href="/lms" className="edu__see-all" loadingLabel="Opening">View all →</LoadingLink>
        </div>
        <div className="edu__courses">
          {courses.map((course) => (
            <Link key={course.id} href={`/lms/courses/${course.id}`} className="edu__course">
              <span className="edu__course-track">{course.track}</span>
              <h3>{course.title}</h3>
              <p>{course.summary}</p>
              <span className="edu__course-meta">{course.duration} · {course.modules.length} modules · {course.level}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="edu__section edu__how">
        <div className="edu__how-content">
          <h2>How the platform works</h2>
          <p>Students sign up, enroll in courses, work through lessons at their own pace, take quizzes, submit assignments, and earn certificates when they're ready.</p>
          <dl className="edu__how-steps">
            <div><dt>Enroll</dt><dd>Pick a course and create a free student account.</dd></div>
            <div><dt>Learn</dt><dd>Work through modules and lessons on any device.</dd></div>
            <div><dt>Prove</dt><dd>Complete quizzes and submit your final assignment.</dd></div>
            <div><dt>Earn</dt><dd>Get your certificate when requirements are met.</dd></div>
          </dl>
        </div>
        <div className="edu__how-stats">
          <div><strong>7</strong><span>Courses</span></div>
          <div><strong>24/7</strong><span>Access</span></div>
          <div><strong>Free</strong><span>Always</span></div>
        </div>
      </section>

      {/* Resources */}
      <section className="edu__section">
        <div className="edu__section-top">
          <h2>Resource library</h2>
          <LoadingLink href="/education/contribute" className="edu__see-all" loadingLabel="Opening">Submit a resource →</LoadingLink>
        </div>
        <p className="edu__section-desc">Guides, toolkits, and lesson materials for learners and facilitators — curated and reviewed before publication.</p>
        <div className="edu__resources">
          {resources.map((item) => (
            <Link key={item.title} href={item.href} className="edu__resource" {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}>
              <div className="edu__resource-meta">
                <span>{item.category}</span>
                <span>{item.level}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* For instructors */}
      <section className="edu__section edu__instructors">
        <h2>For instructors</h2>
        <p>
          Mentors and teachers get a private dashboard to create courses, organize modules, 
          upload lessons, build quizzes, and review student submissions — no code required.
        </p>
        <LoadingLink href="/lms/login?role=instructor" className="button button--ghost" loadingLabel="Opening">Instructor access →</LoadingLink>
      </section>

      {/* CTA */}
      <section className="edu__cta">
        <h2>Start learning today.</h2>
        <p>No fees. No prerequisites. Just practical skills for community learners.</p>
        <LoadingLink href="/lms" className="button button--primary" loadingLabel="Opening">Open the LMS</LoadingLink>
      </section>
    </main>
  );
}
