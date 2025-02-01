/* eslint-disable prettier/prettier */
import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "app/modules/new-profile/Shared/createNewProfileSteps.component";
import { useNavigate } from "react-router";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputComponent } from "@eachawy/frontend-library";
import { useForm } from "react-hook-form";

interface Country {
  name: string;
  code: string;
}

const DetermineResponsibilityAndFollowUpPage = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const navigate = useNavigate();

  const countryCode: Country[] = [
    { name: "+962", code: "ORD" },
    { name: "+20", code: "EGY" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    setValue("companyType", "corporateType");
  }, []);

  const handleValidationSuccess = (data: any) => {
    // console.log(data);
    navigate("/subfile-data-sent");
  };

  const nextFn = async () => {
    const isValid = await trigger(); 
    if (isValid) {
      handleSubmit(handleValidationSuccess)();
    }
  };

  const saveAndCloseFn = () => {};

  return (
    <div className="DetermineResponsibilityAndFollowUpPage">
      <BreadcrumbComponent />
      <CreateNewProfileStepsComponent step={3} />
      <div className="sdg_page">
        <label className="serialNoSubNo">
          {translate("createNewProfile.serialAndSubNumber")} <span>1256543 / 10</span>
        </label>
        <div className="successMsg">
          <h4>{translate("assignResponsibilityAndFollowUp.completionMessage")}</h4>
        </div>
        <h3>{translate("assignResponsibilityAndFollowUp.addCompanyRepresentative")}</h3>

        <div className="emailAndPhoneDiv">
          <InputComponent
            id="email"
            type="email"
            name="email"
            label={translate("createNewProfile.email")}
            placeholder={translate("loginPage.emailPlaceholder")}
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("email", e.target.value)}
            rules={{ required: 'You must enter your Email.' }}
          />
          <div>
            <label>
              {translate("createNewProfile.phoneNumber")}
              <span>*</span>
            </label>
            <div>
              <Dropdown
                value={selectedCountryCode}
                onChange={(e) => {
                  setSelectedCountryCode(e.value);
                  setValue("countryCode", e.value);
                }}
                options={countryCode}
                optionLabel="name"
                placeholder="+962"
                className="countryCode"
              />
              <InputText
                placeholder={translate("createNewProfile.exm") + "1234567"}
                className="nationalNoInput"
              />
            </div>
          </div>
        </div>

        <div className="actionBtns">
          <div onClick={saveAndCloseFn} className="BtnCancel">
            {translate("createNewProfile.saveAndClose")}
          </div>
          <div onClick={nextFn} className="btnStyle">
            {translate("assignResponsibilityAndFollowUp.sendToCompanyRepresentative")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetermineResponsibilityAndFollowUpPage;
