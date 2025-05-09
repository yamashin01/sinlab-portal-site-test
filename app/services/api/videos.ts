import { createServerSupabaseClient } from "./supabase";

export async function fetchVideos() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("is_deleted", false);

  if (error) {
    console.error("Supabase 動画一覧データ取得エラー:", error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
