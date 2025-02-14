import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "../../../Shared/createNewProfileSteps.component";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ButtonComponent, InputComponent, RadioButtonComponent, AttachmentMultiFilesComponent, AttachmentFileComponent } from "@eachawy/frontend-library";
import { useAppSelector } from "app/config/store";
import PhoneNumberComponent from "app/shared/components/phoneNumber.Component/phoneNumber.Component";



const CreateNewProfilePage = () => {

    const $lang = useAppSelector(state => state.locale.currentLocale);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched', });
    useEffect(() => {
        setValue('companyType', 'corporateType');
        console.log($lang);
    }, []);

    const saveAndCloseFn = () => { };

    const handleLogin = (data) => {
        const _data = {
            ...data,
            phoneNumber: data.countryCode.name + data.phoneNumber
        }
        console.log(_data);
        navigate("/select-file-type");
    };

    return (
        <div className="createNewProfilePage">
            <BreadcrumbComponent />
            <CreateNewProfileStepsComponent step={1} />
            <div className="sdg_page">
                <label className="serialNo">{translate("createNewProfile.serialNumber")}<span>1256543</span></label>

                <div className="radioButtonDiv">
                    <RadioButtonComponent
                        name="companyType"
                        label={translate("createNewProfile.companyTypeCorporate")}
                        register={register}
                        errors={errors}
                        value={'corporateType'}
                        watch={watch}
                        onChange={(e) => { setValue("companyType", e.value === 'corporateType' ? 'corporateType' : 'personalType'); }}
                        checked={getValues().companyType === 'corporateType'}
                    />
                    <RadioButtonComponent
                        name="companyType"
                        label={translate("createNewProfile.companyTypePersonal")}
                        register={register}
                        errors={errors}
                        value={'personalType'}
                        watch={watch}
                        onChange={(e) => { setValue("companyType", e.value === 'corporateType' ? 'corporateType' : 'personalType'); }}
                        checked={getValues().companyType === 'personalType'}
                    />
                </div>

                <div className="profileDataContainer">
                    <InputComponent
                        id="NameAr"
                        type="text"
                        name="NameAr"
                        label={
                            (getValues().companyType === 'corporateType') ?
                                translate("createNewProfile.companyNameAr") : translate("createNewProfile.personNameAr")}
                        placeholder={
                            (getValues().companyType === 'corporateType') ?
                                translate("createNewProfile.companyNameAr") : translate("createNewProfile.personNameAr")}
                        register={register}
                        rules={{ required: "يجب ادخال الاسم باللغة العربية" }}
                        errors={errors}
                        setValueMethod={setValue}
                        watch={watch}
                        onChange={(e) => {
                            const arabicOnly = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");
                            setValue("NameAr", arabicOnly);
                        }}
                    />
                    <InputComponent
                        id="NameEn"
                        type="text"
                        name="NameEn"
                        label={
                            (getValues().companyType === 'corporateType') ?
                                translate("createNewProfile.companyNameEn") : translate("createNewProfile.personNameEn")}
                        placeholder={
                            (getValues().companyType === 'corporateType') ?
                                translate("createNewProfile.companyNameEn") : translate("createNewProfile.personNameEn")}
                        register={register}
                        rules={{ required: 'يجب ادخال الاسم باللغة الإنجليزية' }}
                        errors={errors}
                        setValueMethod={setValue}
                        watch={watch}
                        onChange={(e) => {
                            const englishOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                            setValue("NameEn", englishOnly);
                        }}
                    />
                    <InputComponent
                        id="nationalNumber"
                        type="nationalNumber"
                        name="nationalNumber"
                        label={translate("createNewProfile.nationalNumber")}
                        placeholder={translate("createNewProfile.exm") + "1234567"}
                        register={register}
                        rules={{ required: 'يجب ادخال الرقم الوطني' }}
                        errors={errors}
                        setValueMethod={setValue}
                        watch={watch}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue("nationalNumber", numericValue);
                        }}
                    />
                    <InputComponent
                        id="address"
                        type="address"
                        name="address"
                        label={translate("createNewProfile.address")}
                        placeholder={translate("createNewProfile.enterTheAddress")}
                        register={register}
                        rules={{ required: 'يجب ادخال العنوان' }}
                        errors={errors}
                        setValueMethod={setValue}
                        watch={watch}
                        onChange={(e) => setValue("address", e.target.value)}
                    />

                    <PhoneNumberComponent register={register} errors={errors} watch={watch} setValue={setValue} />

                    <InputComponent
                        id="email"
                        type="email"
                        name="email"
                        label={translate("createNewProfile.email")}
                        placeholder={translate("loginPage.emailPlaceholder")}
                        register={register}
                        rules={{ required: 'يجب ادخال البريد الالكتروني' }}
                        errors={errors}
                        setValueMethod={setValue}
                        watch={watch}
                        onChange={(e) => setValue("email", e.target.value)}
                    />
                </div>

                <div className="uploaderContainer">
                    <h4>{translate("createNewProfile.attachments")}</h4>

                    <div className="row">
                        <AttachmentMultiFilesComponent
                            attachList={e => console.log(e)}
                            fileTypeList={[
                                { name: { en: 'file Type one', ar: 'نوع الملف الاول' }, code: 'one' },
                                { name: { en: 'file Type two', ar: 'نوع الملف الثاني' }, code: 'two' }
                            ]}
                            lang={$lang}
                            fileTypePlaceHolder={'Select a File Type'}
                        />
                        <AttachmentFileComponent
                            attachList={e => console.log(e)}
                            fileTypeList={[
                                { name: { en: 'file Type one', ar: 'نوع الملف الاول' }, code: 'one' },
                                { name: { en: 'file Type two', ar: 'نوع الملف الثاني' }, code: 'two' }
                            ]}
                            lang={$lang}
                            fileTypePlaceHolder={'Select a File Type'}
                        />
                    </div>

                </div>

                <div className="actionBtns">
                    <ButtonComponent Class={'BtnCancel'} onClick={saveAndCloseFn}>{translate("createNewProfile.saveAndClose")}</ButtonComponent>
                    <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(handleLogin)}>{translate("createNewProfile.next")}</ButtonComponent>
                </div>


            </div>
        </div>
    );
};

export default CreateNewProfilePage;
