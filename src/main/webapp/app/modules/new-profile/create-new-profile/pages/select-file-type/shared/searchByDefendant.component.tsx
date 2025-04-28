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
import LoaderComponent from "app/modules/shared/loaderComponent/loaderComponent";
import { AddEditPerson } from "../select-file-type.reducer";
import { countryCode } from "app/shared/util/date-utils";

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
        }

        if (editMode) {
            const mobileCode1 = String(selectedPerson?.mobileOne).substring(0, 3);
            const mobileCode2 = String(selectedPerson?.mobileTwo).substring(0, 3);
            const mobileCode3 = String(selectedPerson?.mobileThree).substring(0, 3);

            const mobileCode1Obj = _.find(countryCode, (item) => item.name === ('+' + mobileCode1));
            const mobileCode2Obj = _.find(countryCode, (item) => item.name === ('+' + mobileCode2));
            const mobileCode3Obj = _.find(countryCode, (item) => item.name === ('+' + mobileCode3));

            const mobileSplit1 = String(selectedPerson?.mobileOne).substring(3, selectedPerson?.mobileOne.length);
            const mobileSplit2 = String(selectedPerson?.mobileTwo).substring(3, selectedPerson?.mobileTwo.length);
            const mobileSplit3 = String(selectedPerson?.mobileThree).substring(3, selectedPerson?.mobileThree.length);

            setValue('personNameEN', selectedPerson?.nameEnglish);
            setValue('personNameAR', selectedPerson?.nameArabic);
            setValue('personNationlId', selectedPerson?.nationalId);
            setValue('personAddress1', selectedPerson?.addressOne);
            setValue('personAddress2', selectedPerson?.addressTwo);
            setValue('personCode1', mobileCode1Obj);
            setValue('personCode2', mobileCode2Obj);
            setValue('personCode3', mobileCode3Obj);
            setValue('personPhone1', Number(mobileSplit1));
            setValue('personPhone2', Number(mobileSplit2));
            setValue('personPhone3', Number(mobileSplit3));
            setValue('personEmail', selectedPerson?.email);

        }

        if ($addEditPersonResponse && editMode && $persons?.length > 0) {
            const obj = {
                name: {
                    en: $addEditPersonResponse?.nameEnglish,
                    ar: $addEditPersonResponse?.nameArabic
                },
                code: $addEditPersonResponse?.id
            }

            setValue('personId', obj);
            setSelectedPerson($addEditPersonResponse)
        }

    }, [$persons, editMode, $addEditPersonResponse]);

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
                    label="البحث بأسم المدعى عليه"
                    // label={getValues().opponentCategory?.code === "RESPONDENT" ? 'البحث بأسم المدعى عليه' : 'البحث بأسم المشتكي عليه'}
                />
                <ButtonComponent Class={'btnStyle _saveAndAdd'} onClick={addNewDefendantFn}>
                    {/* {getValues().opponentCategory?.code === "RESPONDENT" ? 'إضافة مدعى عليه جديد' : 'إضافة مشتكي عليه جديد'} */}
                    إضافة مدعى عليه جديد
                </ButtonComponent>
            </div>

            {selectedPerson && (
                <div className='defendantData'>
                    <div className="title">
                        <h4>بيانات المدعى عليه</h4>
                        <span onClick={editFn}>تعديل</span>
                    </div>

                    <div>
                        <p><label>اسم الشخص</label> {$lang === 'en' ? selectedPerson?.nameEnglish : selectedPerson?.nameArabic}</p>
                    </div>
                    <div>
                        <p><label>الرقم الوطني</label> {selectedPerson?.nationalId}</p>
                    </div>
                    <div>
                        <p><label>العنوان 1</label> {selectedPerson?.addressOne}</p>
                    </div>
                    <div>
                        <p><label>العنوان 2</label> {selectedPerson?.addressTwo}</p>
                    </div>
                    <div>
                        <p><label>رقم الهاتف 1</label> {selectedPerson?.mobileOne}</p>
                    </div>
                    <div>
                        <p><label>رقم الهاتف 2</label> {selectedPerson?.mobileTwo}</p>
                    </div>
                    <div>
                        <p><label>رقم الهاتف 3</label> {selectedPerson?.mobileThree}</p>
                    </div>
                    <div>
                        <p><label>البريد الإلكتروني</label> {selectedPerson?.email}</p>
                    </div>
                </div>
            )}

            {showDefendantPopup && (
                <div className="popupView">
                    <div className="content">
                        <div className="defendantDataPopup">

                            <h4>
                                {/* {getValues().opponentCategory?.code === "RESPONDENT" ? 'بيانات المدعى عليه' : 'بيانات المشتكي عليه'} */}
                                بيانات المدعى عليه
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
