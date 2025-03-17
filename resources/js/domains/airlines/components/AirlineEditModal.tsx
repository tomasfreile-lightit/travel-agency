import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Airline } from "~/api/airlines";
import { MultiCitySelect } from "~/domains/airlines/components/MultiCitySelect.tsx";
import { useAirline } from "~/domains/airlines/hooks";
import {
  AirlineFormValues,
  airlineSchema,
} from "~/domains/airlines/schemas/airlineSchema.ts";
import { Input, Label, Modal } from "~/ui";

interface AirlineEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  airline: Airline;
}

export const AirlineEditModal = ({
  isOpen,
  onClose,
  airline,
}: AirlineEditModalProps) => {
  const { mutate: updateAirline } = useAirline().updateAirline();
  const [selectedCities, setSelectedCities] = useState<number[]>([]);

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

  useEffect(() => {
    reset({
      name: airline.name,
      description: airline.description,
      cities: airline.cities.map((city) => city.id),
    });
    setSelectedCities(airline.cities.map((city) => city.id));
  }, [airline, reset]);

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
          <MultiCitySelect
            value={selectedCities}
            onChange={(ids) => {
              setSelectedCities(ids);
              setValue("cities", ids);
            }}
            error={errors.cities?.message}
          />
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
