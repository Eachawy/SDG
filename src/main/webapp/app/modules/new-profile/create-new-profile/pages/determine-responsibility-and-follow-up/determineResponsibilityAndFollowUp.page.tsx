import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "app/modules/new-profile/Shared/createNewProfileSteps.component";
import { useNavigate } from "react-router";
import { ButtonComponent, DropDownComponent, InputComponent } from "@eachawy/frontend-library";
import { useForm } from "react-hook-form";
import { useAppSelector } from "app/config/store";
import PhoneNumberComponent from "app/shared/components/phoneNumber.Component/phoneNumber.Component";

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
      navigate("/create-file/subfile-data-sent");
    }
  };

  const saveAndCloseFn = () => {
    navigate("/create-file/create-new-profile");
  };

  return (
    <div className="DetermineResponsibilityAndFollowUpPage">
      <BreadcrumbComponent
        links={[
          {
              id: 'PAGE1',
              name: {
                  en: 'Add Company or Individual',
                  ar: 'اضافة شركة أو شخص',
              },
          },
          {
              id: 'PAGE2',
              name: {
                  en: 'Select File Type',
                  ar: 'اختيار نوع الملف',
              },
          },
          {
            id: 'PAGE3',
            name: {
                en: 'Determine Responsibility and followup',
                ar: 'تحديد المسؤولية والمتابعة',
            },
        }
      ]} 
      />
      <CreateNewProfileStepsComponent step={3} />
      <div className="sdg_page">
        <label className="serialNoSubNo">
          {translate("createNewProfile.serial")} <span>1256543</span>
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

          <PhoneNumberComponent register={register} errors={errors} watch={watch} setValue={setValue} />

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
