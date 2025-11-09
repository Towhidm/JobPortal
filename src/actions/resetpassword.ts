

"use server"
import { prisma } from "@/lib";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function resetPassword(form:FormData) {
   const token = form.get("token") as string;
  const newPassword = form.get("newPassword") as string;
  const confirmPassword = form.get("confirmPassword") as string;

  if (!token || !newPassword) {
    return { success: false, message: "Missing token or password" };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  const record = await prisma.verificationToken.findUnique({ where: { token } });
  console.log("record:", record);
  if (!record || record.expires < new Date()) return  { success: false, message: "Invalid password" }
 console.log("record found");
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log("updating");
  await prisma.user.update({
    where: { email: record.identifier },
    data: { password: hashedPassword },
  });
  
console.log("updated");
  // delete the token
  await prisma.verificationToken.delete({ where: { token } });
  console.log(`Password reset successfully for ${record.identifier}`);
  redirect("/login");
  
 return { success: true, message: "Password has set successfully" }
}
