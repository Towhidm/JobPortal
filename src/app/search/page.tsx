"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState, useEffect,useCallback  } from "react";

type JobType = {
  id: string;
  title: string;
  companyTagline?: string;
  description: string;
  category: string;
  level: string;
  vacancies: number;
  jobType: string;
  location: string;
  salary?: string;
  applyBefore?: string;
  otherSkills?: string;
  requirments?: string;
  about?: string;
  status: "ACTIVE" | "EXPIRED" | "CLOSED";
  createdById: string;
  createdBy: {
    id: string;
    companyname?: string;
    companytagline?: string;
    companysite?: string;
    companylocation?: string;
    companyemail?: string;
    aboutcompany?: string;
    contactnumber?: string;
    activeworker?: string;
    industry?: string;
    founded?: string;
    requirments?: string;
  };
  createdAt: string;
  updatedAt: string;
};

const jobTypes = ["Full time","Half time", "Part time", "Remote", "Internship", "Contract"];
const categories = ["Designer", "Backend", "Security", "Finance", "Technology", "Engineering", "Business", "Human Resource"];
const jobLevels = ["Entry Level", "Mid Level", "Senior Level", "Director", "VP or above","3year(+experience)","2year(+experience)"];
// const salaryRanges = ["5k - 100k", "100k - 1000k", "1000k - 5000k", "5000k and above"];

const JobsPage = () => {
  // --- Search Inputs ---
  const [searchTitle, setSearchTitle] = useState("");
  const [location, setLocation] = useState("");

  // --- Filters ---
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);

  // --- Jobs ---
  const [jobs, setJobs] = useState<JobType[]>([]);

  // --- Fetch jobs ---
  const fetchJobs = useCallback(async () => {
  const params = new URLSearchParams({
    title: searchTitle,
    location,
    jobType: selectedJobTypes.join(","),
    category: selectedCategories.join(","),
    level: selectedLevels.join(","),
    salary: selectedSalaries.join(","),
  });

  const res = await fetch(`/api/jobs/search?${params.toString()}`);
  const data = await res.json();
  setJobs(data.jobs);
}, [searchTitle, location, selectedJobTypes, selectedCategories, selectedLevels, selectedSalaries]);

useEffect(() => {
  fetchJobs();
}, [fetchJobs]); // now ESLint is happy

  // --- Clear all filters ---
  const clearAllFilters = () => {
    setSearchTitle("");
    setLocation("");
    setSelectedJobTypes([]);
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedSalaries([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-900 to-green-100 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover more than 5000+ jobs</h1>
          <p className="text-xl mb-8 opacity-90">Find your dream job from thousands of companies</p>

          <form className="bg-white rounded-lg p-2 shadow-lg max-w-3xl mx-auto">
            <div className="flex p-2 flex-col md:flex-row gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter Job Title, keyword"
                  className="text-black"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Location, country, city, state"
                  className="text-black"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <Card className="sticky top-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Filters</CardTitle>
              <Button variant="outline" size="sm" className="text-xs" onClick={clearAllFilters}>
                Clear All
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Type */}
              <div>
                <h3 className="font-semibold mb-3">Job Type</h3>
                {jobTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={selectedJobTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        setSelectedJobTypes(prev =>
                          checked ? [...prev, type] : prev.filter(t => t !== type)
                        );
                      }}
                    />
                    <Label htmlFor={`type-${type}`}>{type}</Label>
                  </div>
                ))}
              </div>

              {/* Job Categories */}
              <div>
                <h3 className="font-semibold mb-3">Job Categories</h3>
                {categories.map((ctg) => (
                  <div key={ctg} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`category-${ctg}`}
                      checked={selectedCategories.includes(ctg)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories(prev =>
                          checked ? [...prev, ctg] : prev.filter(c => c !== ctg)
                        );
                      }}
                    />
                    <Label htmlFor={`category-${ctg}`}>{ctg}</Label>
                  </div>
                ))}
              </div>

              {/* Job Levels */}
              <div>
                <h3 className="font-semibold mb-3">Job Level</h3>
                {jobLevels.map((lvl) => (
                  <div key={lvl} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`level-${lvl}`}
                      checked={selectedLevels.includes(lvl)}
                      onCheckedChange={(checked) => {
                        setSelectedLevels(prev =>
                          checked ? [...prev, lvl] : prev.filter(l => l !== lvl)
                        );
                      }}
                    />
                    <Label htmlFor={`level-${lvl}`}>{lvl}</Label>
                  </div>
                ))}
              </div>

              {/* Salary Ranges */}
              {/* <div>
                <h3 className="font-semibold mb-3">Salary Range</h3>
                {salaryRanges.map((range) => (
                  <div key={range} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`salary-${range}`}
                      checked={selectedSalaries.includes(range)}
                      onCheckedChange={(checked) => {
                        setSelectedSalaries(prev =>
                          checked ? [...prev, range] : prev.filter(s => s !== range)
                        );
                      }}
                    />
                    <Label htmlFor={`salary-${range}`}>{range}</Label>
                  </div>
                ))}
              </div> */}
            </CardContent>
          </Card>
        </div>

        {/* Jobs Grid */}
        <div className="lg:w-3/4">
          <h2 className="text-2xl font-bold mb-6">All Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <p className="text-primary font-semibold mt-1">{job.createdBy.companyname}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">{job.jobType}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="bg-red-100 text-red-700">{job.salary || "Negotiable"}</Badge>
                      </TooltipTrigger>
                      <TooltipContent><p>Salary</p></TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700">{job.vacancies}</Badge>
                      </TooltipTrigger>
                      <TooltipContent><p>Vacancies</p></TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p>Category: <span className="font-medium">{job.category}</span></p>
                    <p>Level: <span className="font-medium">{job.level}</span></p>
                    <p>Location: <span className="font-medium">{job.location}</span></p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`dashboard/jobseeker/view/${job.id}`} className="w-full">
                    <Button className="bg-cyan-500 w-full hover:bg-cyan-600 cursor-pointer">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
