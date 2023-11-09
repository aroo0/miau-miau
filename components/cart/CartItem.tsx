"use client";

import useCart, { CartItem } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/Button";

interface CartItemProps {
  data: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = data;

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from propagating
    removeItem(product.id);
  };

  const handleMinusClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from propagating
    updateQuantity(product.id, quantity - 1);
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from propagating
    updateQuantity(product.id, quantity + 1);
  };

  return (
    <div className="w-full grid grid-cols-2 xl:grid-cols-8  gap-6 justify-items-stretch 	">
      <div className="col-span-2 xl:col-span-4 flex w-full  xl:border-b pb-4  gap-2 ">
        <div className="relative max-w-[180px]	 ">
          <Image
            src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${product.productImage[0].url}`}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover"
            priority={true}

          />
        </div>
        <div className="flex flex-col gap-2 w-full text-2xl mt-4 ">
          <p className="italic">{product.name},</p>
          <p>{product.productBrand.name}</p>
          <p className="xl:hidden">{formatPrice(product.price * quantity)}</p>

          <button
            className="mt-auto self-start text-2xl text-muted-foreground hover:italic hover:text-foreground transition hidden xl:block "
            onClick={handleRemoveClick}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="col-span-2 xl:col-span-1 border-b flex gap-4 items-center pb-4 xl:pb-0 justify-between xl:justify-center">
        <button
          className="mt-auto self-start text-2xl text-muted-foreground hover:italic hover:text-foreground transition  xl:hidden"
          onClick={handleRemoveClick}
        >
          Remove
        </button>
        <div className="flex gap-4 items-center justify-center">
          <button
            className="text-xl"
            onClick={handleMinusClick}
          >
            -
          </button>

          <p className="text-2xl">{quantity}</p>
          <button
            className="text-xl"
            onClick={handlePlusClick}
          >
            +
          </button>
        </div>
      </div>
      <div className="hidden xl:col-span-3 border-b items-center justify-center xl:flex text-2xl">
        <p className="">{formatPrice(product.price * quantity)}</p>
      </div>
    </div>
  );
};

export default CartItem;
