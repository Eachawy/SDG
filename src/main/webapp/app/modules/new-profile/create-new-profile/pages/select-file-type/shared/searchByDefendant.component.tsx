import {
    ButtonComponent,
    DatePickerComponent,
    DropDownComponent,
    InputComponent,
} from "@eachawy/frontend-library";
import React, { useState } from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";
import PhoneNumberComponent from "app/shared/components/phoneNumber.Component/phoneNumber.Component";
import { useForm } from "react-hook-form";

const SearchByDefendant = (props) => {

    const [showDefendantPopup, setShowDefendantPopup] = useState(false)
    const $lang = useAppSelector((state) => state.locale.currentLocale);

    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched', });

    const delegatedPeopleNames = [
        { name: { ar: "محمد عبد الله رشوان", en: "Mohamed Abd Allah Rashwan" }, code: "PF1" },
        { name: { ar: "محمد أحمد على", en: "Mohamed Ahmed Ali" }, code: "PF2" },
        { name: { ar: "زكريا محمد محسن", en: "Zakaria Mohamed Mohsin" }, code: "PF3" }
    ];

    const addNewDefendantFn = () => {
        setShowDefendantPopup(true)
    }

    const editFn = () => {
        setShowDefendantPopup(true)
    }

    const cancelBtnFn = () => {
        setShowDefendantPopup(false)
    }
    const saveAndAddBtnFn = () => {
        setShowDefendantPopup(false)
    }




    return (
        <div className="searchByDefendant">
            <div>
                <DropDownComponent
                    id="selectedPerson"
                    name="selectedPerson"
                    register={props.register}
                    watch={props.watch}
                    setValueMethod={props.setValue}
                    options={delegatedPeopleNames}
                    optionLabel={`name.${$lang === "en" ? "en" : "ar"}`}
                    errors={props.errors}
                    onChange={(e) => props.setValue("selectedPerson", e.value as object)}
                    placeholder={translate("selectFileType.delegatedPersonPlaceholder")}
                    rules={{ required: "You must select the Delegated Person." }}
                    filter
                    label="البحث بأسم المدعى عليه"
                />
                <ButtonComponent Class={'btnStyle _saveAndAdd'} onClick={addNewDefendantFn}>إضافة مدعى عليه جديد</ButtonComponent>
            </div>
            <div className='defendantData'>
                <div className="title">
                    <h4>بيانات المدعى عليه</h4>
                    <span onClick={editFn}>تعديل</span>
                </div>

                <div>
                    <p><label>اسم الشخص</label> محمد عبدالله رشوان</p>
                </div>
                <div>
                    <p><label>الرقم الوطني</label> 123456789</p>
                </div>
                <div>
                    <p><label>العنوان 1</label> شارع محمد عبد الحميد زغلول بلوك 789</p>
                </div>
                <div>
                    <p><label>العنوان 2</label> شارع محمد عبد الحميد زغلول بلوك 789</p>
                </div>
                <div>
                    <p><label>رقم الهاتف 1</label> 54368956435</p>
                </div>
                <div>
                    <p><label>رقم الهاتف 2</label> 6544543434</p>
                </div>
                <div>
                    <p><label>رقم الهاتف 3</label> 55675544545</p>
                </div>
                <div>
                    <p><label>البريد الإلكتروني</label> info@gmail.com</p>
                </div>
            </div>

            {showDefendantPopup && <div className="popupView">
                <div className="content">
                    <div className="defendantDataPopup">

                        <h4>بيانات المدعى عليه</h4>

                        <InputComponent
                            id="defendantDataPopupPersonName-id"
                            type="text"
                            name="personName"
                            label="اسم الشخص"
                            placeholder={translate("createNewProfile.enterTheAddress")}
                            register={register}
                            rules={{ required: 'يجب ادخال اسم الشخص' }}
                            errors={errors}
                            setValueMethod={setValue}
                            watch={watch}
                            onChange={(e) => setValue("personName", e.target.value)}
                        />

                        <InputComponent
                            id="defendantDataPopupNationalNumber-id"
                            type="text"
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
                            id="defendantDataPopupAddress1"
                            type="text"
                            name="address1"
                            label={translate("createNewProfile.address")}
                            placeholder={translate("createNewProfile.enterTheAddress")}
                            register={register}
                            rules={{ required: 'يجب ادخال العنوان' }}
                            errors={errors}
                            setValueMethod={setValue}
                            watch={watch}
                            onChange={(e) => setValue("address1", e.target.value)}
                        />

                        <InputComponent
                            id="defendantDataPopupAddress2"
                            type="text"
                            name="address2"
                            label={translate("createNewProfile.address")}
                            placeholder={translate("createNewProfile.enterTheAddress")}
                            register={register}
                            errors={errors}
                            setValueMethod={setValue}
                            watch={watch}
                            onChange={(e) => setValue("address2", e.target.value)}
                        />

                        <PhoneNumberComponent register={register} errors={errors} watch={watch} setValue={setValue} />
                        <PhoneNumberComponent register={register} errors={errors} watch={watch} setValue={setValue} />
                        <PhoneNumberComponent register={register} errors={errors} watch={watch} setValue={setValue} />

                        <InputComponent
                            id="defendantDataPopupEmail"
                            type="email"
                            name="email"
                            label={translate("createNewProfile.email")}
                            placeholder={translate("loginPage.emailPlaceholder")}
                            register={register}
                            errors={errors}
                            setValueMethod={setValue}
                            watch={watch}
                            onChange={(e) => setValue("email", e.target.value)}
                        />

                        <div className="actionBtns">
                            <ButtonComponent Class={'BtnCancel'} onClick={cancelBtnFn}>إلغاء</ButtonComponent>
                            <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(saveAndAddBtnFn)}>حفظ وإضافة</ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )





}

export default SearchByDefendant