"use client";
import WishlistAction from "./WishlistButton";
import { ExtendedProduct, Product } from "@/app/global";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductActionsProps {
  product: ExtendedProduct;
  inWishlist: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  inWishlist,
}) => {
  return (
    <div className="flex gap-3 items-center">
      <AddToCartButton data={product} />

      <WishlistAction product={product} inWishlist={inWishlist} />
    </div>
  );
};

export default ProductActions;
