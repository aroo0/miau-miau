import { Database as DB } from "@/lib/database.types";

export type Category = DB["public"]["Tables"]["product_category"]["Row"];
export type Brand = DB["public"]["Tables"]["product_brand"]["Row"];
export type ScentCluster =
  DB["public"]["Tables"]["product_scent_cluster"]["Row"];
export type Ocassion = DB["public"]["Tables"]["product_ocassion"]["Row"];
export type Intensity = DB["public"]["Tables"]["product_intensity"]["Row"];
export type Product = DB["public"]["Tables"]["product"]["Row"];
export type ProductInventory =
  DB["public"]["Tables"]["product_inventory"]["Row"];
export type Image = DB["public"]["Tables"]["product_image"]["Row"];

export type ModalPageVariant =
  | "menu"
  | "perfumes"
  | "about"
  | "search"
  | "cart"
  | "newsletter"
  | "filter"
  | undefined;
export type sortBy = { name: string; id: string };

export type CamelCaseProduct = {
  brandId: string;
  categoryId: string;
  createdAt: string;
  createdBy: string;
  description: string;
  details: string | null;
  id: string;
  intensityId: string;
  isArchived: boolean;
  isFeatured: boolean;
  name: string;
  occasionId: string;
  price: number;
  scentClusterId: string;
  volume: string;
};
export interface ExtendedProduct extends CamelCaseProduct {
  productImage: { url: string }[];
  productInventory: { id: string; quantity: number }[];
  productBrand: { name: string } | null;
  productScentCluster: { name: string };
}

declare global {
  type Database = DB;
}
