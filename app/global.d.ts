import { Database as DB } from "@/lib/database.types";

export type Category = DB["public"]["Tables"]["product_category"]["Row"];
export type Brand = DB["public"]["Tables"]["product_brand"]["Row"];
export type ScentCluster = DB["public"]["Tables"]["product_scent_cluster"]["Row"];
export type Ocassion = DB["public"]["Tables"]["product_ocassion"]["Row"];
export type Intensity = DB["public"]["Tables"]["product_intensity"]["Row"];
export type Product = DB["public"]["Tables"]["product"]["Row"];
export type ProductInventory = DB["public"]["Tables"]["product_inventory"]["Row"];
export type Image = DB["public"]["Tables"]["product_image"]["Row"];









declare global {
  type Database = DB;

}
