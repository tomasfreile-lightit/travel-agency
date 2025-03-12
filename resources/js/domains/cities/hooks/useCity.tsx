import { useQuery } from "@tanstack/react-query";

import { getCities } from "~/api/cities.ts";

export const useCity = () => {
  const useGetCities = (currentPage: number, pageSize: number) => {
    return useQuery({
      queryFn: () =>
        getCities({
          page: currentPage,
        }),
      queryKey: [
        "getCities",
        {
          page: currentPage,
          pageSize,
        },
      ],
    });
  };

  return {
    getCities: useGetCities,
  };
};
