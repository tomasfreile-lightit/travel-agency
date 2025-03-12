import { PaginationParams, ServiceResponse } from "~/api/api.types.ts";
import { api } from "~/api/axios.ts";

export interface City {
  id: number;
  name: string;
}

export const getCities = async ({ page = 1 }: PaginationParams) => {
  const params = {
    page,
  };

  const response = await api.get<ServiceResponse<City[]>>("/cities", {
    params,
  });

  return response.data;
};
