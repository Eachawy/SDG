/* eslint-disable prettier/prettier */
import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "../../../Shared/createNewProfileSteps.component";
import CompanySubFileData from "./shared/companySubFileData.component";
import { useNavigate } from "react-router";

const SelectFileTypePage = () => {

    const navigate = useNavigate();

    const saveAndCloseFn = () => {

    }

    const nextFn = () => {
        navigate("/determine-responsibility-and-follow-up");
    }

    return (
        <div className="SelectFileTypePage">
            <BreadcrumbComponent />
            <CreateNewProfileStepsComponent step={2} />
            <div className="sdg_page ">
                <label className="serialNoSubNo">{translate("createNewProfile.serialAndSubNumber")} <span>1256543 / 10</span></label>
                <CompanySubFileData />

                <div className="actionBtns">
                    <div onClick={saveAndCloseFn} className="white_btnStyle">{translate("createNewProfile.saveAndClose")}</div>
                    <div onClick={nextFn} className="btnStyle">{translate("createNewProfile.next")}</div>
                </div>
            </div>
        </div>
    );
};

export default SelectFileTypePage;
