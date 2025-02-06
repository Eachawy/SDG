import {
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
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

const Cheque = (props) => {
  type FormValues = {
    inputForm: string;
    bankName: string;
    bankBranch: string;
    chequeAmount: string;
    ChequeNo: string;
    dueDate: string;
    replayDate: string;
    firstBeneficiary: any;
    firstBeneficiaryName: string;
    currencyList: string;
    rows: { drawerName: string }[];
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      inputForm: "",
      bankName: "",
      bankBranch: "",
      chequeAmount: "",
      ChequeNo: "",
      dueDate: "",
      replayDate: "",
      firstBeneficiary: "",
      firstBeneficiaryName: "",
      currencyList: "",
      rows: [{ drawerName: "" }],
    },
  });

  // Manage dynamic inputs using useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  useEffect(() => {
    setValue("inputForm", "legalBonds");
  }, [setValue]);

  const [showlegalBondPopup, setShowlegalBondPopup] = useState(false);
  const [rows, setRows] = useState([{ id: Date.now(), drawerName: "" }]);

  // const addNewRow = () => {
  //   setRows([...rows, { id: Date.now(), drawerName: "" }]);
  // };

  // const removeRow = (id) => {
  //   setRows(rows.filter((row) => row.id !== id));
  // };

  // const handleRowChange = (id, value) => {
  //   setRows(
  //     rows.map((row) => (row.id === id ? { ...row, drawerName: value } : row)),
  //   );
  // };

  const addNewRow = () => {
    append({ drawerName: "" }); // Appends a new empty row
  };

  const removeRow = (index) => {
    remove(index); // Removes row at given index
  };

  const handleRowChange = (index, value) => {
    setValue(`rows.${index}.drawerName`, value); // Updates the value in react-hook-form
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

  const cancelFn = () => {};
  const addChequeFn = () => {
    const formData = getValues();
    console.log("Cheque Form Data:", formData);
    console.log("test watch: ", watch("firstBeneficiary"));
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
          errors={errors?.bankName ? { bankName: errors.bankName } : undefined}
          onChange={(e) => setValue("bankName", e.value)}
          placeholder="اختر اسم البنك"
          rules={{ required: "You must select the Bank Name" }}
          label="اسم البنك"
        />

        <InputComponent
          id="legalBondBankBranch"
          type="text"
          name="bankBranch"
          placeholder={translate("createNewProfile.exm") + "فرع الرشيد"}
          register={register}
          errors={
            errors?.bankBranch ? { bankBranch: errors.bankBranch } : undefined
          }
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("bankBranch", e.target.value)}
          label="الفرع"
        />

        <div className="chequeAmount">
          <InputComponent
            id="legalBondchequeAmount"
            type="text"
            name="chequeAmount"
            placeholder="المبلغ"
            register={register}
            errors={
              errors?.chequeAmount
                ? { chequeAmount: errors.chequeAmount }
                : undefined
            }
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
            errors={
              errors?.currencyList
                ? { currencyList: errors.currencyList }
                : undefined
            }
            onChange={(e) => setValue("currencyList", e.value)}
            placeholder="دينار"
            rules={{ required: "You must select the currency" }}
          />
        </div>

        <InputComponent
          id="legalBondsChequeNo"
          type="text"
          name="ChequeNo"
          placeholder={translate("createNewProfile.exm") + "123456789"}
          register={register}
          errors={errors?.ChequeNo ? { ChequeNo: errors.ChequeNo } : undefined}
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
          errors={errors?.dueDate ? { dueDate: errors.dueDate } : undefined}
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
          errors={
            errors?.replayDate ? { replayDate: errors.replayDate } : undefined
          }
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
          errors={
            errors?.firstBeneficiary
              ? { firstBeneficiary: errors.firstBeneficiary }
              : undefined
          }
          onChange={(e) => setValue("firstBeneficiary", e.value)}
          placeholder="اختر المستفيد"
          rules={{ required: "You must select the Beneficiary" }}
          label="مستفيد"
        />

        {watch("firstBeneficiary")?.code === "FB" && (
          <InputComponent
            id="legalBondsfirstBeneficiaryName"
            type="text"
            name="firstBeneficiaryName"
            placeholder={
              watch("firstBeneficiary")?.code === "FB"
                ? "اضف اسم المستفيد الأول"
                : "اضف اسم المجيز"
            }
            register={register}
            errors={
              errors?.firstBeneficiaryName
                ? { firstBeneficiaryName: errors.firstBeneficiaryName }
                : undefined
            }
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("firstBeneficiaryName", e.target.value)}
            rules={{ required: "You must enter the first Beneficiary Name" }}
            label={
              watch("firstBeneficiary")?.code === "FB"
                ? "اسم المستفيد الأول"
                : "اسم المجيز"
            }
          />
        )}

        {/* {rows.map((row, index) => (
          <div key={row.id} className="drawerNameDiv">
            <InputComponent
              id={`legalBondsDrawerName_${row.id}`}
              type="text"
              name={`rows.${index}.drawerName`}
              placeholder="اضف اسم الساحب"
              register={register}
              errors={
                errors?.rows?.[index]?.drawerName
                  ? { [`drawerName_${row.id}`]: errors.rows[index].drawerName }
                  : undefined
              }
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => handleRowChange(row.id, e.target.value)}
              rules={{ required: "You must enter the drawer name" }}
              label="اسم الساحب"
              value={row.drawerName}
            />
            <div className="actionRowDiv">
              {index !== 0 && (
                <span onClick={() => removeRow(row.id)} className="deleteBtn">
                  حذف
                </span>
              )}
              {index === rows.length - 1 && (
                <span onClick={addNewRow} className="addBtn">
                  اضف اسم ساحب جديد
                </span>
              )}
            </div>
          </div>
        ))} */}

        {watch("firstBeneficiary") &&
          fields.map((field, index) => (
            <div key={field.id} className="drawerNameDiv">
              <InputComponent
                id={`legalBondsDrawerName_${field.id}`}
                type="text"
                name={`rows.${index}.drawerName`}
                placeholder={
                  watch("firstBeneficiary")?.code === "FB"
                    ? "اضف اسم المستفيد الأول"
                    : "اضف اسم المجيز"
                }
                register={
                  register as unknown as UseFormRegister<
                    Record<string, unknown>
                  >
                }
                errors={
                  errors?.rows?.[index]?.drawerName
                    ? {
                        [`drawerName_${field.id}`]:
                          errors.rows[index].drawerName,
                      }
                    : undefined
                }
                setValueMethod={
                  setValue as unknown as UseFormSetValue<
                    Record<string, unknown>
                  >
                }
                watch={
                  watch as unknown as UseFormWatch<Record<string, unknown>>
                }
                onChange={(e) => handleRowChange(index, e.target.value)}
                rules={{ required: "You must enter the drawer name" }}
                label={
                  watch("firstBeneficiary")?.code === "FB"
                    ? "اسم الساحب"
                    : "اسم المجيز"
                }
                value={watch(`rows.${index}.drawerName`)}
              />
              <div className="actionRowDiv">
                {index !== 0 && (
                  <span onClick={() => removeRow(index)} className="deleteBtn">
                    حذف
                  </span>
                )}
                {index === fields.length - 1 && (
                  <span onClick={addNewRow} className="addBtn">
                    {watch("firstBeneficiary")?.code === "FB"
                      ? " اضف اسم ساحب جديد"
                      : "اضف اسم مجيز جديد"}
                  </span>
                )}
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
          <div onClick={handleSubmit(addChequeFn)} className="btnStyle">
            إضافة شيك
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cheque;
