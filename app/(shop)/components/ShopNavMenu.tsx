"use client";

import { ModalPageVariant } from "@/app/global";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import useMenuModal from "@/hooks/useMenuModal";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface ShopMenuProps {}

interface Route {
  href: string;
  name: string;
  active: boolean;
  items?: Route[];
  page?: ModalPageVariant;
}

const ShopMenu: React.FC<ShopMenuProps> = ({}) => {
  const pathname = usePathname();
  const { isModalOpen, onOpen, onClose, currentPage } = useMenuModal();



  const routes: Route[] = [
    {
      href: "/perfumes",
      name: "Perfumes",
      active: "/perfumes" === pathname,
      page: "perfumes",
    },
    {
      href: "/about",
      name: "About",
      active: "/about" === pathname,
      page: "about",
    },
    {
      href: "/newsletter",
      name: "Newsletter",
      active: "/newsletter" === pathname,
      page: "newsletter",
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
            variant="menu"
            size="mainNav"
            className={twMerge(
              route.active && "italic"
            )}
            onClick={() => onOpen(route.page)}

          >
            {route.name}
          </Button>
        </div>
      ))}
    </>
  );
};

export default ShopMenu;
