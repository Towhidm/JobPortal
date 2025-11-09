"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function signInAction(formData: FormData) {
  try {
    console.log("running signInAction");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("email,password",email,password);

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/", // or leave undefined to handle redirect manually
    });

    return { success: true, message: "Sign-in successful." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password." };
        default:
          return { success: false, message: "Something went wrong." };
      }
    }
    throw error;
  }
}
