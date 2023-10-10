import { Brand, Intensity, Ocassion, ScentCluster, sortBy } from "@/app/global";
import Container from "./ui/Container";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Router } from "lucide-react";
import useMenuModal from "@/hooks/useMenuModal";
import { useRouter } from "next/navigation";
import Filter from "./Filter";

interface PerfumesFiltersProps {
  brands: Brand[];
  intensities: Intensity[];
  ocassions: Ocassion[];
  scentClusters: ScentCluster[];
  sourceVariant: "Navigation" | "FilterTab";
}

const PerfumesFilters: React.FC<PerfumesFiltersProps> = ({
  intensities,
  ocassions,
  scentClusters,
  sourceVariant,
}) => {
  const { onClose } = useMenuModal();

  const sortOptions: sortBy[] = [
    { name: "Price, low to high", id: "price-ascending" },
    { name: "Price, high to low", id: "price-descending" },
    { name: "Date, old to new", id: "date-ascending" },
    { name: "Date, new to old", id: "date-descending" },
  ];

  return (
    <div className="w-full h-full">
      <Container>
        <div className="grid grid-cols-3 gap-10 mt-40 ">
          <div>
            <div className="border-b text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
              Scent Cluster
            </div>
            <ul className="pt-4">
              <Filter
                valueKey="scentClusterId"
                data={scentClusters}
                sourceVariant={sourceVariant}
              />
            </ul>
          </div>
          <div>
            <div className=" border-b text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
              Ocassion
            </div>
            <ul className="pt-4">
              <Filter
                valueKey="ocassionId"
                data={ocassions}
                sourceVariant={sourceVariant}
              />
            </ul>
          </div>
          <div>
            <div className=" border-b text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
              Sort by
            </div>
            <ul className="pt-4">
              <Filter
                valueKey="order"
                data={sortOptions}
                sourceVariant={sourceVariant}
              />
            </ul>
          </div>
          <div className="col-span-3 text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
            <div className="border-b pb-2">Intensity</div>
            <ul className="pt-4 flex w-full justify-between px-1">
              <Filter
                valueKey="intensityId"
                data={intensities}
                sourceVariant={sourceVariant}
              />
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PerfumesFilters;
