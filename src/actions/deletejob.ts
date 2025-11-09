"use server";

import { prisma } from "@/lib";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function deleteJobAction(jobId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  const role = session?.user?.role;

  if (!session || role !== "EMPLOYER") {
    throw new Error("Unauthorized");
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job || job.createdById !== userId) {
    throw new Error("Forbidden");
  }

  await prisma.job.delete({
    where: { id: jobId },
  });

  // Refresh job list after deletion
  revalidatePath("dashboard/employer/MyPosts");
}
