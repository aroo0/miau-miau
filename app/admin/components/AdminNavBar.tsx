"use client";
import Logo from "@/components/ui/Logo";
import { ModeToggle } from "@/components/ui/ModeToggle";
import NavMenu from "./NavMenu";
import MobileNavDialog from "@/components/modals/MobileNavDialog";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AdminNavBarProps {}

const AdminNavBar: React.FC<AdminNavBarProps> = ({}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden lg:flex w-full py-3 gap-x-4 items-center px-7 justify-between">
        <Logo />
        <div className="flex gap-x-10 border px-8 py-4 rounded-full">
          <NavMenu />
        </div>
        <div className="flex items-center gap-4 text-xs text-bold uppercase">
          Back to Shop
          <ModeToggle />
        </div>
      </div>
      {/*  Mobile Nav */}
      <div className=" flex lg:hidden w-full py-3 gap-x-4 items-center px-7 justify-between">
        <Logo />
        <div className="z-[100]">
          <Button onClick={() => setOpen(true)}>
            <Menu size={25} />
          </Button>
        </div>
        <MobileNavDialog isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default AdminNavBar;
