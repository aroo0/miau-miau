"use client"

import { BlurDialog } from "@/components/ui/BlurDialog"
import useMenuModal from "@/hooks/useMenuModal";
import { Brand, Intensity, Ocassion, ScentCluster } from "@/app/global";
import PerfumeMenu from "@/components/PerfumeMenu";
import PerfumesFilters from "@/components/PerfumeFilters";
import Cart from "@/components/cart/Cart";
import useCart from "@/hooks/useCart";
import ShopMenu from "@/app/(shop)/components/ShopNavMenu";

interface DialogProviderProps {
  brands: Brand[];
  intensities: Intensity[];
  ocassions: Ocassion[];
  scentClusters: ScentCluster[];
  
  
}

const DialogProvider: React.FC<DialogProviderProps> = ({  brands,
  intensities,
  ocassions,
  scentClusters,}) => {
  const currentPage = useMenuModal((state) => state.currentPage);
  const onClose = useMenuModal((state) => state.onClose);

  return (
    <BlurDialog isOpen={currentPage !==undefined} onClose={onClose}>
    <div className="flex flex-col items-start  gap-4 box-border w-full pt-8">
      {currentPage === "menu" && <ShopMenu />}
      {currentPage === "perfumes" && (
        <PerfumeMenu
          brands={brands}
          intensities={intensities}
          ocassions={ocassions}
          scentClusters={scentClusters}
          sourceVariant="Navigation"
        />
      )}
      {currentPage === "filter" && (
        <PerfumesFilters
          brands={brands}
          intensities={intensities}
          ocassions={ocassions}
          scentClusters={scentClusters}
          sourceVariant="FilterTab"
        />
      )}
      {currentPage === "cart" && <Cart />}
    </div>
  </BlurDialog>
   )
}

export default DialogProvider