import {
  CheckBoxComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";
import { useForm } from "react-hook-form";
import Cheque from "./shared/cheque";

const LegalBonds = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    setValue("inputForm", "legalBonds");
  }, [setValue]);

  const [showlegalBondPopup, setShowlegalBondPopup] = useState(false);

  const lang = useAppSelector((state) => state.locale.currentLocale);

  const bondTypes = [
    { name: { ar: "شيك", en: "Cheque" }, code: "CHQ" },
    { name: { ar: "كمبيالة", en: "Promissory Note" }, code: "PN" },
    {
      name: {
        ar: "اقرار خطي/ سند امانة",
        en: "Written Acknowledgment / Trust Bond",
      },
      code: "WTB",
    },
    { name: { ar: "سند رهن", en: "Mortgage Bond" }, code: "MB" },
    { name: { ar: "كشف حساب", en: "Account Statement" }, code: "AS" },
    { name: { ar: "عقد ايجار", en: "Lease Contract" }, code: "LC" },
    { name: { ar: "فاتوره", en: "Invoice" }, code: "INV" },
  ];

  const legalBondFn = () => {
    setShowlegalBondPopup(true);
  };

  return (
    <div className="legalBonds">
      <h4>بيانات حالة المدعي عليه</h4>
      <div className="legalBondsRowDiv">
        <DropDownComponent
          id="legalBondsCurrencyList"
          name="currencyList"
          register={register}
          watch={watch}
          setValueMethod={setValue}
          options={bondTypes}
          optionLabel={`name.${lang}`}
          errors={errors}
          onChange={(e) => setValue("currencyList", e.value as object)}
          placeholder="اختر السند القانوني"
          rules={{ required: "You must select the legal bonds" }}
        />
        <div onClick={legalBondFn} className="btnStyle _saveAndAdd">
          إضافة
        </div>
      </div>
      {showlegalBondPopup && <Cheque />}
    </div>
  );
};

export default LegalBonds;
