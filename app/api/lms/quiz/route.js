import { NextResponse } from "next/server";
import { getLmsCatalog, submitQuizAttempt } from "../../../../lib/lms";
import { getCurrentLmsAccount } from "../../../../lib/lms-auth";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "We could not read that quiz attempt." }, { status: 400 });
  }

  const account = await getCurrentLmsAccount();
  const learnerId = Number(account?.role === "student" ? account.learnerId : NaN);
  const courseId = Number(payload.courseId);

  if (!Number.isFinite(learnerId) || !Number.isFinite(courseId)) {
    return NextResponse.json({ error: "Student login and course are required." }, { status: 401 });
  }

  try {
    const attempt = await submitQuizAttempt({
      learnerId,
      courseId,
      answers: payload.answers
    });
    const catalog = await getLmsCatalog(learnerId);

    return NextResponse.json({ ok: true, attempt, ...catalog }, { status: 201 });
  } catch (error) {
    console.error("Failed to save LMS quiz attempt:", error);
    return NextResponse.json(
      { error: error?.message || "Quiz attempt could not be saved right now." },
      { status: 500 }
    );
  }
}
