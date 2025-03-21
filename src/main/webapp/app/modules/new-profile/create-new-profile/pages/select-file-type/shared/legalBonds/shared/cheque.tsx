import {
  AttachmentFileComponent,
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

import { InputSwitch } from 'primereact/inputswitch';



const Cheque = (props) => {

  const { closepopUpFn } = props;
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
    currencyList: any;
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  useEffect(() => {
    setValue("inputForm", "legalBonds");
  }, [setValue]);

  useEffect(() => {
    if (currencyList?.length > 0) {
      setValue("currencyList", currencyList[0]);
    }
  }, []);

  const [isChequeStamped, setIsChequeStamped] = useState(false);

  const addNewRow = () => {
    append({ drawerName: "" });
  };

  const removeRow = (index) => {
    remove(index);
  };

  const handleRowChange = (index, value) => {
    const letterValue = value.replace(/[^a-zA-Z\u0600-\u06FF]/g, "");
    setValue(`rows.${index}.drawerName`, letterValue);
  };

  const lang = useAppSelector((state) => state.locale.currentLocale);

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

  const cancelFn = () => {

    closepopUpFn(false)
    console.log("Test CAncel Btn")
  };
  const addChequeFn = () => {
    const formData = getValues();
    console.log("Cheque Form Data:", formData);
    console.log("test watch: ", watch("firstBeneficiary"));
  };

  return (
    <div className="popupView">
      <div className="content">
        <div className="row">
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
            rules={{ required: "يجب اختيار اسم البنك" }}
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

          <div className="ammountDiv">
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
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setValue("chequeAmount", numericValue);
              }}
              rules={{ required: "يجب ادخال قيمة الشيك" }}
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
              rules={{ required: "يجب اختيار العملة" }}
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
            rules={{ required: "يجب ادخال رقم الشيك" }}
            label="رقم الشيك"
          />

          <div className="switchDiv col-md-12">
            <InputSwitch
              inputId="isChequeStamped-id"
              checked={isChequeStamped}
              onChange={(e) => setIsChequeStamped(e.value)}
            />

            <label htmlFor="isChequeStamped-id">الشيك مختوم</label>
          </div>

          <DatePickerComponent
            id="legalBondsDueDate"
            name="dueDate"
            label={"تاريخ الاستحقاق"}
            placeholder={"DD/MM/YYYY"}
            register={register}
            rules={{ required: "يجب اختيار تاريخ الاستحقاق" }}
            errors={errors?.dueDate ? { dueDate: errors.dueDate } : undefined}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("dueDate", e.target.value)}
          />

          {isChequeStamped && <DatePickerComponent
            id="legalBondsReplayDate"
            name="replayDate"
            label={"تاريخ الاعادة"}
            placeholder={"DD/MM/YYYY"}
            register={register}
            errors={
              errors?.replayDate ? { replayDate: errors.replayDate } : undefined
            }
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("replayDate", e.target.value)}
          />}

          <div className="flex-row" >
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
              rules={{ required: "يجب اختيار المستفيد" }}
              label="مستفيد"
              className="w-50-16px"
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
                onChange={(e) => {
                  const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF]/g, "");
                  setValue("firstBeneficiaryName", letterValue);
                }}
                rules={{
                  required:
                    watch("firstBeneficiary")?.code === "FB"
                      ? "يجب ادخال اسم المستفيد الاول"
                      : "يجب ادخال اسم المجيز"
                }}
                label={
                  watch("firstBeneficiary")?.code === "FB"
                    ? "اسم المستفيد الأول"
                    : "اسم المجيز"
                }
                className="w-50-16px"
              />
            )}
          </div>

          {watch("firstBeneficiary") &&
            fields.map((field, index) => (
              <div key={field.id} className="flex-row">
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
                  rules={{
                    required: watch("firstBeneficiary")?.code === "FB"
                      ? "يجب ادخال اسم الساحب"
                      : "يجب ادخال اسم المجيز"
                  }}
                  label={
                    watch("firstBeneficiary")?.code === "FB"
                      ? "اسم الساحب"
                      : "اسم المجيز"
                  }
                  value={watch(`rows.${index}.drawerName`)}
                />
                <div className="actionSideRowDiv">
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
            <div className="w-50-16px">
            <AttachmentFileComponent
              attachList={e => console.log(e)}
              fileTypeList={[
                { name: { en: 'file Type one', ar: 'نوع الملف الاول' }, code: 'one' },
                { name: { en: 'file Type two', ar: 'نوع الملف الثاني' }, code: 'two' }
              ]}
              lang={lang}
              fileTypePlaceHolder={'Select a File Type'}
            />
            </div>
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
    </div>
  );
};

export default Cheque;
