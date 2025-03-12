import { Route } from "react-router-dom";

import { RouterWrapper } from "~/router/components/RouterWrapper/RouterWrapper";
import { Cities } from "./screens/Cities";

export const CitiesRouter = () => {
  return (
    <RouterWrapper guest>
      <Route index element={<Cities />} />
    </RouterWrapper>
  );
};

export default CitiesRouter;
