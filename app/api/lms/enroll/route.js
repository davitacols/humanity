import { NextResponse } from "next/server";
import { enrollLoggedInLearner, getLmsCatalog } from "../../../../lib/lms";
import { getCurrentLmsAccount } from "../../../../lib/lms-auth";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "We could not read that enrollment request." }, { status: 400 });
  }

  const account = await getCurrentLmsAccount();
  if (!account || account.role !== "student" || !account.learnerId) {
    return NextResponse.json({ error: "Student login is required before enrollment." }, { status: 401 });
  }

  try {
    await enrollLoggedInLearner({
      learnerId: account.learnerId,
      courseId: payload.courseId
    });

    const catalog = await getLmsCatalog(account.learnerId);
    return NextResponse.json({ ok: true, courses: catalog.courses });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Enrollment failed. Please try again." },
      { status: 400 }
    );
  }
}
