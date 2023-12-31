"use client";
import useMenuModal from "@/hooks/useMenuModal";
import Container from "../ui/Container";
import useCart from "@/hooks/useCart";
import CartItem from "./CartItem";
import { Button } from "../ui/Button";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";



const Cart = () => {
  const { onClose } = useMenuModal();
  const { items, getSubtotal } = useCart();
  const router = useRouter();


  return (
    <div
      className="relative w-full h-full pt-8 sm:pt-20 xl:pt-36 pb-16"
      onClick={() => onClose()}
    >
      <Container>
        {items.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center gap-6 xl:min-h-[50vh]">
            <div className="text-xl sm:text-3xl">
              Your shopping bag is empty.
            </div>
            <Button variant="outline" onClick={() => router.push('/perfumes/all')}>
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            <div className=" grid xl:grid-cols-8  gap-6 justify-items-stretch uppercase tracking-widest text-xl mb-4 ">
              <div className="col-span-4 flex w-full border-b pb-4 gap-2">
                <p>Product</p>
              </div>
              <div className="col-span-1 border-b  hidden xl:flex gap-4 items-center justify-center">
                <p>Qty</p>
              </div>
              <div className="col-span-3 border-b items-center justify-center  hidden xl:flex text-2xl">
                <p>Total</p>
              </div>
            </div>
            <div className="grid gap-10  h-[60vh] xl:h-auto overflow-scroll xl:overflow-visible">
              {items.map((item) => (
                <CartItem key={item.product.id} data={item} />
              ))}
            </div>
            <div className="w-full grid xl:grid-cols-8  gap-6 justify-items-stretch uppercase tracking-widest text-2xl xl:static fixed bottom-0 left-0 px-8 xl:px-0 mb-8  ">
              <div className="xl:col-start-6 xl:col-span-3 mt-4 xl:mt-10  ">
                <div className="flex justify-between mb-4 xl:mb-12">
                  {" "}
                  <p>Subtotal</p>
                  <p className="">{formatPrice(getSubtotal())}</p>
                </div>
                <Button
                  variant="outline"
                  className="text-xl w-full"
                  disabled={items.length === 0}
                  onClick={() => {
                    router.push("/account/checkout");
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Cart;
