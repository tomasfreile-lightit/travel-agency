import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  City,
  CityCreate,
  createCity,
  deleteCity,
  editCity,
  getCities,
} from "~/api/cities.ts";
import { errorToast, useToastStore } from "~/ui";

export const useCity = () => {
  const queryClient = useQueryClient();

  const { pushToast } = useToastStore();

  const useGetCities = (
    currentPage: number,
    pageSize: number,
    searchQuery?: string,
  ) => {
    return useQuery({
      queryFn: () =>
        getCities({
          page: currentPage,
          perPage: pageSize,
          searchQuery,
        }),
      queryKey: [
        "getCities",
        {
          page: currentPage,
          perPage: pageSize,
          searchQuery,
        },
      ],
    });
  };

  const useCreateCity = () => {
    return useMutation({
      mutationFn: (data: CityCreate) => createCity(data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getCities"],
        });
        void pushToast({
          type: "success",
          message: "City created successfully",
        });
      },
      onError: errorToast,
    });
  };

  const useEditCity = () => {
    return useMutation({
      mutationFn: (data: City) => editCity(data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getCities"],
        });
        void pushToast({
          type: "success",
          message: "City updated successfully",
        });
      },
      onError: errorToast,
    });
  };

  const useDeleteCity = () => {
    return useMutation({
      mutationFn: (id: number) => deleteCity(id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getCities"],
        });
        void pushToast({
          type: "success",
          message: "City deleted successfully",
        });
      },
      onError: errorToast,
    });
  };

  return {
    getCities: useGetCities,
    createCity: useCreateCity,
    editCity: useEditCity,
    deleteCity: useDeleteCity,
  };
};
