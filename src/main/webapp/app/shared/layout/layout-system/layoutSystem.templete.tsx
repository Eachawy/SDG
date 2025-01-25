/* eslint-disable prettier/prettier */
import ErrorBoundary from "app/shared/error/error-boundary";
import React, { Children } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import { useAppSelector } from "app/config/store";

const LayoutSystemTemplete = () => {
    const currentLocale = useAppSelector((state) => state.locale.currentLocale);
    return (
        <>
            <ErrorBoundary>
                <Header currentLocale={currentLocale} />
            </ErrorBoundary>
            <div className="container sdg_content"><Outlet /></div>
        </>
    );
};

export default LayoutSystemTemplete;
