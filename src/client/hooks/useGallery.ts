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
const useGallery = (query: object) => {
  const url = `/api/gallery` + jsonToUrlQuery(query);
  const { data, error, mutate } = useSWR<ApiResponse<any>>(url, fetcher);
  return {
    isLoading: !error && !data,
    isError: error,
    userGallery: data?.data,
    mutate,
  };
};

export default useGallery;
