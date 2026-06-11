import { LmsExperience } from "../../components/lms/LmsExperience";
import { educationLmsCourses } from "../../components/siteData";
import { getLmsCatalog } from "../../lib/lms";
import "./lms.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Academy — Humanity First Academy",
  description:
    "A learning management system with courses, lessons, quizzes, assignments, progress tracking, and certificates."
};

export default async function LmsPage({ searchParams }) {
  const params = (await searchParams) || {};
  const requestedCourse = typeof params.course === "string" ? params.course : "";

  const catalog = await getLmsCatalog();
  const courses = catalog.courses?.length ? catalog.courses : educationLmsCourses;
  const initialCourseId = courses.some((course) => course.id === requestedCourse) ? requestedCourse : "";

  return (
    <LmsExperience courses={courses} hasDatabase={catalog.hasDatabase} initialCourseId={initialCourseId} />
  );
}
