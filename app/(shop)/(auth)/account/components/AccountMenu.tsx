"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import LogoutButton from "./LogoutButton";

interface AccountMenuProps {
  children: React.ReactNode;
  title: string;
}

interface Route {
  path: string;
  name: string;
  active: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ children, title }) => {
  const pathname = usePathname();
  console.log("pathname", pathname);

  const routes: Route[] = [
    {
      name: "Account Details",
      path: "/account",
      active: "/account" === pathname,
    },
    {
      name: "Wishlist",
      path: "/account/wishlist",
      active: "/account/wishlist" === pathname,
    },
    {
      name: "Address",
      path: "/account/address",
      active: "/account/address" === pathname,
    },
    {
      name: "Orders",
      path: "/account/orders",
      active: "/account/orders" === pathname,
    },
  ];

  return (
    <div className="pt-40 grid grid-cols-12 max-w-[1224px] mx-auto">
      <div className="col-span-2 ">
        <h1 className="uppercase text-xs tracking-wider pb-2 border-b">
          My Account
        </h1>
        <div className="grid mt-2 gap-1">
          {routes.map((route) => (
            <Link
              href={route.path}
              key={route.name}
              className={twMerge("hover:italic text-sm", route.active && "italic")}
            >
              {route.name}
            </Link>
          ))}
          <LogoutButton />

        </div>
      </div>
      <div className="col-span-6 col-start-4	">
        <h2 className="uppercase text-xs tracking-wider pb-2 border-b mb-8 text-center">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AccountMenu;
