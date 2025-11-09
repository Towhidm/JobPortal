"use client"
import { LoginForm } from "@/components/login-form"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect logged-in user to their dashboard
      const role = session?.user?.role;
      router.replace(role === "EMPLOYER" ? "/dashboard/employer" : "/dashboard/jobseeker");
    }
  }, [status, session, router]);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
