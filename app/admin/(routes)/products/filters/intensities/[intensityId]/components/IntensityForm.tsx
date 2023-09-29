"use client";

import { Intensity } from "@/app/global";
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
import AlertModal from "@/components/modals/AlertModal";
import Headling from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/Textarea";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  rating: z.coerce.number().min(1).max(10)
});

type ItensityFormValues = z.infer<typeof formSchema>;

interface IntensityFormProps {
  initialData: Intensity | null;
}

const ItensityForm: React.FC<IntensityFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit intensity" : "Create intensity";
  const description = initialData ? "Edit intensity" : "Add a new intensity";
  const toastMessage = initialData ? "Intensity updated." : "Intensity created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ItensityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      rating: 1
    },
  });

  const onSubmit = async (data: ItensityFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/intensities/${params.intensityId}`, data);
      } else {
        await axios.post(`/api/intensities`, data);
      }

      router.refresh();
      router.push(`/admin/products/filters/`);
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
      await axios.delete(`/api/intensities/${params.intensityId}`);
      router.refresh();
      router.push(`/admin/products/filters`);
      toast.success("Intesity deleted.");
    } catch (error) {
      toast.error("Make sure you removed all products that use this intensity.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
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
                      placeholder="Intesity name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="1"
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
                      placeholder="Intensity description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
          </div>

          <Button
            className="ml-auto"
            type="submit"
            variant="outline"
            disabled={loading}
          >
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default ItensityForm;
