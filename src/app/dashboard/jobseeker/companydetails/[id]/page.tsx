import {
  MapPin,
  Briefcase,
  Mail,
  Globe,
  Phone,
  Users,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { prisma } from "@/lib";

export default async function CompanyDetails({ params }: { params: { id: string } }) {
     const { id: id } = await params as { id: string };
  const employer = await prisma.user.findUnique({
    where: { id: id},
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

  if (!employer) {
    return <p className="text-center text-red-500 mt-10">Company not found</p>;
  }

  return (
    <div className="min-h-screen pt-15  bg-gray-50 py-10 px-4 md:px-8 lg:px-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        
        {/* Logo */}
        <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
          <Image
            src={employer.image || "/company-logo.png"}
            alt="Company Logo"
            fill
            className="object-cover"
          />
        </div>

        {/* Company Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-semibold text-gray-800">
            {employer.companyname}
          </h1>
          <p className="text-gray-500 text-lg mt-1">
            {employer.companytagline}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <Link href={employer.companylocation || "#"} target="_blank">
                Location
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Globe size={16} />
              <Link href={employer.companysite || "#"} target="_blank">
                {employer.companysite}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{employer.companyemail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Details Section */}
      <Card className="shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            About Company
          </CardTitle>
        </CardHeader>

        <CardContent className="text-gray-600 leading-relaxed space-y-3">
          <p>{employer.aboutcompany}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{employer.contactnumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{employer.activeworker} Employee</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={16} />
              <span>Industry: {employer.industry}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Founded: {employer.founded}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
