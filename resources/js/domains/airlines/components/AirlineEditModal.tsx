import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";

import { Airline } from "~/api/airlines";
import { useAirline } from "~/domains/airlines/hooks";
import {
  AirlineFormValues,
  airlineSchema,
} from "~/domains/airlines/schemas/airlineSchema.ts";
import { useCity } from "~/domains/cities/hooks";
import { Input, Label, Modal } from "~/ui";

interface AirlineEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  airline: Airline;
}

interface CityOption {
  value: number;
  label: string;
}

export const AirlineEditModal = ({
  isOpen,
  onClose,
  airline,
}: AirlineEditModalProps) => {
  const { mutate: updateAirline } = useAirline().updateAirline();
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [selectedCities, setSelectedCities] = useState<number[]>(
    airline.cities.map((city) => city.id),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AirlineFormValues>({
    resolver: zodResolver(airlineSchema),
    defaultValues: {
      name: airline.name,
      description: airline.description,
      cities: airline.cities.map((city) => city.id),
    },
  });

  const { data: citiesResponse, isLoading: isCitiesLoading } =
    useCity().getCities(1, 100, citySearchQuery);

  const cities = citiesResponse?.data || [];

  useEffect(() => {
    reset({
      name: airline.name,
      description: airline.description,
      cities: airline.cities.map((city) => city.id),
    });
    setSelectedCities(airline.cities.map((city) => city.id));
  }, [airline, reset]);

  const handleCitySearch = (query: string) => {
    setCitySearchQuery(query);
  };

  const onSubmit: SubmitHandler<AirlineFormValues> = (data) => {
    updateAirline(
      { id: airline.id, data },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const cityOptions: CityOption[] = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const handleCityChange = (newValue: MultiValue<CityOption>) => {
    if (newValue) {
      const selectedCityIds = newValue.map((option) => option.value);
      setSelectedCities(selectedCityIds);
      setValue("cities", selectedCityIds);
    } else {
      setSelectedCities([]);
      setValue("cities", []);
    }
  };

  return (
    <Modal show={isOpen} title="Edit Airline" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label label="Airline Name" htmlFor="name" />
          <Input
            id="name"
            {...register("name")}
            error={errors.name?.message}
            placeholder="Enter airline name"
          />
        </div>

        <div>
          <Label label="Description" htmlFor="description" />
          <Input
            id="description"
            {...register("description")}
            error={errors.description?.message}
            placeholder="Enter description"
          />
        </div>

        <div>
          <Label label="Cities" htmlFor="cities" />
          <Select
            id="cities"
            isMulti
            options={cityOptions}
            isLoading={isCitiesLoading}
            onInputChange={handleCitySearch}
            onChange={handleCityChange}
            value={cityOptions.filter((option) =>
              selectedCities.includes(option.value),
            )}
            placeholder="Search and select cities"
            styles={{
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "#007bff"
                  : state.isFocused
                    ? "#f0f0f0"
                    : "white",
                color: state.isSelected ? "white" : "black",
                ":hover": {
                  backgroundColor: "#007bff",
                  color: "white",
                },
              }),
            }}
          />
          {isCitiesLoading && <p>Loading cities...</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Update Airline
          </button>
        </div>
      </form>
    </Modal>
  );
};
