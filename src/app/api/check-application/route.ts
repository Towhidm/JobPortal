// /app/api/check-application/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ applied: false });
  }

  const jobId = req.nextUrl.searchParams.get("jobId");
  if (!jobId) return NextResponse.json({ applied: false });

  const existingApplication = await prisma.application.findFirst({
    where: {
      userId: session.user.id,
      jobId,
    },
  });

  return NextResponse.json({ applied: !!existingApplication });
}
