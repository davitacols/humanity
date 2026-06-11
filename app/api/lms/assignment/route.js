import { NextResponse } from "next/server";
import { getLmsCatalog, submitAssignment } from "../../../../lib/lms";
import { getCurrentLmsAccount } from "../../../../lib/lms-auth";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "We could not read that assignment." }, { status: 400 });
  }

  const account = await getCurrentLmsAccount();
  const learnerId = Number(account?.role === "student" ? account.learnerId : NaN);
  const courseId = Number(payload.courseId);

  if (!Number.isFinite(learnerId) || !Number.isFinite(courseId)) {
    return NextResponse.json({ error: "Student login and course are required." }, { status: 401 });
  }

  try {
    const submission = await submitAssignment({
      learnerId,
      courseId,
      response: payload.response
    });
    const catalog = await getLmsCatalog(learnerId);

    return NextResponse.json({ ok: true, submission, ...catalog }, { status: 201 });
  } catch (error) {
    console.error("Failed to save LMS assignment:", error);
    return NextResponse.json(
      { error: error?.message || "Assignment could not be saved right now." },
      { status: 500 }
    );
  }
}
