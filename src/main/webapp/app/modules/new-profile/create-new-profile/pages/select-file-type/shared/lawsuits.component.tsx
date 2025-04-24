import {
  AttachmentFileComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";

const Lawsuits = (props) => {

  const $lang = useAppSelector((state) => state.locale.currentLocale);

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

  const lawsuitsType = [
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
    <>
    <div className="lawsuits container p-0">
      <h4>بيانات قضايا</h4>
      <div className="row g-4 gy-4 d-flex mb-4">
        <DropDownComponent
          id="jurisdiction"
          name="jurisdiction"
          label="الاختصاص القضائي"
          register={props.register}
          watch={props.watch}
          setValueMethod={props.setValue}
          options={courts}
          optionLabel={`name.${$lang}`}
          onChange={(e) => props.setValue("jurisdiction", e.value as object)}
          placeholder="اختر الاختصاص القضائي"
          errors={props.errors}
          rules={{ required: "يجب اختيار الاختصاص القضائي" }}
          className="col-md-6 mb-4"
        />

        <DropDownComponent
          id="judgeType"
          name="judgeType"
          label="نوع القاضية"
          register={props.register}
          watch={props.watch}
          setValueMethod={props.setValue}
          options={courts}
          optionLabel={`name.${$lang}`}
          onChange={(e) => props.setValue("judgeType", e.value as object)}
          placeholder="اختر نوع القاضية"
          errors={props.errors}
          rules={{ required: "يجب اختيار نوع القاضية" }}
          className="col-md-6 mb-4"
        />

        <DropDownComponent
          id="courtLocation"
          name="courtLocation"
          label="موقع المحكمة"
          register={props.register}
          watch={props.watch}
          setValueMethod={props.setValue}
          options={courts}
          optionLabel={`name.${$lang}`}
          onChange={(e) => props.setValue("courtLocation", e.value as object)}
          placeholder="اختر موقع المحكمة"
          // errors={props.errors}
          // rules={{ required: "يجب اختيار موقع المحكمة" }}
          className="col-md-6 mb-4"
        />

        <InputComponent
          id="lawsuitsNo"
          type="text"
          name="lawsuitsNo"
          label="رقم القضية"
          placeholder="رقم القضية"
          register={props.register}
          setValueMethod={props.setValue}
          watch={props.watch}
          onChange={(e) => props.setValue("lawsuitsNo", e.target.value)}
          // errors={props.errors}
          // rules={{ required: "يجب ادخال رقم القضية" }}
          className="col-md-6 flex-1 mb-4"
        />

        <DropDownComponent
          id="judge"
          name="judge"
          label="القاضي"
          register={props.register}
          watch={props.watch}
          setValueMethod={props.setValue}
          options={lawsuitsType}
          optionLabel={`name.${$lang}`}
          onChange={(e) => props.setValue("judge", e.value as object)}
          placeholder="اختر اسم القاضي"
          // errors={props.errors}
          // rules={{ required: "يجب اختيارالقاضي" }}
          className="col-md-6 flex-1 mb-4"
        />

        <DatePickerComponent
          id="lawsuitsRecordDate"
          name="lawsuitsRecordDate"
          label={"تاريخ تسجيل القضية"}
          placeholder={"DD/MM/YYYY"}
          register={props.register}
          // rules={{ required: "يجب اختيار تاريخ تسجيل القضية" }}
          // errors={props.errors}
          setValueMethod={props.setValue}
          watch={props.watch}
          onChange={(e) => props.setValue("lawsuitsRecordDate", e.target.value)}
          className="col-md-6 flex-1 mb-4"
        />


        <div className="amountToCollect row p-0 col-md-6 mb-4">
          <InputComponent
            id="amountToBeCollected"
            type="text"
            name="amountToBeCollected"
            placeholder={translate("createNewProfile.exm") + "20,000"}
            register={props.register}
            errors={props.errors}
            setValueMethod={props.setValue}
            watch={props.watch}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              props.setValue("amountToBeCollected", numericValue);
            }}
            label="المبلغ المراد تحصيله"
          />
          <DropDownComponent
            id="urgentRequestCurrencyList"
            name="currencyList"
            register={props.register}
            watch={props.watch}
            setValueMethod={props.setValue}
            options={currencyList}
            optionLabel={`name.${$lang}`}
            errors={props.errors}
            onChange={(e) => props.setValue("currencyList", e.value as object)}
            placeholder="دينار"
          />
        </div>


        <div className="uploaderContainer">
          <h4>{translate("createNewProfile.attachments")}</h4>
          <div className="row">
            <AttachmentFileComponent
              id="attach_1"
              name="attach_1"
              lang={$lang}
              register={props.register}
              watch={props.watch}
              // rules={{ required: 'يجب ادخال المىفقات' }}
              // errors={props.errors}
              setValueMethod={props.setValue}
              attachList={(e) => props.setValue("attach_1", e)}
            />
            <AttachmentFileComponent
              id="attach_2"
              name="attach_2"
              lang={$lang}
              register={props.register}
              watch={props.watch}
              // rules={{ required: 'يجب ادخال المىفقات' }}
              // errors={errors}
              setValueMethod={props.setValue}
              attachList={(e) => props.setValue("attach_2", e)}
            />
          </div>

        </div>
      </div>

      <div className="uploaderContainer">
        <h4>{translate("createNewProfile.attachments")}</h4>
      </div>
    </div>
    </>
  );
};

export default Lawsuits;
