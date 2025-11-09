import { auth } from "@/auth";
import { prisma } from "@/lib";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ViewPage({ params }: { params: { id: string } }) {
  // params may be a lazy/resolvable object in Next.js — await it before accessing properties
  const { id } = (await params) as { id: string };
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const job = await prisma.job.findUnique({
    where: { id },
    include:{
      createdBy:{
        select:{
          id:true,
        }
      }
    }
  });
  if(!job){
    if (!job) {
  return <div className="text-center text-red-500 py-10">Job not found.</div>;
}
  }
const employer = await prisma.user.findUnique({
  where: { id: job.createdById }, // use the job's creator
  select: { image: true }
});


  const applicantCount = await prisma.application.count({
    where: {
      jobId: id, // the current job id
    },
  });

  if (!job) {
    return <div className="text-center text-red-500 py-10">Job not found.</div>;
  }
  return (
    <>
      <main className="flex flex-col items-center w-full px-4 py-8 bg-gray-50">
        <div
          key={job.id}
          className="w-full max-w-5xl bg-white rounded-2xl shadow-md border border-gray-200 mb-10 p-6 md:p-10"
        >
          {/* Company Header */}
          <div className="flex items-center bg-[#f1f2f6] pt-5 pl-5 pr-5 rounded-2xl  flex-col border-0 border-solid  border-emerald-500 lg:border-2 lg:rounded-2xl lg:p-4  xl:border-2 xl:p-5 xl:rounded-2xl  md:flex-row md:items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center justify-center gap-3 ">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border">
                <Image
                  src={employer?.image  || "/company-logo.png"}
                  alt="Company Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">
                  {job.title || "Software Engineer"}
                </h2>
                <p className="text-sm text-gray-500">
                  {job.companyTagline || "Innovative Tech Solutions"}
                </p>
              </div>
            </div>
            {session.user.role === "EMPLOYER" && (
              <div className="flex flex-wrap flex-row justify-center items-center gap-4  sm:pr-4 md:gap-5">
              <Link href={`/dashboard/employer/applicants/${job.id}`}>
              <Button className=" cursor-pointer " variant="link"> 
                {applicantCount} Applicants
              </Button>
              </Link>
            </div>
            )}
            
          </div>

          {/* Job Information */}
          <div className="grid p-3 rounded-lg md:grid-cols-2 gap-6 mb-8 bg-[#f1f2f6] border-0 border-solid  border-emerald-500 lg:border-2 lg:rounded-2xl lg:p-4  xl:border-2 xl:p-5 xl:rounded-2xl ">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 lg:text-lg">
                Basic Job Information
              </h3>
              <ul className="text-sm text-gray-600 space-y-1 lg:text-lg">
                <li>
                  <strong>Job Category : </strong>{" "}
                  {job.category || "IT (Software)"}
                </li>
                <li>
                  <strong>Job Level : </strong>{" "}
                  {job.level || "Senior (2+ years)"}
                </li>
                <li>
                  <strong>No. of Vacancy : </strong> {job.vacancies || "6"}
                </li>
                <li>
                  <strong>Job Type : </strong> {job.jobType || "Full Time"}
                </li>
                <li>
                  <strong>Location : </strong>{" "}
                  {job.location || "Kathmandu, Nepal"}
                </li>
                <li>
                  <strong>Offered Salary : </strong> ${job.salary || "500"}{" "}
                  /month (negotiable)
                </li>
                <li>
                  <strong>Apply Before : </strong>{" "}
                  {job.applyBefore
                    ? job.applyBefore.toDateString()
                    : "11 Sept, 2025"}
                </li>
              </ul>
            </div>

            {/* About / Map */}
            <div className="bg-gray-100 rounded-lg  lg:text-[16px]">
              <h3 className="font-semibold text-gray-800 mb-2 lg:text-lg">
                About Company
              </h3>
              <p className="text-sm text-gray-600 mb-3">{job.about}</p>
              <h3 className="font-semibold text-gray-800 mb-2 lg:text-lg">
                Our Location
              </h3>
              <iframe
                className="w-full h-32 rounded-md"
                src={`https://www.google.com/maps?q=${encodeURIComponent(job.location || "Kathmandu")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Job Description */}
          <div className="border-t bg-[#f1f2f6] pt-4 lg:text-[16px]  border-emerald-500 lg:border-2 lg:rounded-2xl lg:p-4  xl:border-2 xl:p-5 xl:rounded-2xl">
            <h3 className="font-semibold text-gray-800 mb-2 lg:text-lg">
              Job Description:
            </h3>
            <p className="text-sm text-gray-700 mb-4 lg:text-[16px]">
              {job.description ||
                "We are looking for highly potential candidates to join our growing team and work on innovative projects."}
            </p>

            <h3 className="font-semibold text-gray-800 mb-2  lg:text-lg">
              Requirements:
            </h3>
            <ul className="text-sm text-gray-700 pl-5 space-y-1 mb-4 lg:text-[16px]">
              <li>{job.requirments}</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2 lg:text-lg">
              Other Skills:
            </h3>
            <ul className="text-sm text-gray-700  pl-5 space-y-1 lg:text-[16px]">
              <li>{job.otherSkills}</li>
            </ul>
          </div>

          {/* Buttons */}
        </div>
      </main>
    </>
  );
}
