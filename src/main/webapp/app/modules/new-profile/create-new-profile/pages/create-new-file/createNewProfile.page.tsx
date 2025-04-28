import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "../../../Shared/createNewProfileSteps.component";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ButtonComponent, InputComponent, RadioButtonComponent, AttachmentMultiFilesComponent, AttachmentFileComponent } from "@eachawy/frontend-library";
import { useAppDispatch, useAppSelector } from "app/config/store";
import PhoneNumberComponent from "app/shared/components/phoneNumber.Component/phoneNumber.Component";
import { CreateNewProfile } from "./createNewProfile.reducer";
import LoaderComponent from "app/modules/shared/loaderComponent/loaderComponent";
import { Storage } from "react-jhipster";
import { reset } from "../select-file-type/select-file-type.reducer";

const CreateNewProfilePage = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [isSaveClose, setIsSaveClose] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const $lang = useAppSelector(state => state.locale.currentLocale);
    const $fileNumber = useAppSelector(state => state.createProfile.fileNumber);

    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched', });

    useEffect(() => {
      dispatch(reset());
    }, [])
    
    
    useEffect(() => {
        setValue('companyType', 'corporateType');

        if ($fileNumber) {
            if (isSaveClose) {
                navigate("/dashoard");
            } else {
                Storage.session.set("fileNumber", $fileNumber);
                navigate("/create-file/select-file-type");
            }
        }
    }, [$fileNumber]);

    const saveAndCloseFn = (data) => {
        setIsSaveClose(true);
        restructureObject(data);

    };

    const createProfile = (data) => {
        setIsSaveClose(false);
        restructureObject(data);
    };


    const restructureObject = async (data: any) => {
        setShowLoader(true);
        const _data = {
            company: data.companyType === 'corporateType' ? true : false,
            arabicName: data.NameAr,
            englishName: data.NameEn,
            ssn: data.nationalNumber,
            address: data.address,
            email: data.email,
            mobileNumber: data.countryCode.name + data.phoneNumber,
            attachments: [
                {
                    "attachmentType": "MASTER_FILE_ATTACHMENT",
                    "name": data.attach_1?.name,
                    "content": data.attach_1?.base64,
                    "mimeType": "PDF"
                },
                {
                    "attachmentType": "MASTER_FILE_ATTACHMENT",
                    "name": data.attach_2?.name,
                    "content": data.attach_2?.base64,
                    "mimeType": "PDF"
                },
            ]
        }

        Storage.session.set("isCompany", data.companyType === 'corporateType' ? true : false);
        Storage.session.set("applicantName", { en: data.NameEn, ar: data.NameAr });

        // Call API
        await dispatch(CreateNewProfile(_data));
        setShowLoader(false);
    }

    return (
        <div className="createNewProfilePage">
            <BreadcrumbComponent />
            <LoaderComponent show={showLoader} />
            <CreateNewProfileStepsComponent step={1} />
            <div className="sdg_page">
                {/* <label className="serialNo">{translate("createNewProfile.serialNumber")}<span>1256543</span></label> */}

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
                        // rules={{ required: 'يجب ادخال الرقم الوطني' }}
                        // errors={errors}
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
                        // rules={{ required: 'يجب ادخال العنوان' }}
                        // errors={errors}
                        setValueMethod={setValue}
                        watch={watch}
                        onChange={(e) => setValue("address", e.target.value)}
                    />

                    <PhoneNumberComponent
                        register={register}
                        // errors={errors} 
                        // rules={{ required: 'يجب ادخال رقم الهاتف' }}
                        watch={watch}
                        setValue={setValue}
                    />

                    <InputComponent
                        id="email"
                        type="email"
                        name="email"
                        label={translate("createNewProfile.email")}
                        placeholder={translate("loginPage.emailPlaceholder")}
                        register={register}
                        // rules={{ required: 'يجب ادخال البريد الالكتروني' }}
                        // errors={errors}
                        setValueMethod={setValue}
                        watch={watch}
                        onChange={(e) => setValue("email", e.target.value)}
                    />
                </div>

                <div className="uploaderContainer">
                    <h4>{translate("createNewProfile.attachments")}</h4>
                    <div className="row">
                        <AttachmentFileComponent
                            id="attach_1"
                            name="attach_1"
                            lang={$lang}
                            register={register}
                            watch={watch}
                            // rules={{ required: 'يجب ادخال المىفقات' }}
                            // errors={errors}
                            setValueMethod={setValue}
                            attachList={(e) => setValue("attach_1", e)}
                        />
                        <AttachmentFileComponent
                            id="attach_2"
                            name="attach_2"
                            lang={$lang}
                            register={register}
                            watch={watch}
                            // rules={{ required: 'يجب ادخال المىفقات' }}
                            // errors={errors}
                            setValueMethod={setValue}
                            attachList={(e) => setValue("attach_2", e)}
                        />
                    </div>

                </div>

                <div className="actionBtns">
                    <ButtonComponent Class={'BtnCancel'} onClick={handleSubmit(saveAndCloseFn)}>{translate("createNewProfile.saveAndClose")}</ButtonComponent>
                    <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(createProfile)}>{translate("createNewProfile.next")}</ButtonComponent>
                </div>


            </div>
        </div>
    );
};

export default CreateNewProfilePage;
