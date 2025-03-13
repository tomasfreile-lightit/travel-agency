import { CityForm } from "~/domains/cities/components/CityForm.tsx";
import { useCity } from "~/domains/cities/hooks";

export const CityCreate = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { mutate, isPending } = useCity().createCity();

  const handleSubmit = (data: { name: string }) => {
    mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return <CityForm onSubmit={handleSubmit} isPending={isPending} />;
};
