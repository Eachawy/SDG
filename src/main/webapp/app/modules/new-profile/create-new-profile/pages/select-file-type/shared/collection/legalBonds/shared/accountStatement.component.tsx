import {
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

const AccountStatement = (props) => {

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

  useEffect(() => {
    if (currencyList?.length > 0) {
      setValue("accountStatementCurrencyList", currencyList[0]);
    }
  }, []);

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

  return (
    <div className="popupView">
      <div className="content">
        <div className="row promissoryNotePopup">
          <h4>إضافة بيانات كشف حساب</h4>

          <InputComponent
            id="accountStatementNationalNo-id"
            type="text"
            name="accountStatementNationalNo"
            placeholder="مثال: 1234567"
            register={register}
            errors={errors?.accountStatementNationalNo}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              setValue("accountStatementNationalNo", numericValue);
            }}
            value={watch("accountStatementNationalNo")}
            label="رقم كشف الحساب"
            className="col-md-6"
            rules={{ required: "يجب ادخال رقم كشف الحساب" }}
          />

          <div className="ammountDiv row col-md-6">
            <InputComponent
              id="accountStatementAmount-id"
              type="text"
              name="accountStatementAmoun"
              placeholder="المبلغ"
              register={register}
              errors={errors}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setValue("accountStatementAmoun", numericValue);
              }}
              rules={{ required: "يجب ادخال المبلغ" }}
              label="اجمالي المبلغ"
            />

            <DropDownComponent
              id="accountStatementCurrencyList-id"
              name="accountStatementCurrencyList"
              register={register}
              watch={watch}
              setValueMethod={setValue}
              options={currencyList}
              optionLabel={`name.${lang}`}
              errors={errors}
              onChange={(e) => setValue("accountStatementCurrencyList", e.value)}
              placeholder="دينار"
              rules={{ required: "يجب اختيار العملة" }}
            />
          </div>

          <div className="uploaderContainer">
            <h4>تحميل كشف حساب <span className="text-danger">*</span></h4>
          </div>

          <div className="actionBtns">
            <div onClick={cancelFn} className="BtnCancel">
              إلغاء
            </div>
            <div onClick={handleSubmit(addChequeFn)} className="btnStyle">
              إضافة كشف حساب
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatement;
