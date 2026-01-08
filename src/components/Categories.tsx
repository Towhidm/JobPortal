import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineDesignServices } from "react-icons/md";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { SiCoinmarketcap, SiGoogleearthengine } from "react-icons/si";
import { FaBusinessTime } from "react-icons/fa";
import { GiHumanPyramid } from "react-icons/gi";
import { MdOutlineEngineering } from "react-icons/md";

export default function Categories() {
  return (
    <section className="w-full bg-emerald-200 py-14 px-6 md:px-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold flex flex-col md:flex-row md:gap-2">
          Explore by <span className="text-emerald-500">categories</span>
        </h2>

        <Link href="/JobBoard">
          <button className="text-lg font-bold text-black hover:text-green-900 flex gap-2">
            Show all jobs <FaArrowRightLong />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-15">

        <CategoryCard icon={<MdOutlineDesignServices className="text-5xl lg:text-7xl" />} title="Design" />

        <CategoryCard icon={<LuChartNoAxesCombined className="text-5xl lg:text-7xl" />} title="Sales" />

        <CategoryCard icon={<IoBarChartOutline className="text-5xl lg:text-7xl" />} title="Finance" />

        <CategoryCard icon={<SiCoinmarketcap className="text-5xl lg:text-7xl" />} title="Marketing" />

        <CategoryCard icon={<SiGoogleearthengine className="text-5xl lg:text-7xl" />} title="Technology" />

        <CategoryCard icon={<FaBusinessTime className="text-5xl lg:text-7xl" />} title="Business" />

        <CategoryCard icon={<MdOutlineEngineering className="text-5xl lg:text-7xl" />} title="Engineering" />

        <CategoryCard icon={<GiHumanPyramid className="text-5xl lg:text-7xl" />} title="Resources" />

      </div>
    </section>
  );
}
interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
}

function CategoryCard({ icon, title }: CategoryCardProps) {
  return (
    <div className="bg-slate-100 p-5 lg:py-7 lg:px-8 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-start lg:gap-4">
      {icon}
      <div className="text-lg font-bold text-gray-700 lg:text-2xl">{title}</div>
      <h3 className="text-gray-500 text-[10px] lg:text-lg font-semibold flex gap-3 lg:gap-4">
        <p>250+ Jobs available</p>
        <FaArrowRightLong />
      </h3>
    </div>
  );
}
