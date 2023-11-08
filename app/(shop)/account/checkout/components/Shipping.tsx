"use client";
import { motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";
import Container from "../../../../../components/ui/Container";
import { Button } from "../../../../../components/ui/Button";
import { formatPrice } from "@/lib/utils";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import axios from "axios";
import ShortOrder from "./ShortOrder";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAddresses } from "@/app/actions/getAddresses";
import { camelCaseAddress } from "@/app/global";
import ChangeAddressForm from "./ChangeAddressForm";

interface ShippingProps {
  session: Session | null;
}

const Shipping: React.FC<ShippingProps> = ({ session }) => {
  const { items, getSubtotal } = useCart();
  const supabase = createClientComponentClient();
  const [addresses, setAddresses] = useState<camelCaseAddress[]>([]);
  const [shippingAddress, setShippingAddress] = useState<
    camelCaseAddress | undefined
  >();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const router = useRouter();

  const onCheckout = async () => {
    if (!session || !shippingAddress) {
      toast.error("Something went wrong.");
      return;
    }
    const response = await axios.post(`/api/checkout`, {
      addressId: shippingAddress.id,
      products: items.map((item) => ({
        itemId: item.product.id,
        quantity: item.quantity,
      })),
    });
    window.location = response.data.url;
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (session) {
          const adddresses = await getAddresses({
            supabase,
            userId: session?.user.id,
          });
          setAddresses(adddresses);
        }
      } catch (error) {
        toast.error("Something went wrong. Try again later.");
      }
    };
    fetchAddresses();
  }, [supabase, setAddresses, shippingAddress]);

  useEffect(() => {
    if (addresses && !shippingAddress) {
      const defaultAddress = addresses.find((address) => address.primary);
      setShippingAddress(defaultAddress);
      if (!defaultAddress) {
        setShippingAddress(addresses[0]);
      }
    }
  }, [addresses]);

  if (!session) {
    return null;
  }

  return (
<motion.div
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition={{ ease: "easeInOut", duration: .5 }}
     className="relative w-full h-full pt-16 sm:pt-20 xl:pt-36 pb-16 bg-background">
      <Container>
        <div className="w-full grid xl:grid-cols-8  gap-6 justify-items-stretch  px-4 xl:px-0 pb-8  ">
          <div className=" flex items-center flex-col gap-7 w-full col-span-8  xl:col-span-5 place-self-start	">
            <div className="flex justify-center border-b pb-4 gap-2 text-xs uppercase w-full  tracking-widest">
              <p>Shipping</p>
            </div>

            <div className="border rounded-sm w-full mt-1 p-4">
              <div className="flex  border-b items-center pb-3">
                <div className="text-xs uppercase w-[120px]">Contact</div>
                <div className="text-sm">{session.user.email}</div>
              </div>
              <div className="flex items-center pt-3">
                <div className="text-xs uppercase w-[120px]">Ship to</div>
                <div className="text-sm">
                  {shippingAddress
                    ? `${shippingAddress.firstName} ${
                        shippingAddress.lastName
                      }, ${shippingAddress.addressLine1} ${
                        shippingAddress.addressLine2 &&
                        shippingAddress.addressLine2
                      }, ${shippingAddress.city} ${
                        shippingAddress.postalCode
                      }, ${shippingAddress.country}`
                    : "Select an address"}
                </div>
                <button
                  className="ml-auto mr-2 uppercase text-xs text-muted-foreground"
                  onClick={() => setIsFormOpen((prev) => !prev)}
                >
                  Change
                </button>
              </div>
            </div>
            <div className="w-full ">
              <div className="uppercase text-xs tracking-widest mb-2">
                Shiping method
              </div>

              <div className="border text-sm rounded-sm w-full mt-1 p-4 flex justify-between items-center">
                <div>EXPRESS SHIPPING </div>
                <div>Complimentary</div>
              </div>
            </div>

            {isFormOpen && (
              <ChangeAddressForm
                addresses={addresses}
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                setIsFormOpen={setIsFormOpen}
                session={session}
              />
            )}
          
          </div>

          <div className="col-span-8 col-start-1 xl:col-start-6 xl:col-span-3 gap-5 w-full ">
            <div className="border-b items-center pb-4 justify-center uppercase tracking-widest xl:flex text-xs w-full mb-7 text-center">
              <p>Order</p>
            </div>
            <ShortOrder />
            <div className="mt-12">
              <div className="flex gap-2 w-full flex-col">
                <div className="uppercase text-sm flex justify-between w-full">
                  <p>Subtotal</p>
                  <p className="">{formatPrice(getSubtotal())}</p>
                </div>
                <div className=" text-sm flex justify-between w-full">
                  <p>Shipping</p>
                  <p className="">Complimentary</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8 border-t pt-4">
              {" "}
              <div className="uppercase text-sm flex gap-2 ">
                Total{" "}
                <div className="text-[10px] text-muted-foreground ">
                  (Taxes & Duties included)
                </div>
              </div>
              <p className="">{formatPrice(getSubtotal())}</p>
            </div>
          </div>
          {!isFormOpen && (
              <div className="flex gap-2 pt-6 justify-between w-full xl:col-start-6 xl:col-span-3">
                <button
                  onClick={() => router.push("/cart")}
                  className="uppercase text-xs"
                >
                  Back to Cart
                </button>
                <Button type="submit" onClick={onCheckout}>
                  Continue to Payment
                </Button>
              </div>
            )}
          
        </div>
     
      </Container>
    </motion.div>
  );
};

export default Shipping;
