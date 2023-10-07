"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { OcassionColumn } from "./Columns";
import { Button } from "@/components/ui/Button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/AlertModal";

interface OcassionProps {
  data: OcassionColumn;
}

const CellAction: React.FC<OcassionProps> = ({ data }) => {

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Ocassion Id copied to the clipboard.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/ocassions/${data.id}`);
      router.refresh();
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
        <DropdownMenuItem onClick={() => router.push(`/admin/products/filters/ocassions/${data.id}`)}>
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
