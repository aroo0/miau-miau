"use client";

import { ExtendedProduct } from "@/app/global";
import { formatPrice } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Link from "next/link";
import ProductActions from "./ProductActions";
import Image from "next/image";
import RelatedProducts from "./RelatedProducts";
import CarouselGallery from "./CarouselGallery";
import { motion } from "framer-motion";

interface ProductDisplayProps {
  product: ExtendedProduct;
  relatedProducts: ExtendedProduct[];
  inWishlist: boolean;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  product,
  relatedProducts,
  inWishlist,
}) => {
  const htmlDetails = { __html: product.details || "" };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-5 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      key={product.id}
    >
      <div className="hidden lg:flex col-span-3 flex-col items-center gap-20 lg:my-16 px-4 pt-8 ">
        {product.productImage.map((image, index) => (
          <Image
            src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${image.url}`}
            alt={product.name}
            key={index}
            width={700}
            height={800}
            className="object-cover"
          />
        ))}
      </div>
      <div className="lg:hidden w-full col-span-3 mt-2 mb-4">
        <CarouselGallery images={product.productImage} />
      </div>
      <div className="lg:h-[110vh] flex flex-col lg:sticky top-0 justify-center gap-4 col-span-2 lg:ml-10 pb-20 px-4 ">
        <div>
          <h1>
            <span className="italic ">{product.name}</span>,{" "}
            <span className="hover:italic text-muted-foreground">
              {product.productBrand?.name}
            </span>
          </h1>
          <p className="">{formatPrice(product.price)}</p>
        </div>
        <div>
          <div className="text-sm">
            Scent Cluster:{" "}
            <Link className=" text-muted-foreground hover:italic" href="/">
              {product.productScentCluster.name}
            </Link>
          </div>
          <div className=" text-sm ">Volume: {product.volume}</div>
        </div>

        <p className="text-sm">{product.description}</p>
        <Accordion
          type="single"
          collapsible
          className="text-xs  border rounded-md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="">Details</AccordionTrigger>
            <AccordionContent>
              <p dangerouslySetInnerHTML={htmlDetails}></p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="border-t">Shipping</AccordionTrigger>
            <AccordionContent>
              <p>
                <i>Miau Miau</i> offers complimentary express shipping on all
                orders. Please allow 1–2 business days for us to dispatch your
                order. Delivery times will vary depending on the destination.{" "}
                <br />
                <br />
                Orders shipping internationally:
                <br />
                <i>4–6 business days, excluding customs clearance</i>
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="border-t">
              Return & Refunds
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Given the completely subjective nature of fragrances, we cannot
                guarantee the fragrance(s) that you purchase will meet or exceed
                your expectations. As such, all returns and exchanges are
                respectfully declined. We recommend purchasing samples or a
                discovery set on our website before purchasing a full-size
                bottle. Thank you for your understanding.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ProductActions product={product} inWishlist={inWishlist} />
      </div>
      <div className="col-span-3 mx-4">
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </motion.div>
  );
};

export default ProductDisplay;
