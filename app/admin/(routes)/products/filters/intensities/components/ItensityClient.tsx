"use client";

import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ItensityColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";
import ApiList from "@/components/ApiList";

interface IntenisityClientProps {
  data: ItensityColumn[];
}

const IntenisityClient: React.FC<IntenisityClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <Heading
          title={`Intenisites (${data.length})`}
          description="Manage intenisites for your perfumes"
        />
        <Button onClick={() => router.push(`/admin/products/filters/intensities/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    
    </>
  );
};

export default IntenisityClient;
