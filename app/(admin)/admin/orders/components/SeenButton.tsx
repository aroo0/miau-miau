"use client";
import { Button } from "@/components/ui/Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SeenButtonProps {
  orderId: string;
  orderSeen: boolean;
}

const SeenButton: React.FC<SeenButtonProps> = ({ orderId, orderSeen }) => {
  const router = useRouter();
  const onClick = async () => {
    const supabase = createClientComponentClient();

    const { error } = await supabase
      .from("order")
      .update({ seen: true })
      .eq("id", orderId);

    if (error) {
      return toast.error("Something went wrong");
    }

    toast.success("Order marked as seen");
    router.refresh();
  };

  return (
    <Button variant="outline" disabled={orderSeen} onClick={onClick}>
      Mark as seen
    </Button>
  );
};

export default SeenButton;
