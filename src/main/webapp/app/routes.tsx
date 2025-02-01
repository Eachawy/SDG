/* eslint-disable prettier/prettier */
import React from "react";
import { Route } from "react-router";

import LoginPage from "app/modules/login/login.page";
import ErrorBoundaryRoutes from "app/shared/error/error-boundary-routes";
import PageNotFound from "app/shared/error/page-not-found";
import CreateNewProfilePage from "app/modules/new-profile/create-new-profile/pages/create-new-file/createNewProfile.page";
import LayoutSystemTemplete from "./shared/layout/layout-system/layoutSystem.templete";
import SelectFileType from "app/modules/new-profile/create-new-profile/pages/select-file-type/selectFileType.page";
import DetermineResponsibilityAndFollowUp from "./modules/new-profile/create-new-profile/pages/determine-responsibility-and-follow-up/determineResponsibilityAndFollowUp.page";
import SubfileDataSentPage from "./modules/new-profile/create-new-profile/pages/subfile-data-sent/subfileDataSent.page";

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
          <Route
            path="/select-file-type"
            element={<SelectFileType />}
          />

          <Route
            path="/determine-responsibility-and-follow-up"
            element={<DetermineResponsibilityAndFollowUp />}
          />

          <Route
            path="/subfile-data-sent"
            element={<SubfileDataSentPage />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>

      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
