import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createFlight, deleteFlight, getFlights } from "~/api/flights.ts";
import { FlightFormValues } from "~/domains/flights/schemas/flightSchema.ts";
import { errorToast, useToastStore } from "~/ui";

export const useFlight = () => {
  const queryClient = useQueryClient();

  const { pushToast } = useToastStore();

  const useGetFlights = (currentPage: number, pageSize: number) => {
    return useQuery({
      queryFn: () =>
        getFlights({
          page: currentPage,
          perPage: pageSize,
        }),
      queryKey: [
        "getFlights",
        {
          page: currentPage,
          pageSize,
        },
      ],
    });
  };

  const useCreateFlight = () => {
    return useMutation({
      mutationFn: (data: FlightFormValues) => createFlight(data),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getFlights"],
        });
        void pushToast({
          type: "success",
          message: "Flight created successfully",
        });
      },
      onError: errorToast,
    });
  };

  const useDeleteFlight = () => {
    return useMutation({
      mutationFn: (id: number) => deleteFlight(id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getFlights"],
        });
        void pushToast({
          type: "success",
          message: "Flight deleted successfully",
        });
      },
      onError: errorToast,
    });
  };

  return {
    createFlight: useCreateFlight,
    getFlights: useGetFlights,
    deleteFlight: useDeleteFlight,
  };
};
