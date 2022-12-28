import useSWR from "swr";
import type { ApiResponse } from "@/types/index";
import fetcher from "@/lib/fetcher";

/**
 *
 * FIXME: Make a api for handling slugs
 * @param slug
 * @returns
 *
 */
const useTeam = (slug?: string | undefined | null) => {
  const url = `/api/teams`;

  const { data, error } = useSWR<ApiResponse<any>>(url, fetcher);

  return {
    isLoading: !error && !data,
    isError: error,
    team: data?.data?.[0]?.teams?.[0],
  };
};

export default useTeam;
