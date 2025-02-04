import {
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";
import { useForm } from "react-hook-form";

const UrgentRequest = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    setValue("inputForm", "urgentRequest");
  }, [setValue]);

  const lang = useAppSelector((state) => state.locale.currentLocale);

  const currencyList = [
    { name: { ar: "دينا اردني", en: "Jordanian Dinar" }, code: "JOD" },
    { name: { ar: "دولار امريكي", en: "US Dollar" }, code: "USD" },
    { name: { ar: "درهم امراتي", en: "UAE Dirham" }, code: "AED" },
  ];

  const courts = [
    {
      name: { ar: "محكمة الأحوال الشخصية", en: "Personal Status Court" },
      code: "PSC",
    },
    {
      name: { ar: "محكمة الجنايات الكبرى", en: "Grand Criminal Court" },
      code: "GCC",
    },
    {
      name: { ar: "محكمة صلح الحقوق", en: "Court of First Instance" },
      code: "CFI",
    },
  ];

  const urgentRequestType = [
    { name: { ar: "القضايا المالية", en: "Financial Cases" }, code: "FC" },
    { name: { ar: "القضايا التجارية", en: "Commercial Cases" }, code: "CC" },
    {
      name: { ar: "قضايا الاحوال الشخصية", en: "Personal Status Cases" },
      code: "PSC",
    },
    {
      name: { ar: "قضايا الملكية الفكرية", en: "Intellectual Property Cases" },
      code: "IPC",
    },
    { name: { ar: "القضايا الحقوقية", en: "Rights Cases" }, code: "RC" },
    { name: { ar: "القضايا المدنية", en: "Civil Cases" }, code: "CCV" },
  ];

  return (
    <div className="urgentRequest">
      <h4>بيانات طلب مستعجل</h4>
      <div className="urgentRequestInputFormDiv">
        <div className="amountToCollect">
          <InputComponent
            id="amountToBeCollected"
            type="amountToBeCollected"
            name="amountToBeCollected"
            placeholder={translate("createNewProfile.exm") + "20,000"}
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("amountToBeCollected", e.target.value)}
            label="المبلغ المراد تحصيله"
          />
          <DropDownComponent
            id="urgentRequestCurrencyList"
            name="currencyList"
            register={register}
            watch={watch}
            setValueMethod={setValue}
            options={currencyList}
            optionLabel={`name.${lang}`}
            errors={errors}
            onChange={(e) => setValue("currencyList", e.value as object)}
            placeholder="دينار"
            rules={{ required: "You must select the currency" }}
          />
        </div>

        <DropDownComponent
          id="court"
          name="court"
          label="المحكمة"
          register={register}
          watch={watch}
          setValueMethod={setValue}
          options={courts}
          optionLabel={`name.${lang}`}
          errors={errors}
          onChange={(e) => setValue("court", e.value as object)}
          placeholder="اختر المحكمة"
          rules={{ required: "You must select the court" }}
        />

        <DropDownComponent
          id="urgentRequestType"
          name="urgentRequestType"
          label="نوع الطلب"
          register={register}
          watch={watch}
          setValueMethod={setValue}
          options={urgentRequestType}
          optionLabel={`name.${lang}`}
          errors={errors}
          onChange={(e) => setValue("urgentRequestType", e.value as object)}
          placeholder="اختر نوع الطلب"
          rules={{ required: "You must select the urgent request Type" }}
        />

        <InputComponent
          id="urgentRequestNo"
          type="urgentRequestNo"
          name="urgentRequestNo"
          label="رقم الطلب"
          placeholder="رقم الطلب"
          register={register}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("urgentRequestNo", e.target.value)}
          rules={{ required: "You must enter urgentr request Number" }}
        />

        <InputComponent
          id="Judge"
          type="Judge"
          name="Judge"
          label="القاضي"
          placeholder="ادخل اسم القاضي"
          register={register}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("Judge", e.target.value)}
          rules={{ required: "You must enter Judge name" }}
        />

        <DatePickerComponent
          id="urgentRequestRecordDate"
          name="urgentRequestRecordDate"
          label={"تاريخ تسجيل الطلب"}
          className={"_col"}
          placeholder={"DD/MM/YYYY"}
          register={register}
          rules={{ required: "You must select urgent request record date" }}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("urgentRequestRecordDate", e.target.value)}
        />
      </div>

      <div className="uploaderContainer">
        <h4>{translate("createNewProfile.attachments")}</h4>
      </div>
    </div>
  );
};

export default UrgentRequest;
