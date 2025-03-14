import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";

import { useAirline } from "~/domains/airlines/hooks";
import {
  AirlineFormValues,
  airlineSchema,
} from "~/domains/airlines/schemas/airlineSchema.ts";
import { useCity } from "~/domains/cities/hooks";
import { Input, Label, Message, Modal } from "~/ui";

interface AirlineCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CityOption {
  value: number;
  label: string;
}

export const AirlineCreateModal = ({
  isOpen,
  onClose,
}: AirlineCreateModalProps) => {
  const { mutate: createAirline } = useAirline().createAirline();
  const [citySearchQuery, setCitySearchQuery] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AirlineFormValues>({
    resolver: zodResolver(airlineSchema),
  });

  const { data: citiesResponse, isLoading: isCitiesLoading } =
    useCity().getCities(1, 100, citySearchQuery);

  const cities = citiesResponse?.data || [];

  const handleCitySearch = (query: string) => {
    setCitySearchQuery(query);
  };

  const onSubmit: SubmitHandler<AirlineFormValues> = (data) => {
    createAirline(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const cityOptions: CityOption[] = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const handleCityChange = (newValue: MultiValue<CityOption>) => {
    if (newValue) {
      const selectedCityIds = newValue.map((option) => option.value);
      setValue("cities", selectedCityIds);
    } else {
      setValue("cities", []);
    }
  };

  const selectedCities = watch("cities") || [];

  return (
    <Modal show={isOpen} title="Create Airline" onClose={onClose}>
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
          {errors.cities && <Message error={errors.cities.message} />}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create Airline
          </button>
        </div>
      </form>
    </Modal>
  );
};
