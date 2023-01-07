import useSWR from "swr";
import type { ApiResponse } from "@/types/index";
import fetcher from "@/lib/fetcher";

const useArtCategory = () => {
  const url = `/api/art-category`;
  const { data, error } = useSWR<ApiResponse<any>>(url, fetcher);
  return {
    isLoading: !error && !data,
    isError: error,
    category: data?.data,
  };
};

export default useArtCategory;
