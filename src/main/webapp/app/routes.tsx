import React from "react";
import { Route } from "react-router";

import Loadable from "react-loadable";

import Home from "app/modules/home/home";
import ErrorBoundaryRoutes from "app/shared/error/error-boundary-routes";
import PageNotFound from "app/shared/error/page-not-found";
import { AUTHORITIES } from "app/config/constants";

const loading = <div>loading ...</div>;

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route index element={<Home />} />
        {/* prettier-ignore */}
        {/*         
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="account">
          <Route
            path="*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<Activate />} />
          <Route path="reset">
            <Route path="request" element={<PasswordResetInit />} />
            <Route path="finish" element={<PasswordResetFinish />} />
          </Route>
        </Route>
        <Route
          path="admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <EntitiesRoutes />
            </PrivateRoute>
          }
        /> */}
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
