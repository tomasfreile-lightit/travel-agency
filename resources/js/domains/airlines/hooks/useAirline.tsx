import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAirline,
  deleteAirline,
  editAirline,
  getAirlines,
} from "~/api/airlines.ts";
import { AirlineFormValues } from "~/domains/airlines/schemas/airlineSchema.ts";
import { errorToast, useToastStore } from "~/ui";

export const useAirline = () => {
  const queryClient = useQueryClient();

  const { pushToast } = useToastStore();

  const useGetAirlines = (currentPage?: number, pageSize?: number) => {
    return useQuery({
      queryFn: () =>
        getAirlines({
          page: currentPage,
          perPage: pageSize,
        }),
      queryKey: [
        "getAirlines",
        {
          currentPage,
          pageSize,
        },
      ],
    });
  };

  const useCreateAirline = () => {
    return useMutation({
      mutationFn: (data: AirlineFormValues) => createAirline(data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getAirlines"],
        });
        void pushToast({
          type: "success",
          message: "Airline created successfully",
        });
      },
      onError: errorToast,
    });
  };

  const useEditAirline = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: number; data: AirlineFormValues }) =>
        editAirline(id, data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getAirlines"],
        });
        void pushToast({
          type: "success",
          message: "Airline updated successfully",
        });
      },
      onError: errorToast,
    });
  };

  const useDeleteAirline = () => {
    return useMutation({
      mutationFn: (id: number) => deleteAirline(id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getAirlines"],
        });
        void pushToast({
          type: "success",
          message: "Airline deleted successfully",
        });
      },
      onError: errorToast,
    });
  };

  return {
    getAirlines: useGetAirlines,
    createAirline: useCreateAirline,
    updateAirline: useEditAirline,
    deleteAirline: useDeleteAirline,
  };
};
