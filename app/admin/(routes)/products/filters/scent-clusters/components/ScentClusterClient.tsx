"use client";

import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ScentClusterColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";

interface ScentClusterProps {
  data: ScentClusterColumn[];
}

const ScentClusterClient: React.FC<ScentClusterProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <Heading
          title={`Scent Clusters (${data.length})`}
          description="Manage scent clusters for your perfumes"
        />
        <Button
          onClick={() =>
            router.push(`/admin/products/filters/scent-clusters/new`)
          }
        >
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};

export default ScentClusterClient;
