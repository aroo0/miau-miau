"use client";

import React from "react";
import toast, { Toast } from "react-hot-toast";
import { Button } from "./ui/Button";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { X } from "lucide-react";
import { ExtendedProduct, ShortProductType } from "@/app/global";
import { useRouter } from "next/navigation";
import useMenuModal from "@/hooks/useMenuModal";

interface SuccessToastProps {
  product: ExtendedProduct | ShortProductType;
  t: Toast;
  variant: "Wishlist" | "Cart";
}

const SuccessToast: React.FC<SuccessToastProps> = ({ product, t, variant }) => {
  const router = useRouter();
  const { onOpen } = useMenuModal();

  const message =
    variant === "Wishlist" ? "Added to your wishlist" : "Added to your cart";

  return (
    <div
      className={twMerge(
        t.visible ? "opacity-100 " : "opacity-0",
        `max-w-md w-full bg-background rounded-lg flex flex-col border mt-10 transition duration-100`
      )}
    >
      <div className="flex justify-between items-center w-full border-b pl-3 pr-2 py-1">
        <p className="uppercase text-xs tracking-wider">{message}</p>
        <Button
          variant="menu"
          size="smallIcon"
          onClick={() => toast.dismiss(t.id)}
        >
          <X size={12} />
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-3 p-3 pt-5">
        <div className="relative col-span-1 max-h-20">
          {" "}
          <Image
            src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${product.productImage[0].url}`}
            alt={product.name}
            width={200}
            height={100}
            className="object-cover h-full"
          />
        </div>
        <div className="col-span-2 text-sm">
          <div className="">
            <span className="italic">{product.name}</span>
            {", "}
            <br />
            {product.productBrand?.name}
          </div>
          <p>{formatPrice(product.price)}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-4 pb-4 pt-2">
        <Button
          className="col-start-2 place-items-start	"
          variant="outline"
          size="sm"
          onClick={() => {
            if (variant === "Wishlist") {
              router.push("/account/wishlist");
            } else {
              onOpen("cart");
            }
            toast.dismiss(t.id);
          }}
        >
          {variant}
        </Button>
      </div>
    </div>
  );
};

export default SuccessToast;
