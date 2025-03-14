import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AirlinesRouter } from "~/domains/airlines/AirlinesRouter.tsx";
import { CitiesRouter } from "~/domains/cities/CitiesRouter.tsx";
import { FlightsRouter } from "~/domains/flights/FlightsRouter.tsx";
import { NotFound } from "~/sections";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cities" element={<CitiesRouter />} />
        <Route path="/airlines" element={<AirlinesRouter />} />
        <Route path="/flights" element={<FlightsRouter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
