
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedJobs from "@/components/FeaturedJobs";
import JobAlert from "@/components/JobAlert"; // dynamic

import { prisma } from "@/lib";

export default async function HomePage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      createdBy: {
        select: { id: true, image: true },
      },
    },
    take: 8,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <Categories />
      <JobAlert /> {/* dynamic client component */}
      <FeaturedJobs jobs={jobs} />
    </div>
  );
}  