import {
  CheckBoxComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React, { useEffect } from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";
import {
  FieldError,
  useFieldArray,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { countryCode } from "app/shared/util/date-utils";

const PromissoryNote = (props) => {

  const { closepopUpFn } = props;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({ mode: "onTouched" });


  useEffect(() => {
    setValue("inputForm", "legalBonds");
  }, [setValue]);

  const { fields: debtors, append: appendDebtor, remove: removeDebtor } = useFieldArray({
    control,
    name: "debtors",
  });

  const { fields: guarantors, append: appendGuarantor, remove: removeGuarantor } = useFieldArray({
    control,
    name: "guarantors",
  });

  useEffect(() => {
    if (currencyList?.length > 0) {
      setValue("promissoryNoteCurrencyList", currencyList[0]);
    }

    // if (countryCode?.length > 0) {
      setValue("debtors", [{ debtorName: "", phoneNumber: "", countryCode: countryCode[0] }]);
      setValue("guarantors", [{ guarantorName: "", guarantorPhoneNumber: "", guarantorCountryCode: countryCode[0] }]);
    // }
  }, []);

  const addNewDebtor = () => {
    appendDebtor({ debtorName: "", phoneNumber: "", countryCode: countryCode?.[0] || "+962" });
    const newIndex = debtors.length - 1;
    setValue(`debtors.${newIndex}.countryCode`, countryCode?.[0] || "+962");
  
  };
  
  const addNewGuarantor = () => {
    appendGuarantor({ guarantorName: "", guarantorPhoneNumber: "", guarantorCountryCode: countryCode?.[0] || "+962" });
  
    const newIndex = guarantors.length - 1;
    setValue(`guarantors.${newIndex}.guarantorCountryCode`, countryCode?.[0] || "+962");
  };

  const removeRow = (index: number, type: "debtor" | "guarantor") => {
    if (type === "debtor") {
      removeDebtor(index);
    } else {
      removeGuarantor(index);
    }
  };

 const lang = useAppSelector((state) => state.locale.currentLocale);

  const currencyList = [
    { name: { ar: "دينا اردني", en: "Jordanian Dinar" }, code: "JOD" },
    { name: { ar: "دولار امريكي", en: "US Dollar" }, code: "USD" },
    { name: { ar: "درهم امراتي", en: "UAE Dirham" }, code: "AED" },
  ];

  const cancelFn = () => {
    closepopUpFn(false)
  };

  const addChequeFn = () => {
    closepopUpFn(false)
    const formData = getValues();
    console.log("Cheque Form Data:", formData);
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
    <div className="popupView">
      <div className="content">
        <div className="row promissoryNotePopup">
          <h4>إضافة بيانات الكمبيالة</h4>

          <DatePickerComponent
            id="promissoryNoteIssueDate-id"
            name="issueDate"
            label={"تاريخ التحرير"}
            placeholder={"DD/MM/YYYY"}
            register={register}
            rules={{ required: "يجب اختيار تاريخ تحرير" }}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("issueDate", e.target.value)}
            className="col-md-6 mb-4"
          />

          <DatePickerComponent
            id="promissoryNoteDueDate-id"
            name="promissoryNoteDueDate"
            label={"تاريخ الاستحقاق"}
            placeholder={"DD/MM/YYYY"}
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("promissoryNoteDueDate", e.target.value)}
            className="col-md-6 mb-4"
            rules={{ required: "يجب اختيار تاريخ الاستحقاق" }}
          />

          <div className="ammountDiv row col-md-6">
            <InputComponent
              id="promissoryNoteAmount-id"
              type="text"
              name="promissoryNoteAmount"
              placeholder="المبلغ"
              register={register}
              errors={errors}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setValue("promissoryNoteAmount", numericValue);
              }}
              rules={{ required: "يجب ادخال قيمة الكمبيالة" }}
              label="قيمة الكمبيالة"
            />

            <DropDownComponent
              id="promissoryNoteCurrencyList-id"
              name="promissoryNoteCurrencyList"
              register={register}
              watch={watch}
              setValueMethod={setValue}
              options={currencyList}
              optionLabel={`name.${lang}`}
              errors={errors}
              onChange={(e) => setValue("promissoryNoteCurrencyList", e.value)}
              placeholder="دينار"
              rules={{ required: "يجب اختيار العملة" }}
            />
          </div>

          {debtors?.map((field, index) => (
            <div key={field.id} className="debtorNameDiv row">
              <InputComponent
                id={`promissoryNoteDebtorName_${field.id}`}
                type="text"
                name={`debtors.${index}.debtorName`}
                placeholder="ادخل اسم المدين"
                register={register}
                errors={errors?.debtors?.[index]?.debtorName}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => {
                  const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF]/g, "");
                  setValue(`debtors.${index}.debtorName`, letterValue);
                }}
                value={watch(`debtors.${index}.debtorName`)}
                label="اسم المدين"
                className="col-md-6"
              />

              <div className="phoneNoDiv col-md-6">
                <label>رقم الهاتف <span>*</span></label>
                <div>
                  <DropDownComponent
                    id={`promissoryNoteCountryCode_${field.id}`}
                    name={`debtors.${index}.countryCode`}
                    register={register}
                    watch={watch}
                    setValueMethod={setValue}
                    options={countryCode}
                    optionLabel={`name.${lang}`}
                    errors={errors}
                    onChange={(e) => setValue(`debtors.${index}.countryCode`, e.value)}
                    setValue={countryCode[0]}
                    valueTemplate={selectedCountryCodeTemplate}
                    itemTemplate={countryCodeOptionTemplate}
                  />
                  <InputComponent
                    id={`promissoryNotePhoneNumber_${field.id}`}
                    type="text"
                    name={`debtors.${index}.phoneNumber`}
                    placeholder="مثال: 1234567"
                    register={register}
                    errors={errors?.debtors?.[index]?.phoneNumber}
                    setValueMethod={setValue}
                    watch={watch}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, "");
                      setValue(`debtors.${index}.phoneNumber`, numericValue);
                    }}
                    value={watch(`debtors.${index}.phoneNumber`)}
                  />

                  {index !== 0 && (
                    <span onClick={() => removeRow(index, "debtor")} className="sideBtnStyle deleteBtn">
                      حذف
                    </span>
                  )}
                </div>
              </div>

              {index === debtors.length - 1 && (
                <span onClick={addNewDebtor} className="sideBtnStyle addBtn">
                  اضف اسم مدين جديد
                </span>
              )}
            </div>
          ))}

          <CheckBoxComponent
            id="promissoryNoteGuarantorCheckBox-id"
            name="promissoryNoteGuarantorCheckBox"
            label="يوجد كفيل"
            className="col-12 mb-2"
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("promissoryNoteGuarantorCheckBox", e.value)}
          />

          {watch("promissoryNoteGuarantorCheckBox") &&
            guarantors?.map((field, index) => (
              <div key={field.id} className="debtorNameDiv row">
                <InputComponent
                  id={`promissoryNoteGuarantorName_${field.id}`}
                  type="text"
                  name={`guarantors.${index}.guarantorName`}
                  placeholder="ادخل اسم الكفيل"
                  register={register}
                  errors={errors?.guarantors?.[index]?.guarantorName}
                  setValueMethod={setValue}
                  watch={watch}
                  onChange={(e) => {
                    const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF]/g, "");
                    setValue(`guarantors.${index}.guarantorName`, letterValue);
                  }}
                  value={watch(`guarantors.${index}.guarantorName`)}
                  label="اسم الكفيل"
                  className="col-md-6"
                />

                <div className="phoneNoDiv col-md-6">
                  <label>رقم الهاتف <span>*</span></label>
                  <div>
                    <DropDownComponent
                      id={`promissoryNoteCountryCodeGuarantor_${field.id}`}
                      name={`guarantors.${index}.guarantorCountryCode`}
                      register={register}
                      watch={watch}
                      setValueMethod={setValue}
                      options={countryCode}
                      optionLabel={`name.${lang}`}
                      errors={errors}
                      onChange={(e) => setValue(`guarantors.${index}.guarantorCountryCode`, e.value)}
                      setValue={countryCode[0]}
                      valueTemplate={selectedCountryCodeTemplate}
                      itemTemplate={countryCodeOptionTemplate}
                    />

                    <InputComponent
                      id={`promissoryNotePhoneNumberGuarantor_${field.id}`}
                      type="text"
                      name={`guarantors.${index}.guarantorPhoneNumber`}
                      placeholder="مثال: 1234567"
                      register={register}
                      errors={errors?.guarantors?.[index]?.guarantorPhoneNumber}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, "");
                        setValue(`guarantors.${index}.guarantorPhoneNumber`, numericValue);
                      }}
                      value={watch(`guarantors.${index}.guarantorPhoneNumber`)}
                    />

                    {index !== 0 && (
                      <span onClick={() => removeRow(index, "guarantor")} className="sideBtnStyle deleteBtn">
                        حذف
                      </span>
                    )}
                  </div>
                </div>

                {index === guarantors.length - 1 && (
                  <span onClick={addNewGuarantor} className="sideBtnStyle addBtn">
                    اضف اسم كفيل جديد
                  </span>
                )}
              </div>
            ))}

          <div className="uploaderContainer">
            <h4>{translate("createNewProfile.attachments")}</h4>
          </div>

          <div className="actionBtns">
            <div onClick={cancelFn} className="BtnCancel">
              إلغاء
            </div>
            <div onClick={handleSubmit(addChequeFn)} className="btnStyle">
              إضافة كمبيالة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromissoryNote;
