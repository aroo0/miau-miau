import { Database as DB } from "@/lib/database.types";

export type Category = DB["public"]["Tables"]["product_category"]["Row"];




declare global {
  type Database = DB;

}
