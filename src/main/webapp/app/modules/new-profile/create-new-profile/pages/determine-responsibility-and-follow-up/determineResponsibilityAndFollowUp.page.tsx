import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "app/modules/new-profile/Shared/createNewProfileSteps.component";
import { useNavigate } from "react-router";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DropDownComponent, InputComponent } from "@eachawy/frontend-library";
import { useForm } from "react-hook-form";
import { useAppSelector } from "app/config/store";

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

  const lang = useAppSelector((state) => state.locale.currentLocale);

  useEffect(() => {
    setValue("companyType", "corporateType");
  }, []);

  useEffect(() => {
    if (countryCode?.length > 0) {
      setValue("DRAFCountryCode", countryCode[0]);
    }
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

  const saveAndCloseFn = () => { };

  const selectedCountryCodeTemplate = (option) => {
    if (option) {
      return (
        <div className="countryCodeTemplate">
          <span className={`flag-icon flag-icon-${option.code.toLowerCase()} `}></span>
          <div>{option.name}</div>
        </div>
      );
    }
  };

  const countryCodeOptionTemplate = (option) => {
    return (
      <div className="countryCodeTemplate">
        <span className={`flag-icon flag-icon-${option.code.toLowerCase()} `}></span>
        <div>{option.name}</div>
      </div>
    );
  };

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
            id="DetermineResponsibilityAndFollowUpEmail-id"
            type="email"
            name="email"
            label={translate("createNewProfile.email")}
            placeholder={translate("loginPage.emailPlaceholder")}
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("email", e.target.value)}
            rules={{ required: 'يجب ادخال البريد الالكتروني' }}
          />
          {/* <div>
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
          </div> */}

          <div className="phoneNoDiv col-md-6">
            <label>رقم الهاتف <span>*</span></label>
            <div>
              <DropDownComponent
                id="DetermineResponsibilityAndFollowUpPhoneNumber-id"
                name="DRAFCountryCode"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={countryCode}
                optionLabel={`name.${lang}`}
                errors={errors}
                onChange={(e) => setValue("DRAFCountryCode", e.value)}
                value={watch("DRAFCountryCode")}
                valueTemplate={selectedCountryCodeTemplate}
                itemTemplate={countryCodeOptionTemplate}
              />

              <InputComponent
                id="DRAFPhoneNo-id"
                type="text"
                name="DRAFPhoneNo"
                placeholder="مثال: 1234567"
                register={register}
                errors={errors}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setValue("DRAFPhoneNo", numericValue);
                }}
                value={watch("DRAFPhoneNo")}
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
