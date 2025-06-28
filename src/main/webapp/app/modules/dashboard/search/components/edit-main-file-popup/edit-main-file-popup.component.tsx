import { RadioButtonComponent, InputComponent, AttachmentMultiFilesComponent, ButtonComponent } from '@eachawy/frontend-library';
import { useAppSelector } from 'app/config/store';
import PhoneNumberComponent from 'app/shared/components/phoneNumber.Component/phoneNumber.Component';
import React from 'react';
import { useForm } from 'react-hook-form';
import { translate } from 'react-jhipster';

export const EditMainProfilePopup = ({setShowPopup}) => {

    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched', });
    const $lang = useAppSelector(state => state.locale.currentLocale);
    const cancelFn = () => {
        setShowPopup(false)
    }
    const saveFn = () => {
    }

    return (

        <div className="popupView">
            <div className="container">
                <div className='header'>
                    {translate('search.serialNumber')}
                    <span>123456789</span>
                </div>
                <div className="content">
                    <div className="radioButtonDiv">
                        <RadioButtonComponent
                            name="profileType"
                            label={translate("createNewProfile.companyTypeCorporate")}
                            register={register}
                            errors={errors}
                            value={'corporateType'}
                            watch={watch}
                            onChange={() => setValue("profileType", "corporateType")}
                            checked={getValues().profileType === 'corporateType'}
                        />
                        <RadioButtonComponent
                            name="profileType"
                            label={translate("createNewProfile.companyTypePersonal")}
                            register={register}
                            errors={errors}
                            value={'personalType'}
                            watch={watch}
                            onChange={() => setValue("profileType", "personalType")}
                            checked={getValues().profileType === 'personalType'}
                        />
                    </div>

                    <div className="formDiv row g-4 mt-8">
                        <div className='col-md-6'>
                            <InputComponent
                                id="NameAr"
                                type="text"
                                name="NameAr"
                                label={
                                    (getValues().profileType === 'corporateType') ?
                                        translate("createNewProfile.companyNameAr") : translate("createNewProfile.personNameAr")}
                                placeholder={
                                    (getValues().profileType === 'corporateType') ?
                                        translate("createNewProfile.companyNameAr") : translate("createNewProfile.personNameAr")}
                                register={register}
                                // rules={{ required: translate("search.requiredField") }}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const arabicOnly = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");
                                    setValue("NameAr", arabicOnly);
                                }}
                            />
                        </div>
                        <div className='col-md-6'>
                            <InputComponent
                                id="NameEn"
                                type="text"
                                name="NameEn"
                                label={
                                    (getValues().profileType === 'corporateType') ?
                                        translate("createNewProfile.companyNameEn") : translate("createNewProfile.personNameEn")}
                                placeholder={
                                    (getValues().profileType === 'corporateType') ?
                                        translate("createNewProfile.companyNameEn") : translate("createNewProfile.personNameEn")}
                                register={register}
                                // rules={{ required: translate("search.requiredField") }}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const englishOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                                    setValue("NameEn", englishOnly);
                                }}
                                Class={'col-md-6'}
                            />
                        </div>
                        <div className='col-md-6'>
                            <InputComponent
                                id="nationalNumber"
                                type="nationalNumber"
                                name="nationalNumber"
                                label={translate("createNewProfile.nationalNumber")}
                                placeholder={translate("createNewProfile.exm") + "1234567"}
                                register={register}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                    setValue("nationalNumber", numericValue);
                                }}
                                Class={'col-md-6'}
                            />
                        </div>
                        <div className='col-md-6'>
                            <InputComponent
                                id="address"
                                type="address"
                                name="address"
                                label={translate("createNewProfile.address")}
                                placeholder={translate("createNewProfile.enterTheAddress")}
                                register={register}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("address", e.target.value)}
                                Class={'col-md-6'}
                            />
                        </div>
                        <div className='col-md-6'>
                            <PhoneNumberComponent
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                Class={'col-md-6'}
                            />
                        </div>
                        <div className='col-md-6'>
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
                                Class={'col-md-6'}
                            />
                        </div>
                    </div>

                    <div className="uploaderContainer">
                        <h4>{translate("createNewProfile.attachments")}</h4>
                        <div className="row mb-4">
                            <AttachmentMultiFilesComponent
                                name={"attach1"}
                                attachList={(e) => setValue("attach1", e)}
                                lang={$lang}
                                register={register}
                                watch={watch}
                                setValueMethod={setValue}
                                fileTypePlaceHolder={'Select a File Type'}
                                Class="col-md-12 col-lg-6"
                            />
                        </div>
                    </div>
                </div>

                <div className="popupFooter">
                    <ButtonComponent Class={'BtnCancel'} onClick={cancelFn}>{translate("search.close")}</ButtonComponent>
                    <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(saveFn)}>{translate("search.save")}</ButtonComponent>
                </div>
            </div>
        </div>
    )
}