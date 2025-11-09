import { auth } from "@/auth";
import { prisma } from "@/lib";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { IoSaveOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default async function EditJobPage({ params }: { params: { id: string } }) {
  // await params before using its properties (App Router may pass a lazy params object)
  const { id: jobId } = await params as { id: string };

  const session = await auth();
  const role = session?.user?.role;

  if (!session || role !== "EMPLOYER") {
    redirect("/login");
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job ) {
    return <div className="p-6 text-center text-red-600">Job not found or access denied.</div>;
  }

  async function updateJobAction(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString();
    const category = formData.get("category")?.toString();
    const level = formData.get("level")?.toString();
    const jobType = formData.get("jobType")?.toString();
    const location = formData.get("location")?.toString();
    const salary = formData.get("salary")?.toString();
    const vacancies = parseInt(formData.get("vacancies")?.toString() || "1");
    const description = formData.get("description")?.toString();
    const requirments = formData.get("requirements")?.toString();
    const otherSkills = formData.get("otherSkills")?.toString();
    const companyTagline = formData.get("companyTagline")?.toString();
    const status = formData.get("status")?.toString() as "ACTIVE" | "EXPIRED" | "CLOSED";
    const about = formData.get("about")?.toString();
    await prisma.job.update({
      where: { id: jobId },
      data: {
        title,
        category,
        level,
        jobType,
        location,
        salary,
        vacancies,
        description,
        requirments,
        otherSkills,
        companyTagline,
        status,
        about,
      },
    });

    revalidatePath("/dashboard/employer");
    redirect("/dashboard/employer");
  }

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Job Post</h1>

      <form action={updateJobAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            name="title"
            defaultValue={job.title}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              defaultValue={job.category}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Level</label>
            <input
              name="level"
              defaultValue={job.level}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Job Type</label>
            <input
              name="jobType"
              defaultValue={job.jobType}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              name="location"
              defaultValue={job.location}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Salary</label>
            <input
              name="salary"
              defaultValue={job.salary || ""}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vacancies</label>
            <input
              name="vacancies"
              type="number"
              defaultValue={job.vacancies}
              className="w-full border border-gray-300 rounded-lg p-2"
              min={1}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Tagline</label>
          <input
            name="companyTagline"
            defaultValue={job.companyTagline || ""}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={job.description}
            className="w-full border border-gray-300 rounded-lg p-2 h-28"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">About Company</label>
          <textarea
            name="about"
            defaultValue={job.about || ""}
            className="w-full border border-gray-300 rounded-lg p-2 h-28"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Requirements</label>
          <textarea
            name="requirements"
            defaultValue={job.requirments  || ""}
            className="w-full border border-gray-300 rounded-lg p-2 h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Other Skills</label>
          <textarea
            name="otherSkills"
            defaultValue={job.otherSkills || ""}
            className="w-full border border-gray-300 rounded-lg p-2 h-24"
          />
        </div>
        <Select name="status" defaultValue={job.status}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="EXPIRED">Expired</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="submit"
            className=" cursor-pointer py-2 bg-[#2ed573] hover:bg-[#05c46b] flex items-center gap-2 justify-center"
          >
            <IoSaveOutline/>
            Save Changes
          </Button>
          
          <Link href="/dashboard/employer/MyPosts">
          <Button variant="outline" className="cursor-pointer bg-[#e84118] py-2 text-white  hover:bg-[#c23616]">
            Cancel
          </Button>
          </Link>
          
        </div>
      </form>
    </main>
  );
}
