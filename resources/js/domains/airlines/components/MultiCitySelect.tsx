import { useState } from "react";
import Select, { MultiValue } from "react-select";

import { useCity } from "~/domains/cities/hooks";
import { useDebounce } from "~/shared/hooks/useDebounce.ts";
import { Message } from "~/ui";

interface CityOption {
  value: number;
  label: string;
}

interface MultiCitySelectProps {
  value: number[];
  onChange: (cityIds: number[]) => void;
  error?: string;
}

export const MultiCitySelect = ({
  value,
  onChange,
  error,
}: MultiCitySelectProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery);
  const { data: citiesResponse, isLoading } =
    useCity().getCities(debounceSearchQuery);

  const cities = citiesResponse?.data || [];

  const cityOptions: CityOption[] = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const handleInputChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleChange = (newValue: MultiValue<CityOption>) => {
    const selectedCityIds = newValue
      ? newValue.map((option) => option.value)
      : [];
    onChange(selectedCityIds);
  };

  const selectedOptions = cityOptions.filter((option) =>
    value.includes(option.value),
  );

  return (
    <div>
      <Select
        id="cities"
        isMulti
        options={cityOptions}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onChange={handleChange}
        value={selectedOptions}
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
      {error && <Message error={error} />}
    </div>
  );
};
