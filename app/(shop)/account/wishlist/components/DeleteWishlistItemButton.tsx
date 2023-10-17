"use client"
import { Heart, X } from "lucide-react";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toast, Toaster } from "react-hot-toast";
import { ExtendedProduct, WishListType } from "@/app/global";
import { Button } from "@/components/ui/Button";

interface DeleteWishListItemButtonProps {
  product: WishListType;
}

const DeleteWishListItemButton: React.FC<DeleteWishListItemButtonProps> = ({
  product,
}) => {
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

    try {
      await supabase
        .from("wishlist")
        .delete()
        .eq("product_id", product.id)
        .eq("user_id", user.id);

      toast.success("Product deleted from wishlist.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setDisabled(false);
      router.refresh();
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
      <Heart strokeWidth={1.4} size={12} fill="current" />
    </Button>
  );
};

export default DeleteWishListItemButton;
