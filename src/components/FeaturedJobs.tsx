import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "@/components/ui/button";


export interface JobType {
  id: string;
  title: string;
  companyTagline: string | null;
  category: string;
  description: string;
  createdBy: {
    id: string;
    image: string | null;
  };
}

interface FeaturedJobsProps {
  jobs: JobType[];
}

export default function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <section className="w-full py-16 px-6 md:px-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold">
          Featured <span className="text-green-600">Jobs</span>
        </h2>

        <Link href="/JobBoard">
          <button className="text-lg font-bold hover:text-green-900 flex gap-2">
            Show all jobs <FaArrowRightLong />
          </button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-950"></div>

              <div className="pb-5">
                <h3 className="mt-3 font-semibold text-lg">{job.title}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {job.companyTagline ?? ""}
                </p>
              </div>
            </div>

            <h2 className="font-semibold text-2xl">{job.category}</h2>
            <h3 className="font-medium py-2">Full time</h3>

            <p className="mt-3 text-gray-600 text-sm line-clamp-3">
              {job.description}
            </p>

            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="font-semibold text-gray-700">Nrs. 25000</span>

              <Link href={`/dashboard/jobseeker/apply/${job.id}`}>
                <Button
                  className="text-emerald-500 hover:underline"
                  variant="link"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
