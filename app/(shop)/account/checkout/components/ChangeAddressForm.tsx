"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { camelCaseAddress } from "@/app/global";
import useMenuModal from "@/hooks/useMenuModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/Select";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Label } from "../../../../../components/ui/Label";

const formSchema = z.object({
  firstName: z.string().min(1).max(18),
  lastName: z.string().min(1).max(18),
  telephone: z.string().min(8).max(14),
  company: z.string().optional(),
  addressOne: z.string().min(1),
  addressTwo: z.string().optional(),
  country: z.string().min(3).max(50),
  city: z.string().min(3).max(50),
  zip: z.string().min(4).max(10),
  primary: z.boolean().optional(),
});

type ChangeAddressFormValues = z.infer<typeof formSchema>;

interface ChangeAddressFormProps {
  addresses: camelCaseAddress[];
  shippingAddress: camelCaseAddress | undefined;
  setIsFormOpen: (value: boolean) => void;
  setShippingAddress: (value: camelCaseAddress) => void;
  session: Session;
}

const ChangeAddressForm: React.FC<ChangeAddressFormProps> = ({
  shippingAddress,
  addresses,
  setIsFormOpen,
  setShippingAddress,
  session,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<
    camelCaseAddress | undefined
  >(shippingAddress);

  const form = useForm<ChangeAddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: selectedAddress
      ? {
          ...selectedAddress,
          zip: selectedAddress.postalCode,
          telephone: selectedAddress.telephone
            ? selectedAddress.telephone
            : undefined,
          company: selectedAddress.company
            ? selectedAddress.company
            : undefined,
          addressOne: selectedAddress.addressLine1,
          addressTwo: selectedAddress.addressLine2
            ? selectedAddress.addressLine2
            : undefined,
        }
      : {
          firstName: "",
          lastName: "",
          telephone: "",
          company: "",
          addressOne: "",
          addressTwo: "",
          country: "",
          city: "",
          zip: "",
        },
  });

  useEffect(() => {
    form.setValue(
      "firstName",
      selectedAddress ? selectedAddress.firstName || "" : ""
    );
    form.setValue(
      "lastName",
      selectedAddress ? selectedAddress.lastName || "" : ""
    );
    form.setValue(
      "company",
      selectedAddress ? selectedAddress.company || "" : ""
    );
    form.setValue(
      "addressOne",
      selectedAddress ? selectedAddress.addressLine1 || "" : ""
    );
    form.setValue(
      "addressTwo",
      selectedAddress ? selectedAddress.addressLine2 || "" : ""
    );
    form.setValue(
      "country",
      selectedAddress ? selectedAddress.country || "" : ""
    );
    form.setValue("city", selectedAddress ? selectedAddress.city || "" : "");
    form.setValue(
      "zip",
      selectedAddress ? selectedAddress.postalCode || "" : ""
    );
    form.setValue(
      "telephone",
      selectedAddress ? selectedAddress.telephone || "" : ""
    );
  }, [selectedAddress, form]);

  const onSubmit = async (data: ChangeAddressFormValues) => {
    let id; // Declare the id variable
    try {
      setLoading(true);

      if (selectedAddress && selectedAddress.id) {
        await axios.patch(`/api/account/address/${selectedAddress.id}`, data);
        id = selectedAddress.id; // Set id if updating an existing address
      } else {
        const response = await axios.post(`/api/account/address`, data);
        id = response.data.id; // Set id if creating a new address
      }

      const newShippingAddress = {
        addressLine1: data.addressOne,
        addressLine2: data.addressTwo || null,
        city: data.city,
        company: data.company || null,
        country: data.country,
        firstName: data.firstName,
        id: id,
        lastName: data.lastName,
        postalCode: data.zip,
        primary: data.primary,
        telephone: data.telephone,
        userId: session.user.id,
      };

      // Set the shipping address
      setShippingAddress(newShippingAddress);
      toast.success("Email updated successfully");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setIsFormOpen(false);
    }
  };

  return (
    <>
      <div className="uppercase text-xs tracking-wider pb-2 border-b w-full text-center mt-6">
        Change Address
      </div>
      <div className="w-full mt-4">
        <Select
          onValueChange={(value) => {
            if (value === "new-address") {
              setSelectedAddress(undefined);
            } else {
              const selected = addresses.find(
                (address) => address.id === value
              );
              setSelectedAddress(selected || shippingAddress);
            }
          }}
          defaultValue={
            selectedAddress ? selectedAddress.id : "new-address-option"
          }
        >
          <Label className="text-xs uppercase">Select an address</Label>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select Shipping Address" />
          </SelectTrigger>
          <SelectContent>
            {addresses.map((address) => (
              <SelectItem key={address.id} value={address.id.toString()}>
                {`${address.firstName} ${address.lastName}, ${
                  address.addressLine1
                } ${address.addressLine2 && address.addressLine2}, ${
                  address.city
                } ${address.postalCode}, ${address.country}`}
              </SelectItem>
            ))}
            <SelectItem key="new-address-option" value="new-address">
              Use a new address
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 pb-10 w-full"
        >
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressOne"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressTwo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apartment, Suite, etc.</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Apartment, Suite, etc.
"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal/Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Postal/Zip Code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem className="pb-1">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 pt-6 justify-between">
            <button
              onClick={() => router.push("/cart")}
              className="uppercase text-xs"
            >
              Back to Cart
            </button>
            <Button type="submit" disabled={loading}>
              Save Shipping Address
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ChangeAddressForm;
