"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect } from "react";

const ConfirmPage = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "/login";
    }, 5000); 

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="flex items-center flex-col my-auto justify-center w-full h-full gap-5 sm:pb-20">
      <p className="text-center">Check email to continue sign in process.</p>
      <Link href="/login">
        <Button variant={"outline"}>Go back</Button>
      </Link>
    </div>
  );
};

export default ConfirmPage;
