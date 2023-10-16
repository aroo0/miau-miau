"use client";
import Logo from "@/components/ui/Logo";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ShopMenu from "./ShopNavMenu";
import { BlurDialog } from "@/components/ui/BlurDialog";
import useMenuModal from "@/hooks/useMenuModal";
import {
  Brand,
  Intensity,
  ModalPageVariant,
  Ocassion,
  ScentCluster,
} from "@/app/global";
import PerfumeMenu from "@/components/PerfumeMenu";
import PerfumesFilters from "@/components/PerfumeFilters";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";

interface ShopNavBarProps {
  brands: Brand[];
  intensities: Intensity[];
  ocassions: Ocassion[];
  scentClusters: ScentCluster[];
  session: Session | null;
}

const ShopNavBar: React.FC<ShopNavBarProps> = ({
  brands,
  intensities,
  ocassions,
  scentClusters,
  session,
}) => {
  const { isModalOpen: isOpen, onOpen, onClose, currentPage } = useMenuModal();
  const [isInWishlist, setIsInWishlist] = useState()


  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden lg:flex w-full py-1 gap-x-4 items-center px-7  fixed z-[120] pointer-events-auto">
        <Logo />
        <div className="flex gap-x-10 px-8 py-4 mx-auto">
          <ShopMenu />
        </div>
        <div className="flex items-center gap-3 uppercase">
          <Button variant="menu" size="header" onClick={() => {}} title="Bag">
            Bag (0)
          </Button>
          <Link
            href="/account/wishlist"
            className="hover:italic uppercase text-xs tracking-widest mt-.5 "
          >
          <Button
            variant="opacity"
            size="smallIcon"
            title="Wishlist"
          >
            <Heart strokeWidth={1.48} size={12} fill='current' />
          </Button>
          </Link>
          <Link
            href="/account"
            className="hover:italic uppercase text-xs tracking-widest mt-.5 "
          >
            {session ? "Account" : "Login"}
          </Link>
          <Button
            variant="menu"
            size="header"
            onClick={() => {}}
            title="Search "
          >
            Search
          </Button>

          <ModeToggle />
        </div>
      </div>
      {/*  Mobile Nav */}
      <div className=" flex lg:hidden w-full py-4 gap-x-4 items-center px-4 justify-between fixed z-[120] pointer-events-auto">
        <Logo />
        <div className="z-[100] flex items-center gap-x-2">
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => {}}
            title="Search"
          >
            <Search strokeWidth={1.8} size={18} />
          </Button>
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => {}}
            title="Bagp"
          >
            <ShoppingBag strokeWidth={1.8} size={18} />
          </Button>
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => {}}
            title="Wishlist"
          >
            <Heart strokeWidth={1.8} size={18}   fill='current'/>
          </Button>
          <ModeToggle />
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => onOpen("menu")}
          >
            {isOpen && currentPage === "menu" ? (
              <X size={24} strokeWidth={1.6} />
            ) : (
              <Menu size={24} strokeWidth={1.4} />
            )}
          </Button>
        </div>
        <BlurDialog isOpen={isOpen} onClose={onClose}>
          <div className="flex flex-col items-start  gap-4 box-border w-full pt-8">
            {currentPage === "menu" && <ShopMenu />}
            {currentPage === "perfumes" && (
              <PerfumeMenu
                brands={brands}
                intensities={intensities}
                ocassions={ocassions}
                scentClusters={scentClusters}
                sourceVariant="Navigation"
              />
            )}
            {currentPage === "filter" && (
              <PerfumesFilters
                brands={brands}
                intensities={intensities}
                ocassions={ocassions}
                scentClusters={scentClusters}
                sourceVariant="FilterTab"
              />
            )}
          </div>
        </BlurDialog>
      </div>
    </>
  );
};

export default ShopNavBar;
