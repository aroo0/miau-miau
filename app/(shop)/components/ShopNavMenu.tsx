"use client";

import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface ShopMenuProps {}

interface Route {
  href: string;
  name: string;
  active: boolean;
  items?: Route[];
}

const ShopMenu: React.FC<ShopMenuProps> = ({}) => {
  const pathname = usePathname();

  const routes: Route[] = [
    {
      href: "/perfumes",
      name: "Perfumes",
      active: "/perfumes" === pathname,
    },
    {
      href: "/about",
      name: "About",
      active: "/about" === pathname,
    },
    {
      href: "/newsletter",
      name: "Newsletter",
      active: "/newsletter" === pathname,
    },
  ];

  return (
    <>
      {routes.map((route) => (
        <div
          className="border-b lg:border-none w-full pb-2 lg:pb-0"
          key={route.name}
        >
          <Button
          variant='menu'
          size="header"
            className={twMerge(
              "text-lg lg:text-2xl  hover:italic transition uppercase tracking-[0.3rem]",
              route.active && "italic"
            )}
          >
            {route.name}
          </Button>
        </div>
      ))}
    </>
  );
};

export default ShopMenu;
