import {
  AttachmentFileComponent,
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


const Invoice = (props) => {

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
      setValue("currencyList", currencyList[0]);
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
        <div className="row promissoryNotePopup _invoice">
          <h4>إضافة بيانات فاتورة</h4>

          <DatePickerComponent
            id="invoiceIssueDate-id"
            name="invoiceIssueDate"
            label={"تاريخ الفاتورة"}
            placeholder={"DD/MM/YYYY"}
            register={register}
            rules={{ required: "يجب اختيار تاريخ الفاتورة" }}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("invoiceIssueDate", e.target.value)}
            className="col-md-6"
          />

          <div className="ammountDiv row col-md-6">
            <InputComponent
              id="invoiceAmount-id"
              type="text"
              name="invoiceAmount"
              placeholder="المبلغ"
              register={register}
              errors={errors}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setValue("invoiceAmount", numericValue);
              }}

              rules={{ required: "يجب ادخال قيمة الفاتورة" }}
              label="قيمة الفاتورة"
            />

            <DropDownComponent
              id="invoiceCurrencyList-id"
              name="currencyList"
              register={register}
              watch={watch}
              setValueMethod={setValue}
              options={currencyList}
              optionLabel={`name.${lang}`}
              errors={errors}
              onChange={(e) => setValue("currencyList", e.value)}
              placeholder="دينار"
              rules={{ required: "يجب اختيار العملة" }}
            />
          </div>

          <InputComponent
            id="invoiceNo-id"
            type="text"
            name="invoiceNo"
            placeholder="مثال: 1234567"
            register={register}
            errors={errors?.invoiceNo}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              setValue("invoiceNo", numericValue);
            }}
            value={watch("invoiceNo")}
            label="رقم الفاتورة"
            className="col-md-6"
            rules={{ required: "يجب ادخال رقم الفاتورة" }}
          />

          <div className="uploaderContainer w-100">
            <h4>تحميل الفاتورة<span className="text-danger">*</span></h4>

            <div className="row">
              {/* <AttachmentFileComponent
                id="attach_1"
                name="attach_1"
                lang={$lang}
                register={register}
                watch={watch}
                rules={{ required: 'يجب ادخال المىفقات' }}
                errors={errors}
                setValueMethod={setValue}
                attachList={(e) => setValue("attach_1", e)}
                fileTypeList={[
                  { name: { en: 'file Type one', ar: 'نوع الملف الاول' }, code: 'one' },
                  { name: { en: 'file Type two', ar: 'نوع الملف الثاني' }, code: 'two' }
                ]}
                lang={lang}
                fileTypePlaceHolder={'Select a File Type'}
              /> */}
            </div>
          </div>

          <div className="actionBtns">
            <div onClick={cancelFn} className="BtnCancel">
              إلغاء
            </div>
            <div onClick={handleSubmit(addChequeFn)} className="btnStyle">
              إضافة فاتورة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
