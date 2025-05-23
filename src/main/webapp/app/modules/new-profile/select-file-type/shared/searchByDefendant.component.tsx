import {
    ButtonComponent,
    DropDownComponent,
    InputComponent,
} from "@eachawy/frontend-library";
import React, { useState, useEffect } from "react";
import { translate } from "react-jhipster";
import { useAppSelector, useAppDispatch } from "app/config/store";
import PhoneNumberComponent from "app/shared/components/phoneNumber.Component/phoneNumber.Component";
import { useForm } from "react-hook-form";
import { getAllPersons, resetAllPersons } from "../newProfileLookups.reducer";
import _ from 'lodash';
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import { AddEditPerson } from "../select-file-type.reducer";
import { countryCode } from "app/shared/util/date-utils";
import { getCountryCodeObj, removeCountryCode } from "app/shared/util/utils";

const SearchByDefendant = (props) => {
    const dispatch = useAppDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showDefendantPopup, setShowDefendantPopup] = useState(false);
    const [allPersons, setAllPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const $lang = useAppSelector((state) => state.locale.currentLocale);
    const $persons = useAppSelector((state) => state.createProfileLookups.personsList);
    const $addEditPersonResponse = useAppSelector((state) => state.selectFileType.addEditPersonResponse);

    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched', });

    useEffect(() => {
        getAllLookups();
    }, []);

    useEffect(() => {
        if ($persons?.length > 0) {
            const arr = $persons.map(item => {
                return {
                    name: {
                        en: item?.nameEnglish,
                        ar: item?.nameArabic
                    },
                    code: item?.id
                }
            })
            setAllPersons(arr);
            if (editMode) {
                handleEditMode()
            }
            if ($addEditPersonResponse) {
                const obj = _.find($persons, (person) => person.id === $addEditPersonResponse?.id)
                setValue('personId', {
                    name: {
                        en: obj?.nameEnglish,
                        ar: obj?.nameArabic
                    },
                    code: obj?.id
                });
                setSelectedPerson($addEditPersonResponse);
            }
        }
    }, [$persons, editMode, $addEditPersonResponse]);

    const handleEditMode = () => {
        setValue('personNameEN', selectedPerson?.nameEnglish);
        setValue('personNameAR', selectedPerson?.nameArabic);
        setValue('personNationlId', selectedPerson?.nationalId);
        setValue('personAddress1', selectedPerson?.addressOne);
        setValue('personAddress2', selectedPerson?.addressTwo);
        setValue('personCode1', getCountryCodeObj(selectedPerson?.mobileOne));
        setValue('personCode2', getCountryCodeObj(selectedPerson?.mobileTwo));
        setValue('personCode3', getCountryCodeObj(selectedPerson?.mobileThree));
        setValue('personPhone1', Number(removeCountryCode(selectedPerson?.mobileOne)));
        setValue('personPhone2', Number(removeCountryCode(selectedPerson?.mobileTwo)));
        setValue('personPhone3', Number(removeCountryCode(selectedPerson?.mobileThree)));
        setValue('personEmail', selectedPerson?.email);
    }

    const getAllLookups = async () => {
        await dispatch(getAllPersons());
    }

    const personsDDLChange = (e) => {
        props.setValue("personId", e.value as object);
        const filteredPerson = _.find($persons, (person) => person.id === e.value?.code);
        setSelectedPerson(filteredPerson);
    }

    const addNewDefendantFn = () => {
        setEditMode(false);
        setShowDefendantPopup(true)
    }

    const editFn = () => {
        setEditMode(true);
        setShowDefendantPopup(true);
    }

    const cancelBtnFn = () => {
        setEditMode(false);
        setShowDefendantPopup(false)
    }

    const saveAndAddBtnFn = async (data) => {
        dispatch(resetAllPersons());
        await addEditPerson(data);
        await dispatch(getAllPersons());
        setEditMode(false);
        setShowDefendantPopup(false);
    }

    const addEditPerson = async (data) => {
        setShowLoader(true);
        let obj: any = {
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

        if (editMode) {
            obj = {
                ...obj,
                id: selectedPerson?.id
            }
        }

        // Call API
        await dispatch(AddEditPerson(obj));
        setShowLoader(false);
    }


    return (
        <div className="searchByDefendant">
            <div>
                <DropDownComponent
                    id="personId"
                    name="personId"
                    // value="personId"
                    register={props.register}
                    watch={props.watch}
                    setValueMethod={props.setValue}
                    options={allPersons}
                    optionLabel={`name.${$lang === "en" ? "en" : "ar"}`}
                    errors={props.errors}
                    onChange={(e) => personsDDLChange(e)}
                    placeholder={translate("selectFileType.delegatedPersonPlaceholder")}
                    rules={{ required: "You must select the Delegated Person." }}
                    filter
                    label={
                        props.fileType?.code === "URGENT_REQUEST" ? 'البحث بأسم المستدعي ضده' :
                            props.fileType?.code === "COLLECTION" ? 'البحث بأسم المدعى عليه' :
                                props.opponentCategory?.code === "RESPONDENT" ? 'البحث بأسم المدعى عليه' : 'البحث بأسم المشتكي عليه'}
                />
                <ButtonComponent Class={'btnStyle _saveAndAdd'} onClick={addNewDefendantFn}>
                    {props.fileType?.code === "URGENT_REQUEST" ? 'إضافة مستدعي ضده جديد' :
                        props.fileType?.code === "COLLECTION" ? 'إضافة مدعى عليه جديد' :
                            props.opponentCategory?.code === "RESPONDENT" ? 'إضافة مدعى عليه جديد' : 'إضافة مشتكي عليه جديد'}

                </ButtonComponent>
            </div>

            {selectedPerson && (
                <div className='defendantData'>
                    <div className="title">
                        <h4>
                            {props.fileType?.code === "URGENT_REQUEST" ? 'بيانات المستدعي ضده' :
                                props.fileType?.code === "COLLECTION" ? 'بيانات المدعى عليه' :
                                    props.opponentCategory?.code === "RESPONDENT" ? 'بيانات المدعى عليه' : 'بيانات المشتكي عليه'}
                        </h4>
                        <span onClick={editFn}>تعديل</span>
                    </div>

                    <div>
                        <p><label>{translate("selectFileType.personName")}</label> {$lang === 'en' ? selectedPerson?.nameEnglish : selectedPerson?.nameArabic}</p>
                    </div>
                    <div>
                        <p><label>{translate("selectFileType.nationalID")}</label> {selectedPerson?.nationalId}</p>
                    </div>
                    <div>
                        <p><label>{translate("selectFileType.address_1")}</label> {selectedPerson?.addressOne}</p>
                    </div>
                    <div>
                        <p><label>{translate("selectFileType.address_2")}</label> {selectedPerson?.addressTwo}</p>
                    </div>
                    <div>
                        <p><label>{translate("selectFileType.phoneNumber_1")}</label> {selectedPerson?.mobileOne}</p>
                    </div>
                    <div>
                        <p><label>{translate("selectFileType.phoneNumber_2")}</label> {selectedPerson?.mobileTwo}</p>
                    </div>
                    <div>
                        <p><label>{translate("selectFileType.phoneNumber_3")}</label> {selectedPerson?.mobileThree}</p>
                    </div>
                    <div>
                        <p><label>{translate("selectFileType.emailAddress")}</label> {selectedPerson?.email}</p>
                    </div>
                </div>
            )}

            {showDefendantPopup && (
                <div className="popupView">
                    <div className="content">
                        <div className="defendantDataPopup">

                            <h4>
                                {props.fileType?.code === "URGENT_REQUEST" ? 'بيانات المستدعي ضده' :
                                    props.fileType?.code === "COLLECTION" ? 'بيانات المدعى عليه' :
                                        props.opponentCategory?.code === "RESPONDENT" ? 'بيانات المدعى عليه' : 'بيانات المشتكي عليه'}
                            </h4>

                            <InputComponent
                                id="personNameEN"
                                type="text"
                                name="personNameEN"
                                label="اسم الشخص باللغة الإنجليزية"
                                placeholder={"ادخل اسم الشخص"}
                                register={register}
                                rules={{ required: 'يجب ادخال اسم الشخص' }}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const englishOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                                    setValue("personNameEN", englishOnly);
                                }}
                            />

                            <InputComponent
                                id="personNameAR"
                                type="text"
                                name="personNameAR"
                                label="اسم الشخص باللغة العربية"
                                placeholder={"ادخل اسم الشخص"}
                                register={register}
                                rules={{ required: 'يجب ادخال اسم الشخص' }}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const arabicOnly = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");
                                    setValue("personNameAR", arabicOnly);
                                }}
                            />

                            <InputComponent
                                id="personNationlId"
                                type="text"
                                name="personNationlId"
                                label={translate("createNewProfile.nationalNumber")}
                                placeholder={translate("createNewProfile.exm") + "1234567"}
                                register={register}
                                rules={{ required: 'يجب ادخال الرقم الوطني' }}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                    setValue("personNationlId", numericValue);
                                }}
                            />

                            <InputComponent
                                id="personAddress1"
                                type="text"
                                name="personAddress1"
                                label={translate("createNewProfile.address")}
                                placeholder={translate("createNewProfile.enterTheAddress")}
                                register={register}
                                rules={{ required: 'يجب ادخال العنوان' }}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("personAddress1", e.target.value)}
                            />

                            <InputComponent
                                id="personAddress2"
                                type="text"
                                name="personAddress2"
                                label={translate("createNewProfile.address")}
                                placeholder={translate("createNewProfile.enterTheAddress")}
                                register={register}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("personAddress2", e.target.value)}
                            />

                            <PhoneNumberComponent
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                name="personPhone1"
                                listName="personCode1"
                            />

                            <PhoneNumberComponent
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                name="personPhone2"
                                listName="personCode2"
                            />

                            <PhoneNumberComponent
                                register={register}
                                errors={errors}
                                watch={watch}
                                setValue={setValue}
                                name="personPhone3"
                                listName="personCode3"
                            />

                            <InputComponent
                                id="personEmail"
                                type="email"
                                name="personEmail"
                                label={translate("createNewProfile.email")}
                                placeholder={translate("loginPage.emailPlaceholder")}
                                register={register}
                                errors={errors}
                                setValueMethod={setValue}
                                watch={watch}
                                onChange={(e) => setValue("personEmail", e.target.value)}
                            />

                            <div className="actionBtns">
                                <ButtonComponent Class={'BtnCancel'} onClick={cancelBtnFn}>إلغاء</ButtonComponent>
                                <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(saveAndAddBtnFn)}>حفظ وإضافة</ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <LoaderComponent show={showLoader} />
        </div>
    )





}

export default SearchByDefendant
