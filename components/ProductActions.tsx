"use client"
import { Button } from "./ui/Button";
import WishlistAction from "./WishlistButton";
import { ExtendedProduct, Product } from "@/app/global";
import AddToCartButton from "./AddToCartButton";
import useCart from "@/hooks/useCart";

interface ProductActionsProps {
  product: ExtendedProduct;
  inWishlist: boolean
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, inWishlist }) => {
  const { addItem } = useCart()


  return <div className="flex gap-3 items-center">

    <Button variant='outline' size='sm'>Add to cart</Button>
    <WishlistAction product={product} inWishlist={inWishlist} />
  </div>;
};

export default ProductActions;
