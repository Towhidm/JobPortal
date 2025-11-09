"use server";

import { supabase } from "@/lib/supabaseClient"; // ✅ your client import
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { redirect } from "next/navigation";

export async function submitApplication(formData: FormData) {
  const session = await auth();
  if (!session) return redirect("/login");

  const userId = session.user.id;
  
  const file = formData.get("cv") as File;
  const jobId = formData.get("jobId") as  string;

  const fileName = `${Date.now()}_${file.name}`;

  // ✅ Upload to Supabase Storage
  const { error } = await supabase.storage
    .from("cv-uploads")
    .upload(`applications/${fileName}`, file, {
      contentType: "application/pdf",
    });

  if (error) throw error;

  const publicUrl = supabase.storage
    .from("cv-uploads")
    .getPublicUrl(`applications/${fileName}`).data.publicUrl;

    console.log(publicUrl)
  await prisma.application.create({
    data: {
      userId,
      jobId,
      cv: publicUrl,
      coverLetter: formData.get("coverLetter") as string | null,
      status: "PENDING",
    },
  });

  redirect("/dashboard/jobseeker");
}
