"use client";
import { ModalPageVariant } from "@/app/global";
import { Button } from "@/components/ui/Button";
import useMenuModal from "@/hooks/useMenuModal";
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
  const router = useRouter()
  const {onClose, currentPage, onClick } = useMenuModal();

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
  ];

  return (
    <>
        <div
          className="border-b lg:border-none w-full pb-3 lg:pb-0  mt-8 lg:mt-0"
        >
          <Button
            variant="menu"
            size="mainNav"
            className={twMerge("/perfumes" === pathname && "italic")}
            onClick={() => {
              onClick("perfumes");
            }}
          >
            Perfumes
          </Button>
          </div>
          <div
          className="border-b lg:border-none w-full pb-3 lg:pb-0"
        >

          <Button
            variant="menu"
            size="mainNav"
            className={twMerge("/about" === pathname && "italic")}
            onClick={() => {
              router.push('/about')
              onClose()
            }}
          >
            About
          </Button>
        </div>

    </>
  );
};

export default ShopMenu;
