import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { City } from "~/api/cities";
import { useCity } from "~/domains/cities/hooks";
import {
  CityFormValues,
  citySchema,
} from "~/domains/cities/schemas/citySchema.ts";
import { Input, Label, Message } from "~/ui";

interface CityEditProps {
  city: City;
  onSuccess: () => void;
}

export const CityEdit = ({ city, onSuccess }: CityEditProps) => {
  const { mutate: updateCity } = useCity().editCity();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      name: city.name,
    },
  });

  const onSubmit: SubmitHandler<CityFormValues> = (data) => {
    updateCity(
      { id: city.id, ...data },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label label="City Name" htmlFor="name" />
        <Input
          id="name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter city name"
        />
        {errors.name && <Message error={errors.name.message} />}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Update City
        </button>
      </div>
    </form>
  );
};
