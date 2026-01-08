import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-slate-100 py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between md:gap-8 lg:justify-around lg:gap-0">
      <div className="space-y-4 max-w-xl flex flex-col items-center justify-center md:items-start">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold leading-tight flex flex-col items-center md:items-start gap-3 lg:gap-5 md:gap-0">
          Your Dream Job
          <span className="text-emerald-500"> Is Waiting</span>
        </h1>

        <p className="text-gray-600 text-2xl lg:text-4xl font-semibold lg:py-2">
          5000+ Jobs
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-2 mt-6 md:mt-3">
          <Input
            type="text"
            placeholder="Enter job title, Keyword"
            className="border-2 py-5 px-4 md:py-4 md:px-6 lg:px-7 lg:py-5 border-green-500 font-semibold text-black"
          />
          <Input
            type="text"
            placeholder="Search Location"
            className="border-2 border-green-500 py-5 px-4 md:py-4 md:px-6 lg:px-7 lg:py-5 font-semibold text-black"
          />
          <Link href="/search">
            <Button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 lg:px-7 lg:py-5 rounded-sm hover:bg-emerald-600">
              <Search size={18} />
              Search
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Illustration */}
      <div className="hidden md:flex">
        <Image src="/3dman.png" alt="job search" width={300} height={250} />
      </div>
    </section>
  );
}
