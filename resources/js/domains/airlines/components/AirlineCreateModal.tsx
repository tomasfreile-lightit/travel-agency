import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { MultiCitySelect } from "~/domains/airlines/components/MultiCitySelect.tsx";
import { useAirline } from "~/domains/airlines/hooks";
import {
  AirlineFormValues,
  airlineSchema,
} from "~/domains/airlines/schemas/airlineSchema.ts";
import { Input, Label, Modal } from "~/ui";

interface AirlineCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AirlineCreateModal = ({
  isOpen,
  onClose,
}: AirlineCreateModalProps) => {
  const { mutate: createAirline } = useAirline().createAirline();
  const [selectedCities, setSelectedCities] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AirlineFormValues>({
    resolver: zodResolver(airlineSchema),
  });

  const onSubmit: SubmitHandler<AirlineFormValues> = (data) => {
    createAirline(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

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
            Create Airline
          </button>
        </div>
      </form>
    </Modal>
  );
};
