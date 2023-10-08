import { ExtendedProduct } from "@/app/global";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface RelatedProductsProps {
  relatedProducts: ExtendedProduct[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts,
}) => {
  return (
    <div className="">
      <h2 className="uppercase text-sm tracking-wider">Related Products</h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-10 lg:ml-[-20px]">
        {relatedProducts.slice(0, 4).map((product, index) => (
          <Link href={`/perfumes/${product.brandId}/${product.id}`} className="justify-center content-center">
            <div className="my-6 flex justify-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${product.productImage[0].url}`}
              alt={product.name}
              width={200}
              height={500}
              className="object-cover"
            />
            </div>
            <div className="flex flex-col items-center text-sm">
              <h2 className="">
                <span className="italic">{product.name}</span>,{" "}
                <span className="hover:italic text-muted-foreground">
                  {product.productBrand?.name}
                </span>
              </h2>
              <p className="text-gray-700">{formatPrice(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
