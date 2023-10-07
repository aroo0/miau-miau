"use client";

import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { OcassionColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";
import ApiList from "@/components/ApiList";

interface OcassionClientProps {
  data: OcassionColumn[];
}

const OcassionClient: React.FC<OcassionClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <Heading
          title={`Ocassions (${data.length})`}
          description="Manage ocassions for your perfumes"
        />
        <Button onClick={() => router.push(`/admin/products/filters/ocassions/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />

    </>
  );
};

export default OcassionClient;
