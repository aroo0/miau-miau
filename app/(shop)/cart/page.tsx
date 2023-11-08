"use client";

import Cart from "@/components/cart/Cart";
import useCart from "@/hooks/useCart";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";


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
  return <motion.div
  initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ ease: "easeInOut", duration: .5 }} className="mb-10 mx-4 pt-4"><Cart /></motion.div>;
};

export default CartPage;
