"use client"
import { Heart, X } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toast } from "react-hot-toast";
import { ExtendedProduct } from "@/app/global";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

interface WishlistButtonProps {
  product: ExtendedProduct;
  inWishlist: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  inWishlist,
}) => {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(inWishlist);
  const [disabled, setDisabled] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const supabase = createClientComponentClient();

  const successToast = (t: Toast) => (
    <div
      className={twMerge(
        t.visible ? "opacity-100 " : "opacity-0",
        `max-w-md w-full bg-background rounded-lg flex flex-col border mt-10 transition duration-100`
      )}
    >
      <div className="flex justify-between items-center w-full border-b pl-3 pr-2 py-1">
        <p className="uppercase text-xs tracking-wider">
          Added to your wishlist
        </p>
        <Button
          variant="menu"
          size="smallIcon"
          onClick={() => toast.dismiss(t.id)}
        >
          <X size={12} />
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-3 p-3 pt-5">
        <div className="relative col-span-1 max-h-20">
          {" "}
          <Image
            src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_STORAGE}/${product.productImage[0].url}`}
            alt={product.name}
            width={200}
            height={100}
            className="object-cover h-full"
          />
        </div>
        <div className="col-span-2 text-sm">
          <div className="">
            <span className="italic">{product.name}</span>
            {", "}
            <br />
            {product.productBrand?.name}
          </div>
          <p>{formatPrice(product.price)}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-4 pb-4 pt-2">
        <Button
          className="col-start-2 place-items-start	"
          variant="outline"
          size="sm"
          onClick={() => {
            router.push("/account/wishlist");
            toast.dismiss(t.id);
          }}
        >
          Wishlist
        </Button>
      </div>
    </div>
  );

  const onClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return router.push(`/login?continue=${pathname}`);
    }

    setDisabled(true);
    setIsInWishlist((prev) => !prev);

    try {
      if (!isInWishlist) {
        await supabase
          .from("wishlist")
          .insert({ product_id: product.id, user_id: user.id });
        toast.custom(successToast, { position: "top-right", duration: 4000 });
      } else {
        await supabase
          .from("wishlist")
          .delete()
          .eq("product_id", product.id)
          .eq("user_id", user.id);
        toast.success("Product deleted from wishlist.");
      }
    } catch (error) {
      setIsInWishlist((prev) => !prev);
      toast.error("Something went wrong.");
    } finally {
      setDisabled(false)

    }
  };
  return (
    <Button
      variant="opacity"
      size="smallIcon"
      onClick={onClick}
      title={`Add to Wishlist`}
      className="px-1"
      disabled={disabled}
    >
      {isInWishlist ? (
        <Heart strokeWidth={1.4} size={15} fill="current" />
      ) : (
        <Heart strokeWidth={1.4} size={15} />
      )}
    </Button>
  );
};

export default WishlistButton;
