"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { ProductColumn } from "./Columns";
import { Button } from "@/components/ui/Button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/AlertModal";

interface CellActionProps {
  data: ProductColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {

  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product Id copied to the clipboard.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/products/${data.id}`);
      router.refresh();
      toast.success("Product deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
    <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onConfirm={onDelete}/>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 w-4 h-4" />
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/admin/products/${data.id}`)}>
          <Edit className="mr-2 w-4 h-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpen(true)}>
          <Trash className="mr-2 w-4 h-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};

export default CellAction;
