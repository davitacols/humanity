import { NextResponse } from "next/server";
import { getLmsCatalog, setLessonProgress } from "../../../../lib/lms";
import { getCurrentLmsAccount } from "../../../../lib/lms-auth";

export async function PATCH(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "We could not read that progress update." }, { status: 400 });
  }

  const account = await getCurrentLmsAccount();
  const learnerId = Number(account?.role === "student" ? account.learnerId : NaN);
  const lessonId = Number(payload.lessonId);

  if (!Number.isFinite(learnerId) || !Number.isFinite(lessonId)) {
    return NextResponse.json({ error: "Student login and lesson are required." }, { status: 401 });
  }

  try {
    await setLessonProgress({
      learnerId,
      lessonId,
      completed: payload.completed === true
    });

    const catalog = await getLmsCatalog(learnerId);
    return NextResponse.json({ ok: true, ...catalog });
  } catch (error) {
    console.error("Failed to save LMS lesson progress:", error);
    return NextResponse.json(
      { error: error?.message || "Lesson progress could not be saved right now." },
      { status: 500 }
    );
  }
}
