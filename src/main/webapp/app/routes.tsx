import React from "react";
import { Route } from "react-router";

import LoginPage from "app/modules/login/login.page";
import ErrorBoundaryRoutes from "app/shared/error/error-boundary-routes";
import PageNotFound from "app/shared/error/page-not-found";
import MainDashboardPage from "./modules/dashboard/main-dashboard.page";
import CreateNewProfilePage from "app/modules/new-profile/create-new-file/createNewProfile.page";
import LayoutSystemTemplete from "./shared/layout/layout-system/layoutSystem.templete";
import SelectFileType from "app/modules/new-profile/select-file-type/selectFileType.page";
import LegalBondsPage from "./modules/new-profile/legal-bonds-page/legalBonds.page";
import DetermineResponsibilityAndFollowUp from "./modules/new-profile/determine-responsibility-and-follow-up/determineResponsibilityAndFollowUp.page";
import SubfileDataSentPage from "./modules/new-profile/subfile-data-sent/subfileDataSent.page";
import PrivateRoute from "./shared/auth/private-route";
import { AUTHORITIES } from 'app/config/constants';
import ErrorPage from "./shared/error/error.page";
import MainPage from "./modules/dashboard/main-page/mainPage";
import { SearchByProfile } from "./modules/dashboard/search/search-by-profile/searchByProfile";



const AppRoutes = () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="" element={<LayoutSystemTemplete />} >

          <Route path="dashoard">

            <Route path="" element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <MainDashboardPage />
              </PrivateRoute>
            } />

            <Route path="main-page" element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <MainPage />
              </PrivateRoute>
            } />

            <Route path="search-by-profile" element={
              <PrivateRoute
                hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}
              >
                <SearchByProfile />
              </PrivateRoute>
            } />

          </Route>



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
              path="legal-bonds"
              element={
                <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                  <LegalBondsPage />
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
