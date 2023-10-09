import { Brand, Intensity, Ocassion, ScentCluster } from "@/app/global";
import Container from "./ui/Container";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Router } from "lucide-react";
import useMenuModal from "@/hooks/useMenuModal";
import { useRouter } from "next/navigation";

interface PerfumesFiltersProps {
  brands: Brand[];
  intensities: Intensity[];
  ocassions: Ocassion[];
  scentClusters: ScentCluster[];
}

const PerfumesFilters: React.FC<PerfumesFiltersProps> = ({
  brands,
  intensities,
  ocassions,
  scentClusters,
}) => {
  const { onClose } = useMenuModal();
  const router = useRouter();

  return (
    <Container>
      <div className="flex gap-10 my-10 w-full justify-center">
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
      <div className="grid grid-cols-3 gap-10">
        <div className="">
          <div className="border-b text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
            Brand
          </div>
          <ul>
            {brands.map((brand) => (
              <li key={brand.name}>
                <Button
                  variant="menu"
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
        </div>
        <div className="">
          <div className=" border-b text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
            Ocassion
          </div>
        </div>
        <div className="col-span-3 text-lg lg:text-2xl  transition uppercase tracking-[0.3rem] pb-2">
          <div className="border-b pb-2">Intensity</div>
        </div>
      </div>
    </Container>
  );
};

export default PerfumesFilters;
