import { Route } from "react-router-dom";

import { Flights } from "~/domains/flights/screens/Flights.tsx";
import { RouterWrapper } from "~/router/components/RouterWrapper/RouterWrapper.tsx";

export const FlightsRouter = () => {
  return (
    <RouterWrapper guest>
      <Route index element={<Flights />} />
    </RouterWrapper>
  );
};
