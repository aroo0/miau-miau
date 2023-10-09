import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ExtendedProduct } from "../global";
import camelcaseKeys from "camelcase-keys";

interface Params {
  supabase: SupabaseClient;
  table: string;
}
export async function getFilterTable({ supabase, table }: Params) {
  try {
    const { data, error: supabaseError } = await supabase
      .from(table)
      .select("*");

    if (supabaseError) {
      console.log(supabaseError);
      return [];
    }

    const camelCaseData = camelcaseKeys(data);

    return camelCaseData;
  } catch (error) {
    console.log(error);
    return [];
  }
}
