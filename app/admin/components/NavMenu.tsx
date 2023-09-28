"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface NavMenuProps {}

interface Route {
  href: string;
  name: string;
  active: boolean;
  items?: Route[];
}

const NavMenu: React.FC<NavMenuProps> = ({}) => {
  const pathname = usePathname();

  const routes: Route[] = [
    {
      href: "/admin",
      name: "Dashboard",
      active: "/admin" === pathname,
    },
    {
      href: "/admin/products",
      name: "Products",
      active: "/admin/products" === pathname,
      items: [
        {
          href: "/admin/products/new",
          name: "New Product",
          active: "/admin/products/new" === pathname,
        },
        {
          href: "/admin/products",
          name: "Products",
          active: "/admin/products" === pathname,
        },
        {
          href: "/admin/products/brands",
          name: "Brands",
          active: "/admin/products/brands" === pathname,
        },
        {
          href: "/admin/products/categories",
          name: "Categories",
          active: "/admin/products/categories" === pathname,
        },
        {
          href: "/admin/products/filters",
          name: "Filters",
          active: "/admin/products/filters" === pathname,
        },
      ],
    },
    {
      href: "/admin/orders",
      name: "Orders (0)",
      active: "/admin/orders" === pathname,
    },
    {
      href: "/admin/customers",
      name: "Customers",
      active: "/admin/customers" === pathname,
    },
  ];

  return (
    <>
      {routes.map((route) => {
        if (route.items) {
          return (
            <>
              {/* Desktop Products  */}

              <div className="hidden lg:block">
                <Popover>
                  <PopoverTrigger
                    className={twMerge(
                      "text-2xl lg:text-lg  hover:opacity-80  hover:italic transition",
                      route.active && "italic"
                    )}
                  >
                    {route.name}
                  </PopoverTrigger>
                  <PopoverContent className="mt-2 w-[200px]">
                    <ul className="grid gap-2 px-1 ">
                      {route.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            className={twMerge(
                              "hover:opacity-80 transition  hover:italic",
                              route.active && "italic"
                            )}
                            href={item.href}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>

                {/* Mobile Products  */}
              </div>
              <div className="block lg:hidden border-b lg:border-none w-full pb-4">
                <Link
                  className={twMerge(
                    "text-2xl lg:text-lg   hover:opacity-80 hover:italic transition",
                    route.active && "italic"
                  )}
                  href={route.href}
                >
                  {route.name}
                </Link>
                <ul className="grid gap-1 pl-4 pt-3">
                  {route.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        className={twMerge(
                          "hover:opacity-80 transition  hover:italic",
                          route.active && "italic"
                        )}
                        href={item.href}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          );
        } else {
          return (
            <div className="border-b lg:border-none w-full pb-4 lg:pb-0">
            <Link
              className={twMerge(
                "text-2xl lg:text-lg  hover:opacity-80 hover:italic transition ",
                route.active && "italic"
              )}
              href={route.href}
            >
              {route.name}
            </Link>
            </div>
          );
        }
      })}
    </>
  );
};

export default NavMenu;
