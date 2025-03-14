import { PaginationParams, ServiceResponse } from "~/api/api.types.ts";
import { api } from "~/api/axios.ts";
import { AirlineFormValues } from "~/domains/airlines/schemas/airlineSchema.ts";

export interface Airline {
  id: number;
  name: string;
  description: string;
  number_of_flights: number;
  cities: number[];
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

export const createAirline = (data: AirlineFormValues) => {
  return api.post("/airlines", data);
};

export const editAirline = (id: number, data: AirlineFormValues) => {
  return api.put(`/airlines/${id}`, data);
};

export const deleteAirline = (id: number) => {
  return api.delete(`/airlines/${id}`);
};
