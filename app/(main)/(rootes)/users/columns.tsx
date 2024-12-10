"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DataUsing = {
  id: number;
  user: string;
};

export const columns: ColumnDef<DataUsing>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "user",
    header: "user",
  },
];
