import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CitiesRouter from "~/domains/cities/cities/CitiesRouter.tsx";
import { NotFound } from "~/sections";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cities" element={<CitiesRouter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
