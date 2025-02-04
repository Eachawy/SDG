/* eslint-disable no-constant-binary-expression */
import {
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";
import { useForm } from "react-hook-form";

const Cheque = (props) => {
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
  const [rows, setRows] = useState([{ id: Date.now(), drawerName: "" }]);

  const addNewRow = () => {
    setRows([...rows, { id: Date.now(), drawerName: "" }]);
  };

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowChange = (id, value) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, drawerName: value } : row)));
  };

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

  const bankNames = [
    { name: { ar: "بنك ابو ظبي الاول", en: "FAB" }, code: "FAB" },
    { name: { ar: "بنك الاهلى القطري", en: "QNB" }, code: "QNB" },
  ];

  const firstBeneficiaryList = [
    { name: { ar: "مستفيد اول", en: "First Beneficiary" }, code: "FB" },
    { name: { ar: "مجيز له", en: "Authorized Party" }, code: "AP" },
  ];

  const currencyList = [
    { name: { ar: "دينا اردني", en: "Jordanian Dinar" }, code: "JOD" },
    { name: { ar: "دولار امريكي", en: "US Dollar" }, code: "USD" },
    { name: { ar: "درهم امراتي", en: "UAE Dirham" }, code: "AED" },
  ];

  const legalBondFn = () => {
    setShowlegalBondPopup(true);
  };

  const cancelFn = () => { };
  const addChequeFn = () => {
    const formData = getValues();
    console.log("Cheque Form Data:", formData);
  };

  return (
    <div className="legalBondChequeOverlay">
      <div>
        <h4>إضافة بيانات الشيك</h4>

        <DropDownComponent
          id="legalBondBankName"
          name="bankName"
          register={register}
          watch={watch}
          setValueMethod={setValue}
          options={bankNames}
          optionLabel={`name.${lang}`}
          errors={errors}
          onChange={(e) => setValue("bankName", e.value as object)}
          placeholder="اختر اسم البنك"
          rules={{ required: "You must select the Bank Name" }}
          label="اسم البنك"
        />

        <InputComponent
          id="legalBondBankBranch"
          type="bankBranch"
          name="bankBranch"
          placeholder={translate("createNewProfile.exm") + "فرع الرشيد"}
          register={register}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("bankBranch", e.target.value)}
          label="الفرع"
        />

        <div className="chequeAmount">
          <InputComponent
            id="legalBondchequeAmount"
            type="chequeAmount"
            name="chequeAmount"
            placeholder="المبلغ"
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("chequeAmount", e.target.value)}
            rules={{ required: "You must select the cheque amount" }}
            label="قيمة الشيك"
          />
          <DropDownComponent
            id="legalBondsCurrencyList"
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

        <InputComponent
          id="legalBondsChequeNo"
          type="ChequeNo"
          name="ChequeNo"
          placeholder={translate("createNewProfile.exm") + "123456789"}
          register={register}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("ChequeNo", e.target.value)}
          rules={{ required: "You must select the cheque number" }}
          label="رقم الشيك"
        />

        <DatePickerComponent
          id="legalBondsDueDate"
          name="dueDate"
          label={"تاريخ الاستحقاق"}
          className={"_col"}
          placeholder={"DD/MM/YYYY"}
          register={register}
          rules={{ required: "You must select the due date" }}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("dueDate", e.target.value)}
        />

        <DatePickerComponent
          id="legalBondsReplayDate"
          name="replayDate"
          label={"تاريخ الاعادة"}
          className={"_col"}
          placeholder={"DD/MM/YYYY"}
          register={register}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("replayDate", e.target.value)}
        />

        <DropDownComponent
          id="legalBondsFirstBeneficiary"
          name="firstBeneficiary"
          register={register}
          watch={watch}
          setValueMethod={setValue}
          options={firstBeneficiaryList}
          optionLabel={`name.${lang}`}
          errors={errors}
          onChange={(e) => setValue("firstBeneficiary", e.value as object)}
          placeholder="اختر المستفيد"
          rules={{ required: "You must select the Beneficiary" }}
          label="مستفيد"
        />

        {true && (
          <InputComponent
            id="legalBondsfirstBeneficiaryName"
            type="firstBeneficiaryName"
            name="firstBeneficiaryName"
            placeholder="اضف اسم المستفيد الأول"
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("firstBeneficiaryName", e.target.value)}
            rules={{ required: "You must enter the first Beneficiary Name" }}
            label="اسم المستفيد الأول"
          />
        )}

        {rows.map((row, index) => (
          <div key={row.id} className="drawerNameDiv">
            <InputComponent
              id={`legalBondsDrawerName_${row.id}`}
              type="drawerName"
              name={`drawerName_${row.id}`}
              placeholder="اضف اسم الساحب"
              register={register}
              errors={errors}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => handleRowChange(row.id, e.target.value)}
              rules={{ required: "You must enter the drawer name" }}
              label="اسم الساحب"
              value={row.drawerName}
            />
            <div className="actionRowDiv">
              {index !== 0 && <span onClick={() => removeRow(row.id)} className="deleteBtn">حذف</span>}
              {index === rows.length - 1 && <span onClick={addNewRow} className="addBtn">اضف اسم ساحب جديد</span>}
            </div>
          </div>
        ))}

        <div className="uploaderContainer">
          <h4>{translate("createNewProfile.attachments")}</h4>
        </div>

        <div className="actionBtns">
          <div onClick={cancelFn} className="BtnCancel">
            إلغاء
          </div>
          <div onClick={addChequeFn} className="btnStyle">
            إضافة شيك
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cheque;