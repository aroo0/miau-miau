"use client"

import { Brand } from "@/app/global";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import AlertModal from "@/components/modals/AlertModal";
import Headling from "@/components/ui/Headling";
import { Separator } from "@/components/ui/Separator";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/Textarea";



const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

type BrandFormValues = z.infer<typeof formSchema>;

interface BrandFormProps {
  initialData: Brand | null;
}

const BrandForm: React.FC <BrandFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit brand" : "Create brand";
  const description = initialData ? "Edit brand" : "Add a new brand";
  const toastMessage = initialData ? "Brand updated." : "Brand created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: BrandFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/brands/${params.brandId}`,
          data
        );
      } else {
        await axios.post(`/api/brands`, data);
      }

      router.refresh();
      router.push(`/admin/products/brands`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/brands/${params.categoryId}`
      );
      router.refresh();
      router.push(`/admin/products/brands`);
      toast.success("Brand deleted.");
    } catch (error) {
      toast.error(
        "Make sure you removed all products that use this brand."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (  <>
    <AlertModal
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={() => onDelete()}
      loading={loading}
    />
    <div className="flex items-center justify-between">
      <Headling title={title} description={description} />
      {initialData && (
        <Button
          variant={"destructive"}
          size="icon"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
    <Separator />
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-6 pb-10"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Brand name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Brand description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      
        </div>

        <Button className="ml-auto" type="submit" variant='outline' disabled={loading}>
          {action}
        </Button>
      </form>
    </Form>
    <Separator />
  </>)


};

export default BrandForm;
