import useSWR from "swr";
import type { ApiResponse } from "@/types/index";
import fetcher from "@/lib/fetcher";
import { jsonToUrlQuery } from "@/lib/commons";

/**
 *
 * FIXME: Make a api for handling slugs
 * @param slug
 * @returns
 *
 */
const useGallery = (userId: string) => {
  const url = `/api/gallery?userId=${userId}`;
  const { data, error } = useSWR<ApiResponse<any>>(url, fetcher);
  return {
    isLoading: !error && !data,
    isError: error,
    userGallery: data?.data,
  };
};

export default useGallery;
