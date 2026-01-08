"use server";
import { prisma } from "@/lib";
import { JobStatus } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const PostJob = async (form: FormData) => {
  const session = await auth();
  if (!session || !session.user?.id ) {
    revalidatePath("/");
    return { success: false };
  }

  const title = form.get("title") as string;
  const description = form.get("description") as string;
  const status = form.get("status") as JobStatus;
  const category = form.get("category") as string;
  const level = form.get("level") as string;
  const vacanciesRaw = form.get("vacancies") as string;
  const vacancies = parseInt(vacanciesRaw, 10);
  const jobType = form.get("jobType") as string;
  const location = form.get("location") as string;
  const salary = form.get("salary") as string;
  const applyBeforeStr = form.get("applyBefore") as string | null;
  const applyBefore = applyBeforeStr ? new Date(applyBeforeStr) : null;
  const requirements = form.get("requirements") as string;
  const otherSkills = form.get("otherSkills") as string;
  const companyTagline = form.get("companyTagline") as string;
  const about = form.get("about") as string;
  await prisma.job.create({
      data: {
    title,
    description,
    status,
    level,
    vacancies,
    category,
    jobType,
    location,
    salary: salary,
    applyBefore, 
    requirments: requirements || null,
    otherSkills: otherSkills || null,
    createdById: session.user.id,
    companyTagline: companyTagline || null,
    about: about || null,
  },
  });
  revalidatePath("/");

  return { success: true };
};

export default PostJob;
