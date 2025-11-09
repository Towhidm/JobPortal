"use server";
import { prisma } from "@/lib";

export async function verifyCode(code: string) {
  if (!code) {
    return { success: false, message: "Code is required" };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationCode: code,
        verificationExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return { success: false, message: "Invalid or expired verification code" };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { verified: true, verificationCode: null, verificationExpiry: null },
    });

    return { success: true, message: "Email verified successfully!" };
  } catch (err) {
    console.error("Verification error:", err);
    return { success: false, message: "Internal server error" };
  }
}
