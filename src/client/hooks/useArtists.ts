import useSWR from "swr";
import type { ApiResponse } from "@/types/index";
import fetcher from "@/lib/fetcher";

const useArtists = () => {
  const url = `/api/admin/artist`;
  const { data, error } = useSWR<ApiResponse<any>>(url, fetcher);
  return {
    isLoading: !error && !data,
    isError: error,
    artists: data?.data,
  };
};

export default useArtists;
