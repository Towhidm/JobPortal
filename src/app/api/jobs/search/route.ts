import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import type { Prisma } from "@prisma/client"; // Import Prisma types

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;

    // --- Search inputs ---
    const title = params.get("title")?.trim().toLowerCase() || "";
    const location = params.get("location")?.trim().toLowerCase() || "";

    // --- Filters ---
    const jobTypes = params.get("jobType")?.split(",").map(t => t.toLowerCase().trim()).filter(Boolean) || [];
    const categories = params.get("category")?.split(",").map(c => c.toLowerCase().trim()).filter(Boolean) || [];
    const levels = params.get("level")?.split(",").map(l => l.toLowerCase().trim()).filter(Boolean) || [];
    const salaries = params.get("salary")?.split(",").map(s => s.toLowerCase().trim()).filter(Boolean) || [];

    const fieldsToSearch: (keyof Prisma.JobWhereInput)[] = [
      "title",
      "category",
      "level",
      "jobType",
      "companyTagline",
      "salary",
      "location",
    ];

    // --- Build search conditions (OR for keywords) ---
    const searchConditions: Prisma.JobWhereInput[] = [];
    if (title) {
      searchConditions.push({
        OR: fieldsToSearch.map(f => ({
          [f]: { contains: title, mode: "insensitive" },
        })),
      });
    }
    if (location) {
      searchConditions.push({
        OR: fieldsToSearch.map(f => ({
          [f]: { contains: location, mode: "insensitive" },
        })),
      });
    }

    // --- Build filter conditions (AND for filters) ---
    const filterConditions: Prisma.JobWhereInput[] = [];

    if (jobTypes.length)
      filterConditions.push({
        OR: jobTypes.map(t => ({ jobType: { contains: t, mode: "insensitive" } })),
      });
    if (categories.length)
      filterConditions.push({
        OR: categories.map(c => ({ category: { contains: c, mode: "insensitive" } })),
      });
    if (levels.length)
      filterConditions.push({
        OR: levels.map(l => ({ level: { contains: l, mode: "insensitive" } })),
      });
    if (salaries.length)
      filterConditions.push({
        OR: salaries.map(s => ({ salary: { contains: s, mode: "insensitive" } })),
      });

    // --- Combine filters + search ---
    const whereCondition: Prisma.JobWhereInput = {};

    if (filterConditions.length && searchConditions.length) {
      whereCondition.AND = [...filterConditions, { OR: searchConditions }];
    } else if (filterConditions.length) {
      whereCondition.AND = filterConditions;
    } else if (searchConditions.length) {
      whereCondition.OR = searchConditions;
    }

    // --- Fetch jobs ---
    const jobs = await prisma.job.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      include: { createdBy: true },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Search Error:", error);
    return NextResponse.json({ jobs: [] });
  }
}
