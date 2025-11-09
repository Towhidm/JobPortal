"use client";

import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Role } from "@prisma/client";
import { HiBellAlert } from "react-icons/hi2";
import { MdLogin } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const HeadAuth = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (!session?.user) {
    return (
      <>
        <Link href="./login">
          <Button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600">
            <MdLogin className="text-2xl" />
            Login
          </Button>
        </Link>

        <Link href="./signup">
          <Button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600">
            <SiGnuprivacyguard className="text-2xl" />
            SignUp
          </Button>
        </Link>
      </>
    );
  }

  //   // Ensure role exists

  const role = session.user.role as Role | undefined;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
      <HiBellAlert />
      <Button
        className="bg-emerald-500 cursor-pointer hover:bg-emerald-600"
        type="button"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="text-2xl" />
        Signout
      </Button>

      {role && (
        <Link href={`/dashboard/${role.toLowerCase()}`}>
          <Button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600">
            <CgProfile className="text-2xl" />
            Profile
          </Button>
        </Link>
      )}
    </>
  );
};

export default HeadAuth;
