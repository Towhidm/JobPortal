"use server";
import { prisma } from "@/lib";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email";

const CreateSignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),

  password: z.string().min(3, "Password must be at least 8 characters long"),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(
  //   /[^A-Za-z0-9]/,
  //   "Password must contain at least one special character"
  // ),
  role: z
    .enum(["employer", "jobseeker"])
    .transform((val) => val.toUpperCase() as "EMPLOYER" | "JOBSEEKER"),
});
type CreateSignUPFormState = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
    formerror?: string[];
  };
  success?: boolean;
};
const SignUpActions = async (
  prevState: CreateSignUPFormState,
  formdata: FormData
): Promise<CreateSignUPFormState> => {
  const result = CreateSignUpSchema.safeParse({
    name: formdata.get("name"),
    email: formdata.get("email"),
    password: formdata.get("password"),
    role: formdata.get("role"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    const { name, email } = result.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.verified) {
      return { errors: { formerror: ["Email already exists."] } };
    }
    const code = String(Math.floor(Math.random() * 900000 + 100000));
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const expiry = new Date(Date.now() + 20 * 60 * 1000); // 20 min
    if (existing) {
      await prisma.user.update({

         where: { email },
        data: {
          name: result.data.name,
          email: result.data.email,
          password: hashedPassword,
          role: result.data.role,
          verificationCode: code,
          verificationExpiry: expiry,
          verified: false,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          name: result.data.name,
          email: result.data.email,
          password: hashedPassword,
          role: result.data.role,
          verificationCode: code,
          verificationExpiry: expiry,
          verified: false,
        },
      });
    }
    const sent = await sendVerificationEmail(email, code, name);
    if (!sent) {
      return { errors: { formerror: ["Failed to send verification email."] } };
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          formerror: [err.message],
        },
      };
    } else {
      return {
        errors: {
          formerror: ["Somthing went wrong"],
        },
      };
    }
  }
  redirect("/verify");
};
export default SignUpActions;
