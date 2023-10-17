"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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
import { Switch } from "@/components/ui/Switch";

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

type AddressFormValues = z.infer<typeof formSchema>;

interface AddressFormProps {
  initialData: camelCaseAddress | null;
  setIsFormOpen: (value: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  setIsFormOpen,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const headline = initialData ? "Edit address" : "Add a new address";

  const toastMessage = initialData ? "Address updated." : "Address created.";
  const action = initialData ? "Save changes" : "Add address";

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          telephone: initialData.telephone ? initialData.telephone : undefined,
          company: initialData.company ? initialData.company : undefined,
          addressOne: initialData.addressLine1,
          addressTwo: initialData.addressLine2
            ? initialData.addressLine2
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
          primary: false,
        },
  });

  const onSubmit = async (data: AddressFormValues) => {
    console.log("aro");
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/categories/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/account/address`, data);
      }

      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="uppercase text-xs tracking-wider pb-2 border-b w-full text-center">
        {headline}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-6 pb-10"
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

          <FormField
            control={form.control}
            name="primary"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 pt-2 pb-3">
                <div className="space-y-1 mt-1">
                  <FormLabel>Set as default address</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2 pt-6">
            <Button type="submit" variant="outline" disabled={loading}>
              {action}
            </Button>
            <Button variant="ghost" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddressForm;
