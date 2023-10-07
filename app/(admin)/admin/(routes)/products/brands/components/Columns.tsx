"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export type BrandColumn = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
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
