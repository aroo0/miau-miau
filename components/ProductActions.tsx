"use client"
import { Heart } from "lucide-react";
import { Button } from "./ui/Button";
import WishlistAction from "./WishlistAction";
import toast from "react-hot-toast";
import { ExtendedProduct, Product } from "@/app/global";

interface ProductActionsProps {
  product: ExtendedProduct;
  inWishlist: boolean
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, inWishlist }) => {

  return <div className="flex gap-3 items-center">

    <Button variant='outline' size='sm'>Add to cart</Button>
    <Button variant='outline' size='sm' onClick={() => toast('gkjgjgjgg')}>Buy it now</Button>
    <WishlistAction product={product} inWishlist={inWishlist} />
  </div>;
};

export default ProductActions;
