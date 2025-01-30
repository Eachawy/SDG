import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "app/modules/new-profile/Shared/createNewProfileSteps.component";

const SubfileDataSentPage = () => {
  const returnToMainMenuFn = () => {};

  return (
    <div className="subFileDataSentPage">
      <BreadcrumbComponent />
      <CreateNewProfileStepsComponent step={4} />
      <div className="sdg_page">
        <label className="serialNoSubNo">
          {translate("createNewProfile.serialAndSubNumber")}{" "}
          <span>1256543 / 10</span>
        </label>
        <div className="successMsg">
          <h4>{translate("subfileDataSent.successMessage")}</h4>
        </div>

        <h3>{translate("subfileDataSent.companyRepresentativeData")}</h3>

        <div className="companyRepDataDiv">
          <p>
            <label>{translate("subfileDataSent.clientEmail")}</label>
            ahmed@sdc.com
          </p>
          <p>
            <label>{translate("subfileDataSent.phoneNumber")}</label>
            +962534534433
          </p>
          <p>
            <label>{translate("subfileDataSent.transactionNumber")}</label>
            1256543-25
          </p>
        </div>
        <div className="actionBtns">
          <div onClick={returnToMainMenuFn} className="white_btnStyle">
            {translate("subfileDataSent.returnToMainMenu")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubfileDataSentPage;
