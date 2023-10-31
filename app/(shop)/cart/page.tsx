"use client";

import Cart from "@/components/cart/Cart";
import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }
  return <div className="mb-10"><Cart /></div>;
};

export default CartPage;
