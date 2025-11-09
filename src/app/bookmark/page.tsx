import { auth } from "@/auth";
import { prisma } from "@/lib";
import Image from "next/image";
import BookmarkButton from "@/components/togglebutton";
import Link from "next/link";

export default async function BookmarkedPage() {
  const session = await auth();
  const role = session?.user?.role;
  const jobs = await prisma.job.findMany({
    where: {
      bookmarks: {
        some: { userId: session?.user?.id },
      },
    },
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
    <main className="flex flex-col items-center w-full px-4 py-8 bg-gray-50">
      <h1 className="font-bold text-lg lg:text-2xl pb-5">My Saved Jobs</h1>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="w-full max-w-5xl bg-white rounded-2xl shadow-md border border-gray-200 mb-10 p-6 md:p-10"
        >
          {/* Company Header */}
          <div className="flex items-center bg-[#f1f2f6] pt-5 pl-5 pr-5 rounded-2xl  flex-col border-0 border-solid  border-emerald-500 lg:border-2 lg:rounded-2xl lg:p-4  xl:border-2 xl:p-5 xl:rounded-2xl  md:flex-row md:items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center justify-center gap-3 ">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border">
                <Image
                  src={job.createdBy.image || "/logo"}
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
            <div className="flex flex-row items-center justify-center gap-4 mt-5 md:gap-5 sm:pr-4">
              {role !== "EMPLOYER" && (
                <BookmarkButton
                  jobId={job.id}
                  initialBookmarked={job.bookmarks.length > 0}
                />
              )}

              <Link href={`/dashboard/jobseeker/apply/${job.id}`}>
                <button
                  disabled={role === "EMPLOYER" || !session}
                  className={`px-5 py-2 rounded-lg text-sm text-white cursor-pointer transition-colors 
        ${
          role === "EMPLOYER" || !session
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-500 hover:bg-emerald-600"
        }`}
                >
                  Apply Now
                </button>
              </Link>
            </div>
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
              <p className="text-sm text-gray-600 mb-3">
                We’re the fastest, easiest and most convenient way to enjoy your
                favorite services or meals.
              </p>
              <h3 className="font-semibold text-gray-800 mb-2 lg:text-lg">
                Our Location
              </h3>
              <iframe
                className="w-full h-32 rounded-md"
                src="https://maps.google.com/maps?q=Kathmandu&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link href={`/dashboard/jobseeker/apply?jobId=${job.id}`}>
              <button
                disabled={role === "EMPLOYER" || !session}
                className={`mt-4 w-full md:mt-0 px-5 py-2 rounded-lg text-sm text-white cursor-pointer transition-colors 
      ${
        role === "EMPLOYER" || !session
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-emerald-500 hover:bg-emerald-600"
      }`}
              >
                Apply Now
              </button>
            </Link>
            <Link
              href={`dashboard/jobseeker/companydetails/${job.createdBy.id}`}
            >
              <button
                disabled={role === "EMPLOYER" || !session}
                className={`mt-4 w-full md:mt-0 px-5 py-2 rounded-lg text-sm text-white cursor-pointer transition-colors 
    ${
      role === "EMPLOYER" || !session
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#EA2027] hover:bg-red-800 cursor-pointer"
    }`}
              >
                Company Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
