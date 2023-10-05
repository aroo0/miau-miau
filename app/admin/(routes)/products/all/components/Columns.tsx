"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button";


export type ProductColumn = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  brand: string;
  scentCluster: string;
  isFeatured: boolean;
  isArchived: boolean;

};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="opacity"
          size='header'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" strokeWidth="1.4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="opacity"
          size='header'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" strokeWidth="1.4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(price)
 
      return formatted
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="opacity"
          size='header'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" strokeWidth="1.4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="opacity"
          size='header'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" strokeWidth="1.4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          variant="opacity"
          size='header'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" strokeWidth="1.4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "scentCluster",
    header: ({ column }) => {
      return (
        <Button
          variant="opacity"
          size='header'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Scent Cluster
          <ArrowUpDown className="ml-2 h-4 w-4"  strokeWidth="1.4"/>
        </Button>
      )
    },
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => {
      return (
        <Button
          variant="opacity"
          size='header'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Featured
          <ArrowUpDown className="ml-2 h-4 w-4" strokeWidth="1.4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "isArchived",
    header: ({ column }) => {
      return (
        <Button
          variant="opacity"
          size='header'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Archived
          <ArrowUpDown className="ml-2 h-4 w-4" strokeWidth="1.4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction  data={row.original}/>,
  },
];
