export const addFilterParams = (
  params: Record<string, any>,
  filters: Record<string, any>,
): Record<string, any> => {
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      params[`filter[${key}]`] = value;
    }
  }
  return params;
};
