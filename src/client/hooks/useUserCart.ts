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
const useUserCart = () => {
  const url = `/api/cart`;
  const { data, error, mutate } = useSWR<ApiResponse<any>>(url, fetcher);
  return {
    isLoading: !error && !data,
    isError: error,
    userCart: data?.data,
    mutate,
  };
};

export default useUserCart;
