// actions/updatestatus.ts
"use server";

import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatus(formData: FormData) {
  const appId = formData.get("appId") as string;
  const status = formData.get("status") as "APPROVED" | "REJECTED";
  
  await prisma.application.update({
    where: { id: appId },
    data: { status },
  });
  revalidatePath("/dashboard/employer/applicants");
}