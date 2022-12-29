import useSWR from "swr";
import type { ApiResponse } from "@/types/index";
import fetcher from "@/lib/fetcher";
import { jsonToUrlQuery } from "@/lib/commons";

const useGallery = (
  slug?: string | undefined,
  queryObj?: object | undefined
) => {
  let url = `/api/gallery`;
  if (slug) url += "/" + slug;
  if (queryObj) url += jsonToUrlQuery(queryObj);

  const { data, error } = useSWR<ApiResponse<any>>(url, fetcher);

  return {
    isLoading: !error && !data,
    isError: error,
    gallery: data?.data,
  };
};

export default useGallery;
