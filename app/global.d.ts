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

export type Address = DB["public"]["Tables"]["user_addresses"]["Row"];


export type camelCaseAddress = {
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  company: string | null;
  country: string;
  createdAt?: string;
  firstName: string;
  id: string;
  lastName: string;
  postalCode: string;
  primary?: boolean;
  telephone: string | null;
  userId: string;
};

export type CustomerOrder = {
  id: string;
  total: number;
  isPaid: boolean;
  createdAt: Date;
  orderItems: {
    id: string;
    quantity: number;
    productId: string;
    product: {
      id: string;
      brandId: string;
      name: string;
    };
  }[];
};

export type AdminOrder = Omit<CustomerOrder, 'orderItems'> & {
  seen: boolean;
  addressId: camelCaseAddress;
  orderItems: {
    id: string;
    quantity: number;
    productId: string;
    product: {
      id: string;
      brandId: string;
      name: string;
      volume: string;
      productBrand: {
        name: string;
      };
    };
  }[];
};
export type ModalPageVariant =
  | "menu"
  | "perfumes"
  | "about"
  | "search"
  | "cart"
  | "newsletter"
  | "filter"
  | "shipping"
  | undefined;
export type sortBy = { name: string; id: string };

export interface ShortProductType {
  id: string;
  name: string;
  productBrand: { name: string };
  brandId: string;
  price: number;
  productImage: { url: string }[];
}

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
  productBrand: { name: string };
  productScentCluster: { name: string };
}

declare global {
  type Database = DB;
}
