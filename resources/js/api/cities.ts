import { PaginationParams, ServiceResponse } from "~/api/api.types.ts";
import { api } from "~/api/axios.ts";
import { CityFormValues } from "~/domains/cities/schemas/citySchema.ts";
import { addFilterParams } from "~/shared/utils/addFilterParams.ts";

export interface City {
  id: number;
  name: string;
}

export const getCities = async ({
  page = 1,
  perPage = 10,
  searchQuery,
}: PaginationParams & { searchQuery?: string }) => {
  const params: Record<string, any> = {
    page,
    perPage,
  };

  if (searchQuery) {
    addFilterParams(params, { name: searchQuery });
  }

  const response = await api.get<ServiceResponse<City[]>>("/cities", {
    params,
  });

  return response.data;
};

export const createCity = (data: CityFormValues) => {
  return api.post("/cities", data);
};

export const editCity = (data: City) => {
  const { id, name } = data;
  return api.put(`/cities/${id}`, { name });
};

export const deleteCity = (id: number) => {
  return api.delete(`/cities/${id}`);
};
