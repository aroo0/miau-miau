"use client";
import Logo from "@/components/ui/Logo";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ShopMenu from "./ShopNavMenu";
import useMenuModal from "@/hooks/useMenuModal";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";
import useCart from "@/hooks/useCart";
import { useEffect, useState } from "react";

interface ShopNavBarProps {

  session: Session | null;
}

const ShopNavBar: React.FC<ShopNavBarProps> = ({

  session,
}) => {

  const [isMounted, setIsMounted] = useState(false);



  const { items } = useCart();
  const currentPage = useMenuModal((state) => state.currentPage);
  const onClick = useMenuModal((state) => state.onClick);


  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Desktop Nav */}
      <div className="hidden lg:flex w-full py-1 gap-x-4 items-center px-7  fixed z-[120] pointer-events-auto ">
        <Logo />
        <nav className="flex gap-x-10 px-8 py-4 mx-auto">
          <ShopMenu />
        </nav>
        <div className="flex items-center gap-3 uppercase">
          <Button
            variant="menu"
            size="header"
            onClick={() => 
              onClick("cart")
            }
            title="Bag"
          >
            Bag ({items.length})
          </Button>
          <Link
            href="/account/wishlist"
            className="hover:italic uppercase text-xs tracking-widest mt-.5 "
          >
            <Button variant="opacity" size="smallIcon" title="Wishlist">
              <Heart strokeWidth={1.48} size={12} />
            </Button>
          </Link>
          <Link
            href="/account"
            className="hover:italic uppercase text-xs tracking-widest mt-.5 "
          >
            {session ? "Account" : "Login"}
          </Link>
          <ModeToggle />
        </div>
      </div>
      {/*  Mobile Nav */}
      <nav className=" flex lg:hidden w-full py-4 gap-x-4 items-center px-4 justify-between fixed z-[120] pointer-events-auto">
        <Logo />
        <div className="z-[100] flex items-center gap-x-2">
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => onClick("cart")}
            title="Bag"
          >
            <ShoppingBag strokeWidth={1.8} size={18} />
          </Button>
          <Link
            href="/account/wishlist"
            className="hover:italic uppercase text-xs tracking-widest mt-.5 "
          >
            <Button variant="opacity" size="smallIcon" title="Wishlist">
              <Heart strokeWidth={1.48} size={17}  />
            </Button>
          </Link>

          <ModeToggle />
          <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => onClick("menu")}
          >
            {currentPage === "menu" ? (
              <X size={24} strokeWidth={1.6} />
            ) : (
              <Menu size={24} strokeWidth={1.4} />
            )}
          </Button>
        </div>

      </nav>
    </>
  );
};

export default ShopNavBar;
