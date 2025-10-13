import React from "react";
import Link from "next/link";
import HeadAuth from "./headerauth";

export default function HeaderPage() {
  return (
    <nav className="flex w-full h-auto justify-between items-center py-5 bg-[#f5f5f5] px-20">
      <h1 className="font-bold text-4xl flex">
        Job<p className="text-[#2ecc71]">Portal</p>
      </h1>
      <div className="flex gap-5 text-2xl font-semibold">
        <Link href="#">Home</Link>
        <Link href="#">FindJobs</Link>
        <Link href="#">PostJobs</Link>
      </div>
      <div className="flex gap-5 items-center">
        <HeadAuth />
      </div>
    </nav>
  );
}
