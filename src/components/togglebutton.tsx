"use client";
import { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { useSession } from "next-auth/react";
type  BookmarkButtonProps = {
  jobId: string;
  initialBookmarked: boolean;
};

export default function BookmarkButton({ jobId, initialBookmarked }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const {data:session} = useSession();


  const toggleBookmark = async () => {
    const res = await fetch("/api/bookmark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });
    const data = await res.json();
    setBookmarked(data.bookmarked);
  };

  return (
    <button onClick={toggleBookmark} className={`text-2xl ${session? "cursor-pointer" : "cursor-not-allowed" }`}>
      {bookmarked ? (
        <IoBookmark className="text-emerald-500" />
      ) : (
        <CiBookmark className="text-emerald-500" />
      )}
    </button>
  );
}
