"use client";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { Intensity, Ocassion, ScentCluster, sortBy } from "@/app/global";
import { cn } from "@/lib/utils";
import useMenuModal from "@/hooks/useMenuModal";

interface FilterProps {
  valueKey: string;
  data: ScentCluster[] | Intensity[] | Ocassion[] | sortBy[];
  sourceVariant: "Navigation" | "FilterTab";
}

const Filter: React.FC<FilterProps> = ({ valueKey, data, sourceVariant }) => {
  const searchParams = useSearchParams();
  const { onClose } = useMenuModal();

  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    let url;
    if (sourceVariant === "Navigation") {
      url = `/perfumes/all?${valueKey}=${id}`;
    } else {
      const current = qs.parse(searchParams.toString());

      const query = {
        ...current,
        [valueKey]: id,
      };

      if (current[valueKey] === id) {
        query[valueKey] = null;
      }

      url = qs.stringifyUrl(
        {
          url: window.location.href,
          query,
        },
        { skipNull: true }
      );
    }

    router.push(url);
    router.refresh();
  };

  return (
    <>
      {data.map((filter) => (
        <li key={filter.id}>
          <Button
            variant="filter"
            size="mainNav"
            onClick={() => onClick(filter.id)}
            className={cn(
              "flex justify-center gap-3",
              selectedValue === filter.id && "italic"
            )}
          >
            <div
              className={cn(
                "w-4  h-4 border rounded-full transition",
                selectedValue === filter.id && "bg-foreground"
              )}
            />
            <span> {filter.name}</span>
          </Button>
        </li>
      ))}
    </>
  );
};

export default Filter;
