import { Route } from "react-router-dom";

import { Airlines } from "~/domains/airlines/screens/Airlines.tsx";
import { RouterWrapper } from "~/router/components/RouterWrapper/RouterWrapper.tsx";

export const AirlinesRouter = () => {
  return (
    <RouterWrapper guest>
      <Route index element={<Airlines />} />
    </RouterWrapper>
  );
};
