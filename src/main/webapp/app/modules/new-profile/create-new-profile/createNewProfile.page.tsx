/* eslint-disable prettier/prettier */
import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React from "react";
import { Translate, translate } from "react-jhipster";

const CreateNewProfilePage = () => {
    return (
        <div className="createNewProfilePage">
            <BreadcrumbComponent />
            {/* <div className="createProfileSteps" >
                <div className="createProfileStep">
                   <span>1</span>
                   <div>
                    <h4>انشاء ملف جديد</h4>
                    <p>قم انشاء ملف جديد (شركة / أفراد)</p>
                   </div>
                </div>
            </div> */}

            
            <div className="sdg_page">
                create New Profile Page
                {translate("home.subtitle")}
                <Translate contentKey="home.subtitle">This is your homepage</Translate>
            </div>
        </div>
    );
};

export default CreateNewProfilePage;
