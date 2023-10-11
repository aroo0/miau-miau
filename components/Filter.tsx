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
  type?: "singleSelect" | "multiSelect";
}

const Filter: React.FC<FilterProps> = ({
  valueKey,
  data,
  sourceVariant,
  type,
}) => {
  const searchParams = useSearchParams();
  const { onClose } = useMenuModal();

  const router = useRouter();
  const currentParam = searchParams.getAll(valueKey);

  const onClick = (id: string) => {
    let query;
    let url;
    const current = qs.parse(searchParams.toString());

    if (sourceVariant === "Navigation") {
      url = `/perfumes/all?${valueKey}=${id}`;
    } else {
      if (type === "singleSelect") {
        query = {
          ...current,
          [valueKey]: id,
        };
      } else {
        query = {
          ...current,
          [valueKey]: currentParam,
        };

        const index = query[valueKey]!.indexOf(id);
        if (index !== -1) {
          // @ts-ignore
          query[valueKey].splice(index, 1);
        } else {
          // @ts-ignore
          query[valueKey].push(id);
        }
      }

      url = qs.stringifyUrl(
        {
          url: window.location.href,
          query,
        },
        { skipNull: true }
      );
    }

    console.log(url);

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
              currentParam.includes(filter.id) && "italic"
            )}
          >
            {sourceVariant === "FilterTab" && (
              <div
                className={cn(
                  "w-4  h-4 border rounded-full transition",
                  currentParam.includes(filter.id) && "bg-foreground"
                )}
              />
            )}
            <span> {filter.name}</span>
          </Button>
        </li>
      ))}
    </>
  );
};

export default Filter;
