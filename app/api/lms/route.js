import { NextResponse } from "next/server";
import { enrollLoggedInLearner, getLmsCatalog } from "../../../lib/lms";
import { getCurrentLmsAccount } from "../../../lib/lms-auth";

export async function GET() {
  const account = await getCurrentLmsAccount();
  const learnerId = account?.role === "student" ? account.learnerId : null;
  const catalog = await getLmsCatalog(learnerId);

  return NextResponse.json({
    ok: true,
    ...catalog
  });
}

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
    await enrollLoggedInLearner({ learnerId: account.learnerId, courseId: payload.courseId });
    const catalog = await getLmsCatalog(account.learnerId);

    return NextResponse.json(
      {
        ok: true,
        ...catalog
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to enroll LMS learner:", error);
    return NextResponse.json(
      { error: "Enrollment could not be saved right now. Please try again." },
      { status: 500 }
    );
  }
}
