import { auth } from "@/auth";
import { prisma } from "@/lib";
import { submitApplication } from "@/actions/submitApplcation";

export default async function ApplyJobPage({
  params,
}: {
  params: { jobId: string };
}) {
  const session = await auth();
  if (!session) return <p>You must log in to apply.</p>;

  const {jobId} = (await params) as {jobId : string};
  const userId = session.user.id;

  const existingApplication = await prisma.application.findFirst({
    where: { jobId, userId },
  });

  if (existingApplication) {
    return (
      <div className="max-w-lg mx-auto mt-20 p-6 sm:p-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 text-center">
          ✅ Already Applied
        </h1>
        <p className="mt-3 sm:mt-4 text-gray-700 text-center text-base sm:text-lg">
          You have already applied to this job position.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 sm:mt-20 px-4 sm:px-6">
      <div className="p-6 sm:p-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 transition-all">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 sm:mb-10">
          Apply for this Job 🚀
        </h1>

        <form action={submitApplication} className="space-y-5 sm:space-y-6">
          <div>
            <label className="font-semibold text-gray-700 mb-2 block text-sm uppercase tracking-wider">
              Upload CV (...PDF and Must be highest 1 MB)
            </label>
            <input
              className="file:px-4 file:py-2 file:border-0 file:rounded-xl file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700 
              w-full text-gray-600 cursor-pointer transition text-sm sm:text-base"
              type="file"
              name="cv"
              accept="application/pdf"
              required
            />
          </div>

          <input defaultValue={jobId} type="hidden" name="jobId" />

          <div>
            <label className="font-semibold text-gray-700 mb-2 block text-sm uppercase tracking-wider">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm sm:text-base"
              placeholder="Write a short note... (optional)"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg rounded-2xl shadow-lg transform hover:scale-[1.03] active:scale-95 transition duration-300"
          >
            Submit Application ✅
          </button>
        </form>
      </div>
    </div>
  );
}
