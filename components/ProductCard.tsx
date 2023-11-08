import { ExtendedProduct } from "@/app/global";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  data: ExtendedProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  return (
    <Link href={`/perfumes/${data.brandId}/${data.id}`}>
      <article className="flex-col flex items-center gap-6 text-sm group">
        <div className="w-full h-full xl:h-[450px] flex items-center justify-center lg:group-hover:scale-110 transition duration-500 ease-in-out">
          <Image
            src={data.productImage[0] ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${data.productImage[0].url}` : '/2302260046DSC_3879-1024x1024.jpg' }
            alt={data.name}
            width={400}
            height={500}
            className="object-cover"
          />
        </div>
        <div className="flex-col flex items-center">
          <h2 className="">
            <span className="italic">{data.name}</span>, {data.productBrand?.name}
          </h2>
          <p className="text-muted">
            {formatPrice(data.price)}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
