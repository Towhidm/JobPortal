"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdVerifiedUser } from "react-icons/md";
import {
  Card
} from "@/components/ui/card"
export default function VerifyPage({  }: React.ComponentProps<typeof Card>) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Failed to verify. Try again.");
    }
  }

  return (
     <form
       onSubmit={handleSubmit}
       className="flex flex-col gap-3 max-w-sm mx-auto mt-10"
     >
       <h1 className="text-xl font-bold">Email Verification</h1>
       <input
         type="text"
         value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter verification code"
        required
        className="border p-2 rounded"
      />
       <button type="submit" className="bg-[#2ecc71] cursor-pointer hover:bg-[#27ae60] text-white p-2 rounded flex items-center justify-center gap-2">
        <MdVerifiedUser /> Verify
       </button>
     {message && <p className="text-center mt-2">{message}</p>}
     </form>

  );

}
