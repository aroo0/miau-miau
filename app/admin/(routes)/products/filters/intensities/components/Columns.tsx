"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export type ItensityColumn = {
  id: string;
  name: string;
  rating: number;
  description: string;
  createdAt: string;
};

export const columns: ColumnDef<ItensityColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction  data={row.original}/>,
  },
];
