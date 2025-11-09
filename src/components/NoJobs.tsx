"use client";
import { Briefcase } from "lucide-react";

export default function NoJobs() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen py-24 px-6 text-center">
      
      {/* Icon container */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-full shadow-xl">
        <Briefcase size={45} />
      </div>

      <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900">
        No Jobs Available Right Now
      </h2>

      <p className="text-gray-500 max-w-md mt-2 text-sm sm:text-base">
        It looks like there are no job postings matching your criteria.
        Try changing filters or explore other categories.
      </p>

      

      {/* Optional Helpful UI */}
      

    </div>
  );
}
