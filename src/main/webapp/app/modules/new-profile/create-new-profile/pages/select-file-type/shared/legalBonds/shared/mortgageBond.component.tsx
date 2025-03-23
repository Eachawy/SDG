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


const MortgageBond = (props) => {

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
      setValue("mortgageBondCurrencyList", currencyList[0]);
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
        {/* row promissoryNotePopup */}
        <div className="flex-row">
          <h4>إضافة بيانات سند رهن</h4>

          <DatePickerComponent
            id="mortgageBondIssueDate-id"
            name="mortgageBondissueDate"
            label={"تاريخ التحرير"}
            placeholder={"DD/MM/YYYY"}
            register={register}
            rules={{ required: "يجب اختيار تاريخ التحرير" }}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("mortgageBondissueDate", e.target.value)}
            className="w-50-16px"
          />

          <DatePickerComponent
            id="mortgageBondDueDate-id"
            name="mortgageBondDueDate"
            label={"تاريخ الاستحقاق"}
            placeholder={"DD/MM/YYYY"}
            register={register}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("mortgageBondDueDate", e.target.value)}
            className="w-50-16px"
            rules={{ required: "يجب اختيار تاريخ الاستحقاق" }}
          />

          <div className="p-0 w-100">
            <div className="ammountDiv w-50-16px">
              <InputComponent
                id="mortgageBondAmount-id"
                type="text"
                name="mortgageBondAmount"
                placeholder="المبلغ"
                register={register}
                errors={errors}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setValue("mortgageBondAmount", numericValue);
                }}
                rules={{ required: "يجب إدخال مبلغ سند الرهن" }}
                label="اجمالي المبلغ"
              />

              <DropDownComponent
                id="mortgageBondCurrencyList-id"
                name="mortgageBondCurrencyList"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={currencyList}
                optionLabel={`name.${lang}`}
                errors={errors}
                onChange={(e) => setValue("mortgageBondCurrencyList", e.value)}
                placeholder="دينار"
                rules={{ required: "يجب اختيار عملة" }}
              />
            </div>
          </div>

          <InputComponent
            id="mortgagBondDebtorName-id"
            type="text"
            name="mortgagBondDebtorName"
            placeholder="اسم المدين"
            register={register}
            errors={errors?.mortgagBond}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => {
              const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF]/g, "");
              setValue("mortgagBondDebtorName", letterValue);
            }}
            value={watch("mortgagBondDebtorName")}
            label="اسم المدين"
            className="w-50-16px"
            rules={{ required: "يجب ادخال اسم المدين" }}
          />

          <InputComponent
            id="mortgageBondNationalNo-id"
            type="text"
            name="mortgageBondNationalNo"
            placeholder="مثال: 1234567"
            register={register}
            errors={errors?.nationalNo}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              setValue("mortgageBondNationalNo", numericValue);
            }}
            value={watch("mortgageBondNationalNo")}
            label="الرقم الوطني"
            className="w-50-16px"
            rules={{ required: "يجب ادخال الرقم الوطني" }}
          />

          <div className="uploaderContainer">
            <h4>{translate("createNewProfile.attachments")}</h4>
          </div>

          <div className="uploaderContainer w-100">
            <h4>تحميل اقرار الخطي / سند امانة</h4>

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
              إضافة سند رهن
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageBond;
