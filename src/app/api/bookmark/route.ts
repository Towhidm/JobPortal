// app/api/bookmark/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { jobId } = await req.json();
  const userId = session.user.id;

  // Check if already bookmarked
  const existing = await prisma.bookmark.findFirst({
    where: { jobId, userId },
  });

  if (existing) {
    // Remove bookmark
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return NextResponse.json({ bookmarked: false });
  } else {
    // Add bookmark
    await prisma.bookmark.create({
      data: { jobId, userId },
    });
    return NextResponse.json({ bookmarked: true });
  }
}
