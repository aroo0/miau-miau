"use client";

import { Ocassion } from "@/app/global";
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
});

type OcassionFormValues = z.infer<typeof formSchema>;

interface OcassionFormProps {
  initialData: Ocassion | null;
}

const  OcassionForm: React.FC<OcassionFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit ocassion" : "Create ocassion";
  const description = initialData ? "Edit ocassion" : "Add a new ocassion";
  const toastMessage = initialData ? "Ocassion updated." : "Ocassion created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<OcassionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data:  OcassionFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/ocassions/${params.ocassionId}`, data);
      } else {
        await axios.post(`/api/ocassions`, data);
      }

      router.refresh();
      router.push(`/admin/products/filters`);
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
      await axios.delete(`/api/ocassions/${params.ocassionId}`);
      router.refresh();
      router.push(`/admin/products/filters`);
      toast.success("Ocassion deleted.");
    } catch (error) {
      toast.error("Make sure you removed all products that use this ocassion.");
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
                      placeholder="Ocassion name"
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
                      placeholder="Ocassion description"
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

export default  OcassionForm;
