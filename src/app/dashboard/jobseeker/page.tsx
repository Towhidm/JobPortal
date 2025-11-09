import { prisma } from "@/lib";
import Image from "next/image";
import {  CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Bookmark, Mail } from "lucide-react";
import { auth } from "@/auth";
import Link from "next/link";

export default async function JobSeekerProfile() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-medium">You must log in to view your profile.</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      applied: {
        include: { job: true },
      },
      bookmarks: true,
    },
  });

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-medium">User not found.</p>
      </div>
    );
  }

  const totalApplied = user.applied.length;
  const totalBookmarks = user.bookmarks.length;

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8 lg:px-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        {/* Profile Picture */}
        <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
          <Image
            src={user.image || "/default-avatar.png"}
            alt="Profile Picture"
            fill
            className="object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-semibold text-gray-800">
            {user.name || "Unnamed User"}
          </h1>
          <p className="text-gray-500 text-lg mt-1 flex justify-center md:justify-start items-center gap-2">
            <Mail size={16} />
            {user.email}
          </p>

          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Briefcase size={16} /> Applied: {totalApplied}
            </Badge>
            <Link href="/bookmark">
            <Badge variant="outline" className="flex items-center gap-2 cursor-pointer hover:bg-black   hover:text-white  duration-300">
             <Bookmark size={16} /> Saved: {totalBookmarks}
            </Badge>
            </Link> 
          </div>
        </div>
      </div>

      {/* Profile Summary Section */}
      <CardContent>
  {user.applied.length === 0 ? (
    <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
  ) : (
    <div className="space-y-4">
      {user.applied.slice(0, 5).map((application) => (
        <Link href={`employer/view/${application.jobId}`} key={application.id}>
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              {application.job.title}
            </h3>
            <p className="text-gray-500 text-sm">
              {application.job.category} • {application.job.location}
            </p>
          </div>
          <Badge
            className={`mt-2 sm:mt-0 ${
              application.status === "APPROVED"
                ? "bg-green-100 text-green-700"
                : application.status === "REJECTED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {application.status}
          </Badge>
        </div>
        
        </Link>
        
      ))}
      

      
    </div>
  )}
  <div className="flex justify-center pt-2">
        <Link
          href="jobseeker/update_profile"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm md:text-base font-medium hover:bg-blue-700 transition"
        >
          Edit Profile
        </Link>
      </div>
</CardContent>

    </div>
    </>
  );
}
