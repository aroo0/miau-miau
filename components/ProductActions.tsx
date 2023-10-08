"use client"
import { Heart } from "lucide-react";
import { Button } from "./ui/Button";

interface ProductActionsProps {
  productId: string;
}

const ProductActions: React.FC<ProductActionsProps> = ({ productId }) => {

  return <div className="flex gap-3 items-center">
    <Button variant='outline' size='sm'>Add to cart</Button>
    <Button variant='outline' size='sm'>Buy it now</Button>
    <Button
            variant="opacity"
            size="smallIcon"
            onClick={() => {}}
            title={`Add to Wishlist`}
            className="px-1"
          >
            <Heart strokeWidth={1.4} size={15} />
          </Button>
  </div>;
};

export default ProductActions;
