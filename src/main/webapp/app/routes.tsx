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
import MainDashboardPage from "./modules/dashboard/main-dashboard/main-dashboard.page";
import PrivateRoute from "./shared/auth/private-route";
import { AUTHORITIES } from 'app/config/constants';
import ErrorPage from "./shared/error/error.page";

const AppRoutes = () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="" element={<LayoutSystemTemplete />} >

          <Route path="dashoard" element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
              <MainDashboardPage />
            </PrivateRoute>  
            } />



          <Route path="create-file">
            <Route
              path="create-new-profile"
              element={
                <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                  <CreateNewProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="select-file-type"
              element={
                <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                  <SelectFileType />
                </PrivateRoute>
              }
            />

            <Route
              path="determine-responsibility-and-follow-up"
              element={
                <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                  <DetermineResponsibilityAndFollowUp />
                </PrivateRoute>
              }
            />

            <Route
              path="subfile-data-sent"
              element={
                <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                  <SubfileDataSentPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="error" element={<ErrorPage />} />
        </Route>

      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
