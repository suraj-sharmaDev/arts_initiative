import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import { ApiResponse } from "@/types/index";

const useInvitation = (token: string) => {
  const url = `/api/invitations/${token}`;

  const { data, error } = useSWR<ApiResponse<any>>(token ? url : null, fetcher);

  return {
    isLoading: !error && !data,
    isError: error,
    invitation: data?.data,
  };
};

export default useInvitation;
