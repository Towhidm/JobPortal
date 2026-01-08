// import React from "react";
// import Link from "next/link";
// import HeadAuth from "./headerauth";

// export default function HeaderPage() {
//   return (
//     <nav className="flex w-full h-auto justify-between items-center py-5 bg-[#f5f5f5] px-20">
//       <h1 className="font-bold text-4xl flex">
//         Job<p className="text-[#2ecc71]">Portal</p>
//       </h1>
//       <div className="flex gap-5 text-2xl font-semibold">
//         <Link href="/">Home</Link>
//         <Link href="#">FindJobs</Link>
//         <Link href="#">PostJobs</Link>
//       </div>
//       <div className="flex gap-5 items-center">
//         <HeadAuth />
//       </div>
//     </nav>
//   );
// }
"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import HeadAuth from "./headerauth";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaSignsPost } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";

export default function HeaderPage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const { data: session ,status} = useSession();
  const role = session?.user?.role;

  return (
    <nav className="bg-slate-100 w-full shadow-md sticky top-0 z-50 transition-all duration-300">
      {/* ✅ Navbar container */}
      <div className="flex justify-between items-center py-3 px-4 sm:px-8 lg:px-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
            Job<span className="text-emerald-500">Portal</span>
          </h1>
        </Link>

        {/* ✅ Desktop Links */}
        <div className="hidden md:flex gap-6 lg:gap-10 text-base sm:text-lg lg:text-xl font-semibold">
          <Link
            href="/"
            className="hover:text-[#2ecc71] transition-colors duration-300 flex items-center gap-1"
          >
            <FaHome /> Home
          </Link>
          <Link
            href="/JobBoard"
            className="hover:text-[#2ecc71] transition-colors duration-300 flex items-center gap-1"
          >
            <FaClipboardList />
            JobBorad
          </Link>
          {role === "EMPLOYER" && (
          
            <Link
              href="/JobPost"
              className="hover:text-[#2ecc71] transition-colors duration-300 flex items-center gap-1"
            >
              <FaSignsPost />
              Post Jobs
            </Link>
          )}
          {role === "JOBSEEKER" && (
          
            <Link
              href="/search"
              className="hover:text-[#2ecc71] transition-colors duration-300 flex items-center gap-1"
            >
              <FaSearch /> Find Jobs
            </Link>
          )}
        </div>

        {/* ✅ Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <HeadAuth session={session} status={status} />
        </div>

        {/* ✅ Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-3xl text-gray-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      <div
        className={`md:hidden flex flex-col items-center gap-4 bg-[#f5f5f5] border-t border-gray-300 shadow-inner overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 py-5" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <Link
          href="/"
          onClick={toggleMenu}
          className="text-base sm:text-lg hover:text-[#2ecc71] transition-colors  flex items-center gap-1"
        >
          <FaHome /> Home
        </Link>
        <Link
          href="/JobBoard"
          onClick={toggleMenu}
          className="text-base sm:text-lg hover:text-[#2ecc71] transition-colors flex items-center gap-1"
        >
          <FaClipboardList />
          JobBorad
        </Link>
        {role === "EMPLOYER" &&(
        
          <Link
            href="/JobPost"
            onClick={toggleMenu}
            className="text-base sm:text-lg hover:text-[#2ecc71] transition-colors flex items-center gap-1"
          >
            <FaSignsPost /> Post Jobs
          </Link>
        )}
        {role === "JOBSEEKER" && (
        
          <Link
            href="/search"
            onClick={toggleMenu}
            className="text-base sm:text-lg hover:text-[#2ecc71] transition-colors  flex items-center gap-1"
          >
            <FaSearch /> Find Jobs
          </Link>
        )}
        {/* ✅ Auth buttons in mobile view */}
        <div className="flex flex-col items-center gap-3 w-full px-4">
          
          <HeadAuth session={session} status={status} />
        </div>
      </div>
    </nav>
  );
}
