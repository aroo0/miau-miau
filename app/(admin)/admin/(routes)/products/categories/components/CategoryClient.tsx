"use client";

import { Button } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";
import ApiList from "@/components/ApiList";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between flex-wrap">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button onClick={() => router.push(`/admin/products/categories/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default CategoryClient;
