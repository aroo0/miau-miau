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
import SuccessToast from "./SuccessToast";

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
        toast.custom((t) => <SuccessToast t={t} product={product} variant="Wishlist" />, { position: "top-right", duration: 4000 });
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
