"use client";

import Cart from "@/components/cart/Cart";
import useCart from "@/hooks/useCart";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const { removeAll } = useCart();


    
  useEffect(() => {
    if(searchParams.get('success')) {
      toast.success("Payment completed.", {
        id: 'successPayment',
      });
      removeAll()
    }

    if(searchParams.get('canceled')) {
      toast.error('Something went wrong.',{
        id: 'wrongPayment',
      })
    }

  }, [searchParams, removeAll])


  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }
  return <div className="mb-10 mx-4 pt-4"><Cart /></div>;
};

export default CartPage;
