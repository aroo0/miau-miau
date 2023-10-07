"use client";

import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BrandColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";
import ApiList from "@/components/ApiList";

interface BrandClientProps {
  data: BrandColumn[];
}

const BrandClient: React.FC<BrandClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <Heading
          title={`Brands (${data.length})`}
          description="Manage brands for your store"
        />
        <Button onClick={() => router.push(`/admin/products/brands/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Brands" />
      <Separator />
      <ApiList entityName="brands" entityIdName="brandId" />
    </>
  );
};

export default BrandClient;
