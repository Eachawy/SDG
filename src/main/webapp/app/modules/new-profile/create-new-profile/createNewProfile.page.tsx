/* eslint-disable prettier/prettier */
import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React from "react";
import { Translate, translate } from "react-jhipster";

const CreateNewProfilePage = () => {
    return (
        <div>
            <BreadcrumbComponent />
            <div className="sdg_page">
                create New Profile Page
                {translate("home.subtitle")}
                <Translate contentKey="home.subtitle">This is your homepage</Translate>
            </div>
        </div>
    );
};

export default CreateNewProfilePage;
