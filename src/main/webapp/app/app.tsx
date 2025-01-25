import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import "app/config/dayjs";

import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { getSession } from "app/shared/reducers/authentication";
import Header from "app/shared/layout/header/header";
import ErrorBoundary from "app/shared/error/error-boundary";
import AppRoutes from "app/routes";
import { setTextDirection } from "./config/translation";

const baseHref = document
  .querySelector("base")
  .getAttribute("href")
  .replace(/\/$/, "");

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
  }, []);

  const currentLocale = useAppSelector((state) => state.locale.currentLocale);

  useEffect(() => {
    setTextDirection(currentLocale);
  }, [currentLocale]);

  return (
    <BrowserRouter basename={baseHref}>
      <div className="sdg-container">
        <ToastContainer
          position="top-left"
          className="toastify-container"
          toastClassName="toastify-toast"
        />
        <ErrorBoundary>
          <Header currentLocale={currentLocale} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
