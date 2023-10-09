"use client";
import Logo from "@/components/ui/Logo";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ShopMenu from "./ShopNavMenu";
import { BlurDialog } from "@/components/ui/BlurDialog";
import PerfumesFilters from "@/components/PerfumesFilters";
import useMenuModal from "@/hooks/useMenuModal";
import { Brand, Intensity, Ocassion, ScentCluster } from "@/app/global";

interface ShopNavBarProps {
  brands: Brand[];
  intensities: Intensity[];
  ocassions: Ocassion[];
  scentClusters: ScentCluster[];
}

const ShopNavBar: React.FC<ShopNavBarProps> = ({brands, intensities, ocassions, scentClusters}) => {
  const { isOpen, onOpen, onClose, page } = useMenuModal();
  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden lg:flex w-full py-1 gap-x-4 items-center px-7 justify-between fixed z-[100]">
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
            onClick={() => onOpen("menu")}
          >
            {isOpen && page === "menu" ? (
              <X size={24} strokeWidth={1.6} />
            ) : (
              <Menu size={24} strokeWidth={1.4} />
            )}
          </Button>
        </div>
        <BlurDialog isOpen={isOpen} onClose={onClose}>
          <div className="flex flex-col items-start  gap-4 pl-4  pr-8 py-4 rounded-full">
            {page === "menu" && <ShopMenu />}
            {page === "perfumes" && (
              <PerfumesFilters
                brands={brands}
                intensities={intensities}
                ocassions={ocassions}
                scentClusters={scentClusters}
              />
            )}
          </div>
        </BlurDialog>
      </div>
    </>
  );
};

export default ShopNavBar;
