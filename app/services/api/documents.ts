import { createServerSupabaseClient } from "./supabase";

export async function fetchDocuments() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("documents").select("*");

  if (error) {
    console.error("Supabase 資料一覧データ取得エラー:", error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
