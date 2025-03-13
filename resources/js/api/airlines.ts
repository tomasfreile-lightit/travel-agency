import { PaginationParams, ServiceResponse } from "~/api/api.types.ts";
import { api } from "~/api/axios.ts";

export interface Airline {
  id: number;
  name: string;
  description: string;
  number_of_flights: number;
  cities: string[];
}

export const getAirlines = async ({ page = 1 }: PaginationParams) => {
  const params = {
    page,
  };

  const response = await api.get<ServiceResponse<Airline[]>>("/airlines", {
    params,
  });

  return response.data;
};
