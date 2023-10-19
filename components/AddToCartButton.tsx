"use client"


import useCart from "@/hooks/useCart";
import { Button } from "./ui/Button";
import { ExtendedProduct, ShortProductType } from "@/app/global";

interface AddToCartButtonProps {
  data: ExtendedProduct | ShortProductType
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({data}) => {
  const { addItem } = useCart();

  const product: ShortProductType = {
    id: data.id,
    name: data.name,
    productBrand: data.productBrand,
    brandId: data.brandId,
    price: data.price,
    productImage: data.productImage
  }
  return (
    <Button variant="outline" size="sm" onClick={() => addItem(product)}>
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
