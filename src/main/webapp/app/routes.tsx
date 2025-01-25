/* eslint-disable prettier/prettier */
import React from "react";
import { Route } from "react-router";

import LoginPage from "app/modules/login/login.page";
import ErrorBoundaryRoutes from "app/shared/error/error-boundary-routes";
import PageNotFound from "app/shared/error/page-not-found";
import CreateNewProfilePage from "app/modules/new-profile/create-new-profile/createNewProfile.page";
import LayoutSystemTemplete from "./shared/layout/layout-system/layoutSystem.templete";

const AppRoutes = () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        <Route index element={<LoginPage />} />

        <Route path="" element={<LayoutSystemTemplete />} >
          <Route
            path="/create-new-profile"
            element={<CreateNewProfilePage />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>

      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
