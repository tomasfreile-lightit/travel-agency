import { Airline } from "~/api/airlines.ts";
import { ServiceResponse } from "~/api/api.types.ts";
import { api } from "~/api/axios.ts";
import { City } from "~/api/cities.ts";
import { FlightFormValues } from "~/domains/flights/schemas/flightSchema.ts";

export interface Flight {
  id: number;
  airline: Airline;
  originCity: City;
  destinationCity: City;
  departure: string;
  arrival: string;
}

export const createFlight = (data: FlightFormValues) => {
  return api.post("/flights", data);
};

export const getFlights = async ({ page = 1, perPage = 10 }) => {
  const params = {
    page,
    perPage,
  };

  const response = await api.get<ServiceResponse<Flight[]>>("/flights", {
    params,
  });

  return response.data;
};

export const deleteFlight = (id: number) => {
  return api.delete(`/flights/${id}`);
};
