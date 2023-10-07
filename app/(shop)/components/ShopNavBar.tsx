"use client";
import Logo from "@/components/ui/Logo";
import { ModeToggle } from "@/components/ui/ModeToggle";
import NavMenu from "./ShopNavMenu";
import MobileNavDialog from "@/components/modals/MobileNavDialog";
import { useState } from "react";
import {
  ArrowBigLeftDash,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import ShopMenu from "./ShopNavMenu";

interface ShopNavBarProps {}

type ModalPageVariant = "menu" | "perfumes" | "about" | "search" | "cart";

const ShopNavBar: React.FC<ShopNavBarProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [modalPage, setModalPage] = useState<ModalPageVariant>("menu");

  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden lg:flex w-full py-1 gap-x-4 items-center px-7 justify-between">
        <Logo />
        <div className="flex gap-x-10 px-8 py-4">
          <ShopMenu />
        </div>
        <div className="flex items-center gap-2 uppercase">
          <Button
            variant="menu"
            size="header"
            onClick={() => {}}
            title="Back to shop "
          >
            Bag (0)
          </Button>
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => {}}
            title="Back to shop"
          >
            <Heart strokeWidth={1.48} size={12} />
          </Button>
          <Button
            variant="menu"
            size="header"
            onClick={() => {}}
            title="Back to shop "
          >
            Login / Account
          </Button>
          <Button
            variant="menu"
            size="header"
            onClick={() => {}}
            title="Back to shop "
          >
            Search
          </Button>
          
          <ModeToggle />
        </div>
      </div>
      {/*  Mobile Nav */}
      <div className=" flex lg:hidden w-full py-4 gap-x-4 items-center px-4 justify-between pointer-events-auto	">
        <Logo />
        <div className="z-[100] flex items-center gap-x-2">
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => {}}
            title="Back to shop"
          >
            <Search strokeWidth={1.8} size={18} />
          </Button>
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => {}}
            title="Back to shop"
          >
            <ShoppingBag strokeWidth={1.8} size={18} />
          </Button>
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => {}}
            title="Back to shop"
          >
            <Heart strokeWidth={1.8} size={18} />
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
        <MobileNavDialog isOpen={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col items-start  gap-4 pl-4  pr-8 py-4 rounded-full">
            <ShopMenu />
          </div>
        </MobileNavDialog>
      </div>
    </>
  );
};

export default ShopNavBar;
