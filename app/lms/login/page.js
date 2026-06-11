import { Suspense } from "react";
import { LmsLoginForm } from "../../../components/LmsLoginForm";
import "../lms.css";

export const metadata = {
  title: "LMS Login — Humanity First Academy",
  description: "Student and instructor login for the education LMS."
};

export default function LmsLoginPage() {
  return (
    <Suspense fallback={<div className="lms-login"><p>Loading...</p></div>}>
      <LmsLoginForm />
    </Suspense>
  );
}
