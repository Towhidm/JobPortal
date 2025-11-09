"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { update_profile } from "@/actions/profile_update";
import { toast } from "sonner";

export default function EditProfile() {
  async  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formdata = new  FormData(e.currentTarget);
    const res = await update_profile(formdata);
    if(!res?.success){
      toast("The file size  should be under  1 MB");
      return;
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 text-center">
            Edit Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}  className="space-y-5">
            {/* Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Full Name</label>
              <Input
                placeholder="Enter your name"
                name="name"
                required
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Profile Image</label>
              <Input
                type="file"
                accept="image/*"
                name="profilePicture"
                className="cursor-pointer border-gray-300"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 duration-300"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
