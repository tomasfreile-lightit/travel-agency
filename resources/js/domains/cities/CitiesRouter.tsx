import { Route } from "react-router-dom";

import { Cities } from "~/domains/cities/screens/Cities.tsx";
import { RouterWrapper } from "~/router/components/RouterWrapper/RouterWrapper.tsx";

export const CitiesRouter = () => {
  return (
    <RouterWrapper guest>
      <Route index element={<Cities />} />
    </RouterWrapper>
  );
};
