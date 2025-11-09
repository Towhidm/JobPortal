"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PostJob from "@/actions/creatjob";
import { useSession } from "next-auth/react";

export default function PostJobs() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  if (!session || session?.user?.role !== "EMPLOYER") {
    redirect("/"); // 🔹 safe to call inside useEffect
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = await PostJob(form);
    if (result.success) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (result.success) {
      router.push("/dashboard/employer");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="companyTagline"
          placeholder="Company Tagline"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          
          name="about"
          placeholder="Write about company"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Job Category"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="level"
          placeholder="Job Level"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="vacancies"
          placeholder="No of. Vacancies"
          min={1}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="jobType"
          placeholder="Job Type"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary (Optional) ,This will be count as thousand(k) unit"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="applyBefore"
          placeholder="Apply Before"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="requiremnts"
          placeholder="Enter each requirement on a new line"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="otherSkills"
          placeholder="Enter each skills on a new line  and use  commas to separate skills"
          className="w-full p-2 border rounded"
        />
        <Label htmlFor="status" className="text-[#22c55e] py-2">
          Status
        </Label>
        {/* <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" name="picture" type="file" />
        </div> */}
        <Select name="status" defaultValue="ACTIVE">
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="EXPIRED">Expired</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
        <button
          type="submit"
          className="w-full p-2 bg-[#2ecc71] text-white rounded hover:bg-[#1ea556] cursor-pointer"
        >
          {" "}
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
