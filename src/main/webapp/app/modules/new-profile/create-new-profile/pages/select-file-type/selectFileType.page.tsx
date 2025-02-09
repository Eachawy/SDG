/* eslint-disable */
/*prettier-ignore */
import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useState } from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "../../../Shared/createNewProfileSteps.component";
import CompanySubFileData from "./shared/companySubFileData.component";
import { useNavigate } from "react-router";
import Lawsuits from "./shared/lawsuits.component";
import UrgentRequest from "./shared/urgentRequest.component";
import Collection from "./shared/collection/collection.component";
import LegalBonds from "./shared/collection/legalBonds/legalBonds.component";

const SelectFileTypePage = () => {

    const [triggerHandleSubmit, setTriggerHandleSubmit] = useState(0)
    const navigate = useNavigate();
    const saveAndCloseFn = () => {

    }

    const nextFn = () => {
        setTriggerHandleSubmit(t => t + 1);
    };

    const handleValidationResult = (_data) => {
        console.log("Form submitted:", _data);
        // navigate("/determine-responsibility-and-follow-up");
    };

    return (
        <div className="SelectFileTypePage">
            <BreadcrumbComponent />
            <CreateNewProfileStepsComponent step={2} />
            <div className="sdg_page ">
                <label className="serialNoSubNo">{translate("createNewProfile.serialAndSubNumber")} <span>1256543 / 10</span></label>
                <CompanySubFileData triggerHandleSubmit={triggerHandleSubmit} onValidationSuccess={handleValidationResult} />
                {true && <Lawsuits />}
                {true && <UrgentRequest />}
                {true && <Collection />}
                {true && <LegalBonds />}

                <div className="actionBtns">
                    <div onClick={saveAndCloseFn} className="BtnCancel">{translate("createNewProfile.saveAndClose")}</div>
                    <div onClick={() => { }} className="btnStyle _saveAndAdd">حفظ وإضافة</div>
                    <div onClick={nextFn} className="btnStyle">{translate("createNewProfile.next")}</div>
                </div>
            </div>
        </div>
    );
};

export default SelectFileTypePage;
