import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib";
import { updateCompanyInfo } from "@/actions/profile_update";
import { Button } from "@/components/ui/button";

export default async function EditProfilePage() {
  const session = await auth();
  if (!session) return redirect("/login");

  const user = await prisma.user.findUnique({
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
      companylocation:true,
      aboutcompany:true,
    },
  });

  return (
   <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10">
  <form
    action={updateCompanyInfo}
    className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-8 md:p-10 space-y-6"
  >
    {/* Title */}
    <div className="border-b pb-3 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">
        Edit Company Information
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Update your company profile details below.
      </p>
    </div>

    {/* Grid Form */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {/* Company Name */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          name="companyname"
          defaultValue={user?.companyname || ""}
          placeholder="Enter company name"
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* About Company */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          About Company
        </label>
        <input
          name="aboutcompany"
          defaultValue={user?.aboutcompany || ""}
          placeholder="Write about your company"
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Company Picture */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Company Picture
        </label>
        <input
          type="file"
          name="companyPicture"
          accept="image/*"
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Company Tagline */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Company Tagline
        </label>
        <input
          name="companytagline"
          defaultValue={user?.companytagline ?? ""}
          placeholder="e.g. Building a better future"
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Company Website */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Company Website
        </label>
        <input
          name="companysite"
          type="url"
          placeholder="https://example.com"
          defaultValue={user?.companysite ?? ""}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Company Location */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Company Location
        </label>
        <input
          name="companylocation"
          type="location"
          placeholder="Paste your company map location link"
          defaultValue={user?.companylocation ?? ""}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Company Email
        </label>
        <input
          name="companyemail"
          type="email"
          placeholder="info@company.com"
          defaultValue={user?.companyemail ?? ""}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Contact */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Contact Number
        </label>
        <input
          name="contactnumber"
          type="tel"
          placeholder="+880 1XXX-XXXXXX"
          defaultValue={user?.contactnumber ?? ""}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Active Workers */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Active Workers
        </label>
        <input
          name="activeworker"
          type="number"
          min={1}
          placeholder="e.g. 120"
          defaultValue={user?.activeworker ?? ""}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Industry */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Industry
        </label>
        <input
          name="industry"
          placeholder="e.g. Software, Finance"
          defaultValue={user?.industry ?? ""}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Founded */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Founded
        </label>
        <input
          name="founded"
          type="text"
          placeholder="e.g. 2015"
          defaultValue={user?.founded ?? ""}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="flex justify-end pt-4">
      <Button
        type="submit"
        className="cursor-pointer bg-[#2ed573] hover:bg-[#05c46b] text-white px-6 py-2 rounded-xl shadow-sm transition-all duration-200"
      >
        Save Changes
      </Button>
    </div>
  </form>
</section>

  );
}
