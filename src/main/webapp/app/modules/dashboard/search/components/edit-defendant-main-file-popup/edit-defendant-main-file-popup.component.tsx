import { InputComponent, ButtonComponent } from '@eachawy/frontend-library';
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import PhoneNumberComponent from 'app/shared/components/phoneNumber.Component/phoneNumber.Component';
import { getCountryCodeObj, removeCountryCode } from 'app/shared/util/utils';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { translate } from 'react-jhipster';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { editPerson, handleResetEditPerson } from 'app/modules/dashboard/dashboard.reducer';

export const EditDefendantProfilePopup = ({ setShowPopup, personData }) => {

    const dispatch = useAppDispatch();
    const [showLoader, setShowLoader] = React.useState(false);
    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched' });
    
    const $lang = useAppSelector(state => state.locale.currentLocale);
    const $editPersonResponse = useAppSelector((state) => state.dashboard.editPersonResponse);
    
    useEffect(() => {
        
        handleEditMode();
    }, []);

    useEffect(() => {
        if ($editPersonResponse) {
            setShowLoader(false);
            dispatch(handleResetEditPerson());
            setShowPopup(false);
        }
    }, [$editPersonResponse]);

    const handleEditMode = () => {
        setValue('personNameEN', personData?.nameEnglish);
        setValue('personNameAR', personData?.nameArabic);
        setValue('personNationlId', personData?.nationalId);
        setValue('personAddress1', personData?.addressOne);
        setValue('personAddress2', personData?.addressTwo ?? '');
        setValue('personCode1', getCountryCodeObj(personData?.mobileOne));
        setValue('personCode2', getCountryCodeObj(personData?.mobileTwo));
        setValue('personCode3', getCountryCodeObj(personData?.mobileThree));
        setValue('personPhone1', personData?.mobileOne ? Number(removeCountryCode(personData?.mobileOne)) : null);
        setValue('personPhone2', personData?.mobileTwo ? Number(removeCountryCode(personData?.mobileTwo)) : null);
        setValue('personPhone3', personData?.mobileThree ? Number(removeCountryCode(personData?.mobileThree)) : null);
        setValue('personEmail', personData?.email ?? null);
    }

    const cancelFn = () => {
        setShowPopup(false);
    };
    const saveFn = async (data) => {
        setShowLoader(true);
        const obj = {
            id: personData?.id,
            nameArabic: data.personNameAR,
            nameEnglish: data.personNameEN,
            nationalId: Number(data.personNationlId),
            addressOne: data.personAddress1,
            addressTwo: data.personAddress2,
            mobileOne: Number(data.personCode1?.name + data.personPhone1),
            mobileTwo: Number(data.personCode2?.name + data.personPhone2),
            mobileThree: Number(data.personCode3?.name + data.personPhone3),
            email: data.personEmail
        }

        // Call API
        await dispatch(editPerson(obj));
        setShowLoader(false);
    };

    return (
        <div className="popupView">
            <div className="container">
                <h4 className='popupHeader'>{translate('search.defendantData')}</h4>

                <div className="content">
                    <div className="formDiv row g-4 mt-8">

                        <div className='col-md-6'>
                            <InputComponent
                                id="personNameAR"
                                type="text"
                                name="personNameAR"
                                label={translate("createNewProfile.personNameAr")}
                                placeholder={translate("createNewProfile.personNameAr")}
                                register={register}
                                errors={errors}
                                rules={{ required: translate("search.requiredField") }}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const arabicOnly = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");
                                    setValue("personNameAR", arabicOnly);
                                }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="personNameEN"
                                type="text"
                                name="personNameEN"
                                label={translate("createNewProfile.personNameEn")}
                                placeholder={translate("createNewProfile.personNameEn")}
                                register={register}
                                errors={errors}
                                rules={{ required: translate("search.requiredField") }}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const englishOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                                    setValue("personNameEN", englishOnly);
                                }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="personNationlId"
                                type="text"
                                name="personNationlId"
                                label={translate("createNewProfile.nationalNumber")}
                                placeholder={translate("createNewProfile.exm") + "1234567"}
                                register={register}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                    setValue("personNationlId", numericValue);
                                }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="personAddress1"
                                type="text"
                                name="personAddress1"
                                label={translate("search.address1")}
                                placeholder={translate("createNewProfile.enterTheAddress")}
                                register={register}
                                errors={errors}
                                rules={{ required: translate("search.requiredField") }}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("personAddress1", e.target.value)}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="personAddress2"
                                type="text"
                                name="personAddress2"
                                label={translate("search.address2")}
                                placeholder={translate("createNewProfile.enterTheAddress")}
                                register={register}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("personAddress2", e.target.value)}
                            />
                        </div>

                        <div className='col-md-6'>
                            <PhoneNumberComponent
                                name="personPhone1"
                                listName="personCode1"
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                label={translate('search.phoneNumber1')}
                                // rules={{ required: translate("search.requiredField") }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <PhoneNumberComponent
                                name="personPhone2"
                                listName="personCode2"
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                label={translate('search.phoneNumber2')}
                                // rules={{ required: translate("search.requiredField") }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <PhoneNumberComponent
                                name="personPhone3"
                                listName="personCode3"
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                label={translate('search.phoneNumber3')}
                                // rules={{ required: translate("search.requiredField") }}
                            />
                        </div>

                        <div className='col-md-6'>
                            <InputComponent
                                id="personEmail"
                                type="email"
                                name="personEmail"
                                label={translate("search.email")}
                                placeholder={translate("loginPage.emailPlaceholder")}
                                register={register}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("personEmail", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="popupFooter">
                    <ButtonComponent Class={'BtnCancel'} onClick={cancelFn}>{translate("search.close")}</ButtonComponent>
                    <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(saveFn)}>{translate("search.save")}</ButtonComponent>
                </div>
                <LoaderComponent show={showLoader} />
            </div>
        </div>
    );
}

