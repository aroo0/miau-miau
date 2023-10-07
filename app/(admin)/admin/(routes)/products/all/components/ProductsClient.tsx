"use client";

import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {ProductColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/ProductsTable";
import ApiList from "@/components/ApiList";


interface ProductsClientProps {
  data: ProductColumn[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button onClick={() => router.push(`/admin/products/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductsClient;
