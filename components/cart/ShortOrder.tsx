import useCart from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

interface ShortOrderProps {}

const ShortOrder: React.FC<ShortOrderProps> = ({}) => {
  const { items } = useCart();

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const { product, quantity } = item; // Destructure the item object

        return (
          <div key={product.id} className="text-sm">
            <div className="flex justify-between">
            <p className="">
              {product.name}
              {", "}
              {product.productBrand.name}
            </p>
            <p> {formatPrice(product.price * quantity)}</p>
            </div>
            <p className="text-muted-foreground text-xs ">
              Qty: {quantity}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ShortOrder;
