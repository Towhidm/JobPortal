
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineDesignServices } from "react-icons/md";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { SiCoinmarketcap } from "react-icons/si";
import { SiGoogleearthengine } from "react-icons/si";
import { FaBusinessTime } from "react-icons/fa";
import { GiHumanPyramid } from "react-icons/gi";
import { MdOutlineEngineering } from "react-icons/md";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib";

export default async function HomePage() {
   const session = await auth();
  const role = session?.user?.role;

  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      bookmarks: {
        where: { userId: session?.user?.id || "" },
        select: { id: true },
      },
      createdBy: {
        select: {
          id: true,
          image: true,
        },
      },
    },
  });
  return (
    <div className="w-full flex flex-col items-center">
      {/*  HERO SECTION */}
      <section className="w-full bg-slate-100 py-16 px-6 md:px-20 flex flex-col md:flex-row items-center  justify-between md:gap-8 lg:justify-around lg:gap-0">
        <div className="space-y-4 max-w-xl flex flex-col items-center justify-center md:items-start">
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold leading-tight  flex  flex-col items-center md:items-start justify-center gap-3 lg:gap-5 md:gap-0">
            Your Dream Job<span className="text-emerald-500"> Is Waiting</span>
          </h1>
          <p className="text-gray-600 text-2xl lg:text-4xl font-semibold lg:py-2">
            5000+ Jobs
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-2 mt-6 md:mt-3">
            <Input
              type="text"
              placeholder="Enter job title, Keyword"
              className=" border-2 py-5 px-4 md:py-4 md:px-6  lg:px-7 lg:py-5 border-green-500  font-semibold  text-black"
            />
            <Input
              type="text"
              placeholder="Search Location"
              className=" border-2 border-green-500 py-5 px-4 md:py-4 md:px-6  lg:px-7 lg:py-5  font-semibold  text-black"
            />
            <Link href="/search">
            <Button className="flex items-center gap-2 bg-emerald-500 text-white cursor-pointer px-6 py-3 lg:px-7 lg:py-5 rounded-sm hover:bg-emerald-600">
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

      {/*  CATEGORY SECTION */}
      <section className="w-full bg-emerald-200 py-14 px-6 md:px-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold flex  flex-col md:flex-row md:gap-2">
            Explore by <span className="text-emerald-500">categories</span>
          </h2>
          <Link href="/JobBoard">
          <button className="text-lg font-bold cursor-pointer text-black flex flex-col hover:text-green-900  md:flex-row gap-2 items-end justify-center sm:items-center  sm:gap-4 md:items-center  md:gap-3">
            {" "}
            <p>Show all jobs</p> <FaArrowRightLong />{" "}
          </button>
          
          </Link>
        </div>

        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-15">
          
            <div
              className="bg-slate-100 p-5 lg:py-7 lg:px-8  rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-start lg:gap-4"
            >
              <MdOutlineDesignServices className="text-5xl lg:text-7xl"/>

              <div className="text-lg font-bold text-gray-700 lg:text-2xl">Design</div>
              <h3 className="text-gray-500 text-[10px]  lg:text-lg font-semibold flex items-center justify-center gap-3  lg:gap-4"> <p>250+ Jobs available</p> <FaArrowRightLong /></h3>
            </div>

            <div
              className="bg-slate-100 p-5 lg:py-7 lg:px-8  rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-start lg:gap-4"
            >
              <LuChartNoAxesCombined className="text-5xl lg:text-7xl"/>

              <div className="text-lg font-bold text-gray-700 lg:text-2xl">Sales</div>
              <h3 className="text-gray-500 text-[10px]  lg:text-lg font-semibold flex items-center justify-center gap-3  lg:gap-4"> <p>250+ Jobs available</p> <FaArrowRightLong /></h3>
            </div>

            <div
              className="bg-slate-100 p-5 lg:py-7 lg:px-8  rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-start lg:gap-4"
            >
              <IoBarChartOutline className="text-5xl lg:text-7xl"/>

              <div className="text-lg font-bold text-gray-700 lg:text-2xl">Finance</div>
              <h3 className="text-gray-500 text-[10px]  lg:text-lg font-semibold flex items-center justify-center gap-3  lg:gap-4"> <p>250+ Jobs available</p> <FaArrowRightLong /></h3>
            </div>

            <div
              className="bg-slate-100 p-5 lg:py-7 lg:px-8  rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-start lg:gap-4"
            >
              <SiCoinmarketcap className="text-5xl lg:text-7xl"/>

              <div className="text-lg font-bold text-gray-700 lg:text-2xl">Marketing</div>
              <h3 className="text-gray-500 text-[10px]  lg:text-lg font-semibold flex items-center justify-center gap-3  lg:gap-4"> <p>250+ Jobs available</p> <FaArrowRightLong /></h3>
            </div>

            <div
              className="bg-slate-100 p-5 lg:py-7 lg:px-8  rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-start lg:gap-4"
            >
              <SiGoogleearthengine className="text-5xl lg:text-7xl"/>

              <div className="text-lg font-bold text-gray-700 lg:text-2xl">Technology</div>
              <h3 className="text-gray-500 text-[10px]  lg:text-lg font-semibold flex items-center justify-center gap-3  lg:gap-4"> <p>250+ Jobs available</p> <FaArrowRightLong /></h3>
            </div>

            <div
              className="bg-slate-100 p-5 lg:py-7 lg:px-8  rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-start lg:gap-4"
            >
              < FaBusinessTime className="text-5xl lg:text-7xl"/>

              <div className="text-lg font-bold text-gray-700 lg:text-2xl">Business</div>
              <h3 className="text-gray-500 text-[10px]  lg:text-lg font-semibold flex items-center justify-center gap-3  lg:gap-4"> <p>250+ Jobs available</p> <FaArrowRightLong /></h3>
            </div>

            <div
              className="bg-slate-100 p-5 lg:py-7 lg:px-8  rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-start lg:gap-4"
            >
              < MdOutlineEngineering className="text-5xl lg:text-7xl"/>

              <div className="text-lg font-bold text-gray-700 lg:text-2xl">Engineering</div>
              <h3 className="text-gray-500 text-[10px]  lg:text-lg font-semibold flex items-center justify-center gap-3  lg:gap-4"> <p>250+ Jobs available</p> <FaArrowRightLong /></h3>
            </div>

            <div
              className="bg-slate-100 p-5 lg:py-7 lg:px-8  rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-start lg:gap-4"
            >
              < GiHumanPyramid className="text-5xl lg:text-7xl"/>

              <div className="text-lg font-bold text-gray-700 lg:text-2xl">Resources</div>
              <h3 className="text-gray-500 text-[10px]  lg:text-lg font-semibold flex items-center justify-center gap-3  lg:gap-4"> <p>250+ Jobs available</p> <FaArrowRightLong /></h3>
            </div>
          
        </div>
      </section>

      {/*  JOB ALERTS SECTION */}
      {role ===  "JOBSEEKER" && (
        <section className="w-full bg-gray-100 py-16 px-6 md:px-20 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Get <span className="text-emerald-500">Job Alerts ?</span>
        </h2>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-full border-2 border-emerald-500 w-72 md:w-96 outline-emerald-500"
          />
          <button className="bg-emerald-500 cursor-pointer text-white px-6 py-3 rounded-full hover:bg-emerald-600">
            Subscribe
          </button>
        </div>
      </section>
      )}
      

      {/*  FEATURED JOBS */}
      {jobs.length  >0 && (
        <section className="w-full py-16 px-6 md:px-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">
            Featured <span className="text-green-600">Jobs</span>
          </h2>
          <Link href="/JobBoard">
          <button className="text-lg font-bold cursor-pointer text-black flex flex-col md:flex-row gap-2 items-end justify-center hover:text-green-900 sm:items-center  sm:gap-4 md:items-center  md:gap-3">
            {" "}
            <p>Show all jobs</p> <FaArrowRightLong />{" "}
          </button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-start items-center gap-3 ">
              <div className="h-10 w-10 rounded-full bg-blue-950"></div>
              <div className=" pb-5">
                <h3 className="mt-3 font-semibold text-lg">{job.title}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {job.companyTagline}
              </p>
              </div>

              
              </div>
              <h2 className="font-semibold text-2xl">{job.category}</h2>
              <h3 className="font-medium py-2">Full time</h3>

              <p className="mt-3 text-gray-600 text-sm line-clamp-3">
               {job.description}</p>

              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="font-semibold text-gray-700">Nrs. 25000</span>
                <Link href={`/dashboard/jobseeker/apply/${job.id}`}>
                <Button className="text-emerald-500 cursor-pointer hover:underline" variant="link">
                  Apply Now
                </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}
      
    </div>
  );
}
