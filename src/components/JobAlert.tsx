export default function JobAlert() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6 md:px-20 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold">
        Get <span className="text-emerald-500">Job Alerts ?</span>
      </h2>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 rounded-full border-2 border-emerald-500 w-72 md:w-96 outline-emerald-500"
        />
        <button className="bg-emerald-500 text-white px-6 py-3 rounded-full hover:bg-emerald-600">
          Subscribe
        </button>
      </div>
    </section>
  );
}
