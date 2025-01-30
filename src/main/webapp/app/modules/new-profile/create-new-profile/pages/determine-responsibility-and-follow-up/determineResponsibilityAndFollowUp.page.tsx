import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useState } from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "app/modules/new-profile/Shared/createNewProfileSteps.component";
import { useNavigate } from "react-router";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

interface Country {
  name: string;
  code: string;
}

const DetermineResponsibilityAndFollowUpPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const countryCode: Country[] = [
    { name: "+962", code: "ORD" },
    { name: "+20", code: "EGY" },
  ];

  const navigate = useNavigate();

  const saveAndCloseFn = () => {};

  const nextFn = () => {
    navigate("/subfile-data-sent");
  };

  return (
    <div className="DetermineResponsibilityAndFollowUpPage">
      <BreadcrumbComponent />
      <CreateNewProfileStepsComponent step={3} />
      <div className="sdg_page">
        <label className="serialNoSubNo">
          {translate("createNewProfile.serialAndSubNumber")}{" "}
          <span>1256543 / 10</span>
        </label>
        <div className="successMsg">
          <h4>
            {translate("assignResponsibilityAndFollowUp.completionMessage")}
          </h4>
        </div>
        <h3>
          {translate(
            "assignResponsibilityAndFollowUp.addCompanyRepresentative",
          )}
        </h3>
        <div className="emailAndPhoneDiv">
          <div>
            <label>
              {translate("createNewProfile.email")}
              <span>*</span>
            </label>
            <InputText
              placeholder={translate("loginPage.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>
              {translate("createNewProfile.phoneNumber")}
              <span>*</span>
            </label>
            <div>
              <Dropdown
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.value)}
                options={countryCode}
                optionLabel="name"
                placeholder="+962"
                className="countryCode"
              />
              <InputText
                placeholder={translate("createNewProfile.exm") + "1234567"}
                className="nationalNoInput"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="actionBtns">
          <div onClick={saveAndCloseFn} className="white_btnStyle">
            {translate("createNewProfile.saveAndClose")}
          </div>
          <div onClick={nextFn} className="btnStyle">
            {translate(
              "assignResponsibilityAndFollowUp.sendToCompanyRepresentative",
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetermineResponsibilityAndFollowUpPage;
