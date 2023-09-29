"use client";

import ApiList from "@/components/ApiList";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";

const FilterApiCalls = () => {
  return (
    <>
      <Heading title="API | Scent CLusters" description="API calls for scent clusters" />
      <Separator />
      <ApiList entityName="scent-clusters" entityIdName="scentClusterId" />
      <Separator />
      <Heading title="API | ocassions" description="API calls for ocassions" />
      <Separator />
      <ApiList entityName="ocassions" entityIdName="ocassionsId" />
      <Separator />
      <Heading title="API | Intenisities" description="API calls for intenisites" />
      <ApiList entityName="intensities" entityIdName="intenisityId" />
    </>
  );
};

export default FilterApiCalls;
