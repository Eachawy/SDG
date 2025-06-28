import { InputComponent, AttachmentMultiFilesComponent, ButtonComponent } from '@eachawy/frontend-library';
import { useAppSelector } from 'app/config/store';
import PhoneNumberComponent from 'app/shared/components/phoneNumber.Component/phoneNumber.Component';
import React from 'react';
import { useForm } from 'react-hook-form';
import { translate } from 'react-jhipster';

export const EditDefendantProfilePopup = ({ setShowPopup }) => {

    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched' });
    const $lang = useAppSelector(state => state.locale.currentLocale);
    const cancelFn = () => {
        setShowPopup(false);
    };
    const saveFn = () => {
    };

    return (
        <div className="popupView">
            <div className="container">
                <h4 className='popupHeader'>{translate('search.defendantData')}</h4>

                <div className="content">
                    <div className="formDiv row g-4 mt-8">

                        <div className='col-md-6'>
                            <InputComponent
                                id="defendantNameAr"
                                type="text"
                                name="defendantNameAr"
                                label={translate("createNewProfile.personNameAr")}
                                placeholder={translate("createNewProfile.personNameAr")}
                                register={register}
                                errors={errors}
                                rules={{ required: translate("search.requiredField") }}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const arabicOnly = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");
                                    setValue("defendantNameAr", arabicOnly);
                                }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="defendantNameEn"
                                type="text"
                                name="defendantNameEn"
                                label={translate("createNewProfile.personNameEn")}
                                placeholder={translate("createNewProfile.personNameEn")}
                                register={register}
                                errors={errors}
                                rules={{ required: translate("search.requiredField") }}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const englishOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                                    setValue("defendantNameEn", englishOnly);
                                }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="nationalNumber"
                                type="text"
                                name="nationalNumber"
                                label={translate("createNewProfile.nationalNumber")}
                                placeholder={translate("createNewProfile.exm") + "1234567"}
                                register={register}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                    setValue("nationalNumber", numericValue);
                                }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="defendantAddress1"
                                type="text"
                                name="defendantAddress1"
                                label={translate("search.address1")}
                                placeholder={translate("createNewProfile.enterTheAddress")}
                                register={register}
                                errors={errors}
                                rules={{ required: translate("search.requiredField") }}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("defendantAddress1", e.target.value)}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="defendantAddress2"
                                type="text"
                                name="defendantAddress2"
                                label={translate("search.address2")}
                                placeholder={translate("createNewProfile.enterTheAddress")}
                                register={register}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("defendantAddress2", e.target.value)}
                            />
                        </div>

                        <div className='col-md-6'>
                            <PhoneNumberComponent
                                name="phoneNumber1"
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                label={translate('search.phoneNumber1')}
                                rules={{ required: translate("search.requiredField") }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <PhoneNumberComponent
                                name="phoneNumber2"
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                label={translate('search.phoneNumber2')}
                                rules={{ required: translate("search.requiredField") }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <PhoneNumberComponent
                                name="phoneNumber3"
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                label={translate('search.phoneNumber3')}
                                rules={{ required: translate("search.requiredField") }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="defendantEmail"
                                type="email"
                                name="defendantEmail"
                                label={translate("search.email")}
                                placeholder={translate("loginPage.emailPlaceholder")}
                                register={register}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("defendantEmail", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="uploaderContainer">
                        <h4>{translate("createNewProfile.attachments")}</h4>
                        <div className="row mb-4">
                            <AttachmentMultiFilesComponent
                                name={"defendantAttach"}
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
    );
}

