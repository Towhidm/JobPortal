import {
  Edit3,
  MapPin,
  Briefcase,
  Mail,
  Globe,
  Phone,
  Users,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { prisma } from "@/lib";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { deleteJobAction } from "@/actions/deletejob";

export default async function EmployerProfilePage() {
  const session = await auth();
  const user = session?.user;
  const userId = session?.user?.id;
  if (!session || session.user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const employer = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      companyname: true,
      companytagline: true,
      companysite: true,
      companyemail: true,
      contactnumber: true,
      activeworker: true,
      industry: true,
      founded: true,
      companylocation: true,
      aboutcompany: true,
      image: true,
    },
  });

  const jobs = await prisma.job.findMany({
    where: {
      createdById: userId,
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          {/* Logo */}
          <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image
              src={employer?.image || "/image/nothing.png"}
              alt={employer?.companyname || "Company Logo"}
              fill
              className="object-cover"
            />
          </div>

          {/* Company Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-semibold text-gray-800">
              {employer?.companyname}
            </h1>
            <p className="text-gray-500 text-lg mt-1">
              {employer?.companytagline}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 cursor-pointer">
                <MapPin size={16} />
                <Link href={`${employer?.companylocation}`}>click</Link>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Globe size={16} />
                <Link href={`${employer?.companysite}`}>
                  <span>{employer?.companysite}</span>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{employer?.companyemail}</span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          {user?.role == "EMPLOYER" && (
            <Link href="employer/edit_profile">
              <Button className=" cursor-pointer mt-4 md:mt-0 bg-[#2ed573] hover:bg-[#05c46b] text-white flex items-center gap-2">
                <Edit3 size={16} />
                Edit Profile
              </Button>
            </Link>
          )}
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About Section */}
          <Card className="lg:col-span-2 shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">
                About Company
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed space-y-3">
              <p>{employer?.aboutcompany}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{employer?.contactnumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{employer?.activeworker} Employer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>Industry: {employer?.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Founded: {employer?.founded}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employer Info */}
          {session.user?.role === "EMPLOYER" && (
            <Card className="shadow-sm border border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-700">
                  Employer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-2">
                <p>
                  <span className="font-medium text-gray-700">Name:</span>{" "}
                  {user?.name}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {user?.email}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Verified:</span>{" "}
                  {user ? "✅" : "not varified"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Role:</span>{" "}
                  {user?.role}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {user?.role === "EMPLOYER"  && jobs.length>0 && (
          <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-6">My Posted Job List</h1>

            {/* Table for large screens */}
            <div className="hidden md:block overflow-x-auto lg:text-lg">
              <table className="min-w-full   rounded-lg">
                <thead>
                  <tr className="font-bold">
                    <th className="py-2 px-4 text-left">Title</th>
                    <th className="py-2 px-4 text-left">Job Type</th>
                    <th className="py-2 px-4 text-left">Posted Date</th>
                    <th className="py-2 px-4 text-left">Job Category</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-t">
                      <td className="py-2 px-4 font-semibold">{job.title}</td>
                      <td className="py-2 px-4">{job.jobType}</td>
                      <td className="py-2 px-4">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">{job.category}</td>
                      <td className="py-2 px-4 flex gap-2 lg:gap-4">
                        <Link href={`employer/view/${job.id}`}>
                          <IoEyeOutline
                            className="text-[#0be881] cursor-pointer hover:scale-110 transition-transform"
                            size={20}
                          />
                        </Link>

                        <Link href={`employer/edit-job/${job.id}`}>
                          <FiEdit2
                            className="text-[#0fbcf9] cursor-pointer hover:scale-110 transition-transform"
                            size={20}
                          />
                        </Link>
                        <form action={deleteJobAction.bind(null, job.id)}>
                          <button type="submit">
                            <AiOutlineDelete
                              className="text-[#ff5e57] cursor-pointer hover:scale-110 transition-transform"
                              size={20}
                            />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for small screens */}
            <div className="md:hidden flex flex-col gap-4 ">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                >
                  <h2 className="font-semibold text-lg mb-1">{job.title}</h2>
                  <p>
                    <span className="font-medium">Type:</span> {job.jobType}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {job.category}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <Link href={`employer/view/${job.id}`}>
                      <IoEyeOutline
                        className="text-green-500 cursor-pointer hover:scale-110 transition-transform"
                        size={20}
                      />
                    </Link>

                    <Link href={`employer/edit-job/${job.id}`}>
                      <FiEdit2
                        className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                        size={20}
                      />
                    </Link>

                    <form action={deleteJobAction.bind(null, job.id)}>
                      <button type="submit">
                        <AiOutlineDelete
                          className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                          size={20}
                        />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
