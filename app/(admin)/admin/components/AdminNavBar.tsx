"use client";
import Logo from "@/components/ui/Logo";
import { ModeToggle } from "@/components/ui/ModeToggle";
import NavMenu from "./NavMenu";
import { useState } from "react";
import { ArrowBigLeftDash, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BlurDialog } from "@/components/ui/BlurDialog";
import Link from "next/link";



interface AdminNavBarProps {
  unseendOrders: number | null
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({unseendOrders}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden lg:flex w-full py-3 gap-x-4 items-center px-7 justify-between">
        <Logo />
        <div className="flex gap-x-10 border px-8 py-4 rounded-full">
          <NavMenu unseendOrders={unseendOrders}/>
        </div>
        <div className="flex items-center gap-4 text-xs text-bold uppercase">
          <Link href='/'>Back to Shop</Link>
          <ModeToggle />
        </div>
      </div>
      {/*  Mobile Nav */}
      <div className=" flex lg:hidden w-full py-4 gap-x-4 items-center px-4 justify-between pointer-events-auto	">
        <Logo />
        <div className="z-[100] flex items-center gap-x-3">
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => {}}
            title="Back to shop"
          >
            <ArrowBigLeftDash strokeWidth={1.2} size={24} />
          </Button>
          <ModeToggle />
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => setOpen(true)}
          >
            {open ? (
              <X size={24} strokeWidth={1.6} />
            ) : (
              <Menu size={24} strokeWidth={1.4} />
            )}
          </Button>
        </div>
        <BlurDialog isOpen={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col items-start  gap-4 pl-4  pr-8 py-4 rounded-full ">
            <NavMenu unseendOrders={unseendOrders}/>
          </div>
        </BlurDialog>
      </div>
    </>
  );
};

export default AdminNavBar;
