import { Database as DB } from "@/lib/database.types";

export type Category = DB["public"]["Tables"]["product_category"]["Row"];
export type Brand = DB["public"]["Tables"]["product_brand"]["Row"];





declare global {
  type Database = DB;

}
