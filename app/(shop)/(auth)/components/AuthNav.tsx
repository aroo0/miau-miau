import Link from "next/link";
import React from "react";

interface AuthNavProps {
  type: "LOGIN" | "REGISTER";
}

const AuthNav: React.FC<AuthNavProps> = ({ type }) => {
  return (
    <nav className="flex w-full justify-between gap-2 border-b uppercase pb-2 text-xs tracking-widest">
      <h1>{type === "LOGIN" ? "Sign in" : "Create Account"}</h1>
      <Link
        className="text-muted-foreground hover:text-foreground hover:italic transition"
        href={type === "LOGIN" ? "/register" : "/login"}
      >
        {type === "LOGIN" ? "Create Account" : "Sign in"}
      </Link>
    </nav>
  );
};

export default AuthNav;
