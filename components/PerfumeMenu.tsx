import { Brand, Intensity, Ocassion, ScentCluster } from "@/app/global";
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

const PerfumeMenu: React.FC<PerfumesFiltersProps> = ({
  brands,
  intensities,
  ocassions,
  scentClusters,
  sourceVariant
  
}) => {
  const { onClose } = useMenuModal();
  const router = useRouter();

  return (
    <div className="w-full h-full" onClick={onClose}>
    <Container >
      <div className="flex gap-10 py-16 w-full justify-center">
        <Button
          variant="menu"
          size="mainNav"
          onClick={() => {
            onClose();
            router.push("/perfumes/all");
          }}
        >
          All
        </Button>
        <Button
          variant="menu"
          size="mainNav"
          onClick={() => {
            onClose();
            router.push("/perfumes/bestsellers");
          }}
        >
          Bestsellers
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-10 " onClick={onClose} >
        <div className="">
          <div className="border-b text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
            Brand
          </div>
          <ul className="pt-4">
            {brands.map((brand) => (
              <li key={brand.name}>
                <Button
                  variant="filter"
                  size="mainNav"
                  onClick={() => {
                    onClose();
                    router.push(`/perfumes/${brand.id}`);
                  }}
                >
                  {brand.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="">
          <div className="border-b text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
            Scent Cluster
          </div>
          <ul className="pt-4">
            <Filter valueKey="scentClusterId" data={scentClusters} sourceVariant={sourceVariant}/>
          </ul>
        </div>
        <div className="">
          <div className=" border-b text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
            Ocassion
          </div>
          <ul className="pt-4">
            <Filter valueKey="ocassionId" data={ocassions}  sourceVariant={sourceVariant}/>
          </ul>
        </div>
        <div className="col-span-3 text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
          <div className="border-b pb-2">Intensity</div>
          <ul className="pt-4 flex w-full justify-between px-1">
            <Filter valueKey="intensityId" data={intensities} sourceVariant={sourceVariant}/>
          </ul>
        </div>
      </div>
    </Container>
    </div>
  );
};

export default PerfumeMenu;
