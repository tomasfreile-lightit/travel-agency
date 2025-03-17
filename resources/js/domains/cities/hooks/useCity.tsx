import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createCity, deleteCity, editCity, getCities } from "~/api/cities.ts";
import { CityFormValues } from "~/domains/cities/schemas/citySchema.ts";
import { errorToast, useToastStore } from "~/ui";

export const useCity = () => {
  const queryClient = useQueryClient();

  const { pushToast } = useToastStore();

  const useGetCities = (
    searchQuery?: string,
    currentPage?: number,
    pageSize?: number,
  ) => {
    return useQuery({
      queryFn: () =>
        getCities({
          searchQuery,
          page: currentPage,
          perPage: pageSize,
        }),
      queryKey: [
        "getCities",
        {
          searchQuery,
          page: currentPage,
          perPage: pageSize,
        },
      ],
    });
  };

  const useCreateCity = () => {
    return useMutation({
      mutationFn: (data: CityFormValues) => createCity(data),
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
      mutationFn: ({ id, data }: { id: number; data: CityFormValues }) =>
        editCity(id, data),
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
