"use server";

import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export async function updateCompanyInfo(formData: FormData) {
  const session = await auth();
  const userId = session?.user.id;
  const Image = formData.get("companyPicture") as File;
  if (!Image) throw new Error("No image provided");
  const fileName = `${Date.now()}_${Image.name}`;
  const {  error } = await supabase.storage
    .from("Images")
    .upload(`images/${fileName}`, Image, {
      contentType: Image.type,
    });

  if (error) throw error;

  const publicUrl = supabase.storage
    .from("Images")
    .getPublicUrl(`images/${fileName}`).data.publicUrl;

  const Data = {
    companyname: formData.get("companyname")?.toString() || null,
    companytagline: formData.get("companytagline")?.toString() || null,
    companysite: formData.get("companysite")?.toString() || null,
    companyemail: formData.get("companyemail")?.toString() || null,
    contactnumber: formData.get("contactnumber")?.toString() || null,
    activeworker: formData.get("activeworker")?.toString() || null,
    industry: formData.get("industry")?.toString() || null,
    founded: formData.get("founded")?.toString() || null,
    companylocation: formData.get("companylocation")?.toString() || null,
    aboutcompany: formData.get("aboutcompany")?.toString() || null,
    image: publicUrl || null,
  };

  await prisma.user.update({
    where: { id: userId },
    data: Data,
  });

  revalidatePath("/dashboard/employer");
  redirect("/dashboard/employer");
}

export async function update_profile(formData: FormData) {
  const session = await auth();
  const userId = session?.user.id;
  const full_name = formData.get("name") as string;
  const Image = formData.get("profilePicture") as File;
  if (!Image) throw new Error("No image provided");
  if (Image && Image.size > 2 * 1024 * 1024) {
  return {success:false}
}

  const fileName = `${Date.now()}_${Image.name}`;
  const { error } = await supabase.storage
    .from("Images")
    .upload(`images/${fileName}`, Image, {
      contentType: Image.type,
    });

  if (error) throw error;

  const publicUrl = supabase.storage
    .from("Images")
    .getPublicUrl(`images/${fileName}`).data.publicUrl;

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: full_name,
      image: publicUrl,
    },
  });
  redirect("/dashboard/jobseeker");
}
