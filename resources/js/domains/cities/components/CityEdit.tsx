import { City } from "~/api/cities";
import { CityForm } from "~/domains/cities/components/CityForm.tsx";
import { useCity } from "~/domains/cities/hooks";

interface EditCityProps {
  city: City;
  onSuccess?: () => void;
}

export const CityEdit = ({ city, onSuccess }: EditCityProps) => {
  const { mutate, isPending } = useCity().editCity();

  const handleSubmit = (data: { name: string }) => {
    mutate(
      { id: city.id, name: data.name },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  return (
    <CityForm
      onSubmit={handleSubmit}
      initialValues={{ name: city.name }}
      isPending={isPending}
    />
  );
};
