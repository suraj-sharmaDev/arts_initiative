import useSWR, { mutate } from "swr";

import type { ApiResponse } from "@/types/index";
import fetcher from "@/lib/fetcher";

const useTeamMembers = (slug: string) => {
  const url = `/api/teams/${slug}`;

  const { data, error } = useSWR<ApiResponse<any[]>>(url, fetcher);

  const mutateTeamMembers = async () => {
    mutate(url);
  };

  return {
    isLoading: !error && !data,
    isError: error,
    members: data?.data,
    mutateTeamMembers,
  };
};

export default useTeamMembers;
