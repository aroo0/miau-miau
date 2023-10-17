import { WishListType } from "@/app/global";
import AddToCartButton from "../../../../../components/AddToCartButton";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import DeleteWishListItemButton from "./DeleteWishlistItemButton";

interface WishlistItemProps {
  product: WishListType;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ product }) => {
  return (
    <div className="relative grid items-end  justify-items-center pt-10">
      <div className="absolute top-2 right-6">
        <DeleteWishListItemButton product={product} />
      </div>
      <Link
        className="px-4 grid-rows-4 gap-2 grid justify-items-center  items-baseline  pb-2 "
        href={`/perfumes/${product.brandId}/${product.id}`}
      >
        <div className="relative lg:max-w-[200px] row-span-3">
          <Image
            src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${product.productImages[0]}`}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover"
          />
        </div>
        <div className="row-span-1 flex flex-col items-center text-sm ">
          <p className="text-center">
            {product.name}, {product.brand}
          </p>
          <p className="">{formatPrice(product.price)}</p>
        </div>
      </Link>

      <AddToCartButton />
    </div>
  );
};

export default WishlistItem;
