"use client"
import { Heart } from "lucide-react";
import { Button } from "./ui/Button";
import WishlistAction from "./WishlistButton";
import toast from "react-hot-toast";
import { ExtendedProduct, Product } from "@/app/global";
import AddToCartButton from "./AddToCartButton";

interface ProductActionsProps {
  product: ExtendedProduct;
  inWishlist: boolean
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, inWishlist }) => {

  return <div className="flex gap-3 items-center">

    <Button variant='outline' size='sm'>Add to cart</Button>
    <AddToCartButton />
    <WishlistAction product={product} inWishlist={inWishlist} />
  </div>;
};

export default ProductActions;
