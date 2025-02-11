import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "app/modules/new-profile/Shared/createNewProfileSteps.component";
import { useNavigate } from "react-router";
import { ButtonComponent, DropDownComponent, InputComponent } from "@eachawy/frontend-library";
import { useForm } from "react-hook-form";
import { useAppSelector } from "app/config/store";
import { countryCode } from "app/shared/util/date-utils";

const DetermineResponsibilityAndFollowUpPage = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: "onTouched" });

  const lang = useAppSelector((state) => state.locale.currentLocale);

  const nextFn = (_data) => {
    if (_data) {
      navigate("/subfile-data-sent");
    }
  };

  const saveAndCloseFn = () => {
    navigate("/create-new-profile");
  };

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
                setValue={countryCode[0]}
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
          <ButtonComponent Class={'BtnCancel'} onClick={saveAndCloseFn}>{translate("createNewProfile.saveAndClose")}</ButtonComponent>
          <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(nextFn)}>{translate("assignResponsibilityAndFollowUp.sendToCompanyRepresentative")}</ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default DetermineResponsibilityAndFollowUpPage;
