import { useQuery } from "@tanstack/react-query";

import { getAirlines } from "~/api/airlines.ts";

export const useAirline = () => {
  const useGetAirlines = (currentPage: number, pageSize: number) => {
    return useQuery({
      queryFn: () =>
        getAirlines({
          page: currentPage,
        }),
      queryKey: [
        "getAirlines",
        {
          page: currentPage,
          pageSize,
        },
      ],
    });
  };

  return {
    getAirlines: useGetAirlines,
  };
};
