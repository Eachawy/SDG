/* eslint-disable prettier/prettier */
import React from "react";
import "./breadcrumb.Component.scss";

const BreadcrumbComponent = props => {
    return (
        <div className="breadcrumbComponent">
            <ul>
                <li><span className="home" /></li>
                <li><a href="#">اضافة شركة</a></li>
                <li><a href="#">اضافة شركة</a></li>
                <li>اضافة شركة</li>
            </ul>
        </div>
    );
};

export default BreadcrumbComponent;