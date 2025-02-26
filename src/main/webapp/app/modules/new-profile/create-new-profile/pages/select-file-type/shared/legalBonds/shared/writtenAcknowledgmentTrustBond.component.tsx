import {
  AttachmentFileComponent,
  AttachmentMultiFilesComponent,
  CheckBoxComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
  RadioButtonComponent,
} from "@eachawy/frontend-library";
import React, { useEffect } from "react";
import { translate } from "react-jhipster";
import { useAppSelector } from "app/config/store";
import {
  useFieldArray,
  useForm,
} from "react-hook-form";

import { countryCode } from "app/shared/util/date-utils";
import PhoneNumberComponent from "app/shared/components/phoneNumber.Component/phoneNumber.Component";

const WrittenAcknowledgmentTrustBond = (props) => {

  const lang = useAppSelector((state) => state.locale.currentLocale);

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

  const { fields: witnesses, append: appendWitness, remove: removeWitness } = useFieldArray({
    control,
    name: "witnesses",
  });

  const { fields: scheduling, append: addingScheduledRow, remove: removeScheduledRow } = useFieldArray({
    control,
    name: "scheduling",
  });


  useEffect(() => {
    if (currencyList?.length > 0) {
      setValue("WATBCurrencyList", currencyList[0]);
      setValue(`addingScheduledCurrencyList0`, currencyList[0])
    }

    if (!watch("witnesses") || watch("witnesses").length === 0) {
      setValue("witnesses", [{ witnessName: "", witnessesNationalNumber: "" }]);
    }

    if (!watch("scheduling") || watch("scheduling").length === 0) {
      setValue("scheduling", [{ addingDate: "", totalAmount: "" }]);
    }
  }, [setValue, watch("scheduling")]);


  const addNewWitness = () => {
    appendWitness({ witnessName: "", WitnessesNationalNumber: "" });
  };

  const removeWitnessRow = (index) => {
    removeWitness(index);
  };

  const addingScheduled = () => {
    addingScheduledRow({ addingDate: "", totalAmount: "" });
  }

  const removeScheduled = (index) => {
    if (index >= 0 && index < scheduling.length) {
      removeScheduledRow(index);
    }
  };



  const currencyList = [
    { name: { ar: "دينا اردني", en: "Jordanian Dinar" }, code: "JOD" },
    { name: { ar: "دولار امريكي", en: "US Dollar" }, code: "USD" },
    { name: { ar: "درهم امراتي", en: "UAE Dirham" }, code: "AED" },
  ];

  const bankNames = [
    { name: { ar: "بنك ابو ظبي الاول", en: "FAB" }, code: "FAB" },
    { name: { ar: "بنك الاهلى القطري", en: "QNB" }, code: "QNB" },
  ];

  const durationList = [
    { name: { ar: "شهري", en: "Monthly", code: "MO" } },
    { name: { ar: "ربع سنوي", en: "Quarterly", code: "QU" } },
    { name: { ar: "نصف سنوي", en: "Semi-Annually", code: "SA" } },
    { name: { ar: "سنوي", en: "Annually", code: "AN" } }
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
        <div className="writtenAcknowledgmentTrustBond row">
          <h4>اضافة بيانات كمبيالة</h4>

          {/* <div className="w-50-16px">
            <label>
              طريقة السداد
            </label>

            <div className="radioButtonDiv">
              <RadioButtonComponent
                name="schedulingType"
                label="شهري"
                register={register}
                errors={errors}
                value={'monthly'}
                watch={watch}
                onChange={(e) => { setValue("schedulingType", e.value === 'monthly' && 'monthly'); }}
                checked={getValues().schedulingType === 'monthly'}
              />

              <RadioButtonComponent
                name="schedulingType"
                label="ربع سنوي"
                register={register}
                errors={errors}
                value={'quarterly'}
                watch={watch}
                onChange={(e) => { setValue("schedulingType", e.value === 'quarterly' && 'quarterly'); }}
                checked={getValues().schedulingType === 'quarterly'}
              />

              <RadioButtonComponent
                name="schedulingType"
                label="بدون جدولة"
                register={register}
                errors={errors}
                value={'semiAnnual'}
                watch={watch}
                onChange={(e) => { setValue("schedulingType", e.value === 'semiAnnual' && 'semiAnnual'); }}
                checked={getValues().schedulingType === 'semiAnnual'}
              />

              <RadioButtonComponent
                name="schedulingType"
                label="بدون جدولة"
                register={register}
                errors={errors}
                value={'annual'}
                watch={watch}
                onChange={(e) => { setValue("schedulingType", e.value === 'annual' && 'annual'); }}
                checked={getValues().schedulingType === 'annual'}
              />
            </div>
          </div>

          <div className="w-50-16px">
            <label>
              طريقة الجدولة
            </label>

            <div className="radioButtonDiv">
              <RadioButtonComponent
                name="claimType"
                label="غب الطلب"
                register={register}
                errors={errors}
                value={'onDemand'}
                watch={watch}
                onChange={(e) => { setValue("claimType", e.value === 'onDemand' && 'onDemand'); }}
                checked={getValues().claimType === 'onDemand'}
              />

              <RadioButtonComponent
                name="claimType"
                label="جدولة"
                register={register}
                errors={errors}
                value={'scheduling'}
                watch={watch}
                onChange={(e) => { setValue("claimType", e.value === 'scheduling' && 'scheduling'); }}
                checked={getValues().claimType === 'scheduling'}
              />

              <RadioButtonComponent
                name="claimType"
                label="بدون جدولة"
                register={register}
                errors={errors}
                value={'noScheduling'}
                watch={watch}
                onChange={(e) => { setValue("claimType", e.value === 'noScheduling' && 'noScheduling'); }}
                checked={getValues().claimType === 'noScheduling'}
              />
            </div>
          </div> */}

          <DropDownComponent
            id="WATBList"
            name="WATB"
            register={register}
            watch={watch}
            setValueMethod={setValue}
            options={bankNames}
            optionLabel={`name.${lang}`}
            errors={errors?.bankName ? { bankName: errors.bankName } : undefined}
            onChange={(e) => setValue("WATB", e.value)}
            placeholder="اختر اسم من قائمة الخيارات"
            rules={{ required: " يجب اختيار نوع السند" }}
            label="اقرار خطي / سند امانة"
          />

          <DatePickerComponent
            id="WATBIssueDate-id"
            name="issueDate"
            label={"تاريخ التحرير"}
            placeholder={"DD/MM/YYYY"}
            register={register}
            // rules={{ required: "يجب اختيار تاريخ تحرير" }}
            errors={errors}
            setValueMethod={setValue}
            watch={watch}
            onChange={(e) => setValue("issueDate", e.target.value)}
          />

          <div className="radioButtonDiv">
            <RadioButtonComponent
              name="claimType"
              label="غب الطلب"
              register={register}
              errors={errors}
              value={'onDemand'}
              watch={watch}
              onChange={(e) => { setValue("claimType", e.value === 'onDemand' && 'onDemand'); }}
              checked={getValues().claimType === 'onDemand'}
            />

            <RadioButtonComponent
              name="claimType"
              label="جدولة"
              register={register}
              errors={errors}
              value={'scheduling'}
              watch={watch}
              onChange={(e) => { setValue("claimType", e.value === 'scheduling' && 'scheduling'); }}
              checked={getValues().claimType === 'scheduling'}
            />

            <RadioButtonComponent
              name="claimType"
              label="بدون جدولة"
              register={register}
              errors={errors}
              value={'noScheduling'}
              watch={watch}
              onChange={(e) => { setValue("claimType", e.value === 'noScheduling' && 'noScheduling'); }}
              checked={getValues().claimType === 'noScheduling'}
            />
          </div>

          {watch('claimType') === 'onDemand' && (

            <>
              <div className="w-100">
                <div className="ammountDiv row">
                  <InputComponent
                    id="WATBAmount-id"
                    type="text"
                    name="WATBAmount"
                    placeholder="المبلغ"
                    register={register}
                    errors={errors}
                    setValueMethod={setValue}
                    watch={watch}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, "");
                      setValue("WATBAmount", numericValue);
                    }}
                    rules={{ required: "يجب ادخال قيمة الكمبيالة" }}
                    label="اجمالي المبلغ"
                  />

                  <DropDownComponent
                    id="WATBCurrencyList-id"
                    name="WATBCurrencyList"
                    register={register}
                    watch={watch}
                    setValueMethod={setValue}
                    options={currencyList}
                    optionLabel={`name.${lang}`}
                    errors={errors}
                    onChange={(e) => setValue("WATBCurrencyList", e.value)}
                    placeholder="دينار"
                    rules={{ required: "يجب اختيار العملة" }}
                  />
                </div>
              </div>

              <InputComponent
                id="WATBdebtorsName-id"
                type="text"
                name="debtorsName"
                label="اسم المدين"
                placeholder="اسم المدين"
                register={register}
                rules={{ required: 'يجب ادخال اسم المدين' }}
                errors={errors}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => setValue("debtorsName", e.target.value)}
              />

              <InputComponent
                id="WATBNationalNumber-id"
                type="text"
                name="WATBNationalNumber"
                label={translate("createNewProfile.nationalNumber")}
                placeholder={translate("createNewProfile.exm") + "1234567"}
                register={register}
                rules={{ required: 'يجب ادخال الرقم الوطني' }}
                errors={errors}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setValue("WATBNationalNumber", numericValue);
                }}
              />
            </>
          )}

          {watch('claimType') === 'scheduling' && (
            <>
              <InputComponent
                id="WATBdebtorsName-id"
                type="text"
                name="debtorsName"
                label="اسم المدين"
                placeholder="اسم المدين"
                register={register}
                rules={{ required: 'يجب ادخال اسم المدين' }}
                errors={errors}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => setValue("debtorsName", e.target.value)}
              />

              <InputComponent
                id="WATBNationalNumber-id"
                type="text"
                name="WATBNationalNumber"
                label={translate("createNewProfile.nationalNumber")}
                placeholder={translate("createNewProfile.exm") + "1234567"}
                register={register}
                rules={{ required: 'يجب ادخال الرقم الوطني' }}
                errors={errors}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setValue("WATBNationalNumber", numericValue);
                }}
              />

              <div className="w-100">
                <DropDownComponent
                  id="durationSelectionList-id"
                  name="durationSelectionList"
                  register={register}
                  watch={watch}
                  setValueMethod={setValue}
                  options={durationList}
                  optionLabel={`name.${lang}`}
                  errors={errors?.durationList ? { durationList: errors.durationList } : undefined}
                  onChange={(e) => setValue("durationSelectionList", e.value)}
                  placeholder="اختر المدة"
                  rules={{ required: " يجب تحديد المدة" }}
                  label="تحديد المدة"
                  className='w-50-16px'
                />
              </div>

              {scheduling?.map((field, index) => (
                <div key={field.id} className="dynamicRow">

                  <DatePickerComponent
                    id={`addingScheduledDate${field.id}id`}
                    name={`scheduling[${index}].addingDate`}
                    label={"اضافة التاريخ"}
                    placeholder={"DD/MM/YYYY"}
                    register={register}
                    // rules={{ required: "يجب اختيار تاريخ تحرير" }}
                    errors={errors?.scheduling?.[index]?.addingDate}
                    setValueMethod={setValue}
                    watch={watch}
                    onChange={(e) => setValue(`scheduling[${index}].addingDate`, e.target.value)}
                  />

                  <div className="amountDeleteDiv">
                    <div className="ammountDiv">
                      <InputComponent
                        id={`addingScheduledAmount${field.id}id`}
                        type="text"
                        name={`scheduling[${index}].totalAmount`}
                        placeholder="المبلغ"
                        register={register}
                        errors={errors}
                        setValueMethod={setValue}
                        watch={watch}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9]/g, "");
                          setValue(`scheduling[${index}].totalAmount`, numericValue);
                        }}
                        // rules={{ required: "يجب ادخال قيمة الكمبيالة" }}
                        label="اجمالي المبلغ"
                      />

                      <DropDownComponent
                        id={`addingScheduledCurrencyList${index}-id`}
                        name={`scheduling[${index}].currency`}
                        register={register}
                        watch={watch}
                        setValueMethod={setValue}
                        options={currencyList}
                        optionLabel={`name.${lang}`}
                        errors={errors}
                        onChange={(e) => setValue(`scheduling[${index}].currency`, e.value)}
                        placeholder="دينار"
                        rules={{ required: "يجب اختيار العملة" }}
                      />
                    </div>

                    {index !== 0 && (
                      <span onClick={() => removeScheduled(index)} className="sideBtnStyle deleteBtn">
                        حذف
                      </span>
                    )}

                  </div>

                  {index === scheduling.length - 1 && (
                    <span onClick={addingScheduled} className="w-100 sideBtnStyle addBtn">
                      اضافة جدولة
                    </span>
                  )}
                </div>
              ))}
            </>
          )}

          {watch('claimType') === 'noScheduling' && (

            <DatePickerComponent
              id="WATBlegalBondsDueDate"
              name="WATBdueDate"
              label={"تاريخ الاستحقاق"}
              placeholder={"DD/MM/YYYY"}
              register={register}
              rules={{ required: "يجب اختيار تاريخ الاستحقاق" }}
              errors={errors?.dueDate ? { dueDate: errors.dueDate } : undefined}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => setValue("WATBdueDate", e.target.value)}
              className="col-md-6 mb-4"
            />
          )}

          {(watch('claimType') && watch('claimType') !== 'noScheduling') &&
            <>
              <CheckBoxComponent
                id="WATBCheckBoxWitnesses-id"
                name="WATBCheckBoxWitnesses"
                label="يوجد شهود"
                register={register}
                errors={errors}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => setValue("WATBCheckBoxWitnesses", e.value)}
              />

              {watch("WATBCheckBoxWitnesses") && witnesses?.map((field, index) => (
                <div key={field.id} className="dynamicRow">
                  <InputComponent
                    id={`WATBWitnessesName_${field.id}`}
                    type="text"
                    name={`witnesses.${index}.witnessName`}
                    placeholder="ادخل اسم الشاهد"
                    register={register}
                    errors={errors?.witnesses?.[index]?.debtorName}
                    setValueMethod={setValue}
                    watch={watch}
                    onChange={(e) => {
                      const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF]/g, "");
                      setValue(`witnesses.${index}.witnessName`, letterValue);
                    }}
                    value={watch(`witnesses.${index}.witnessName`)}
                    label="اسم الشاهد"
                  />

                  <div className="row-withSideBtn">
                    <InputComponent
                      id={`WATBWitnessesNationalNumber-_${field.id}`}
                      type="text"
                      name={`witnesses.${index}.WitnessesNationalNumber`}
                      label={translate("createNewProfile.nationalNumber")}
                      placeholder={translate("createNewProfile.exm") + "1234567"}
                      register={register}
                      rules={{ required: 'يجب ادخال الرقم الوطني' }}
                      errors={errors}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, "");
                        setValue(`witnesses.${index}.WitnessesNationalNumber`, numericValue);
                      }}
                    />

                    {index !== 0 && (
                      <span onClick={() => removeWitnessRow(index)} className="sideBtnStyle deleteBtn">
                        حذف
                      </span>
                    )}
                  </div>

                  {index === witnesses.length - 1 && (
                    <span onClick={addNewWitness} className="w-100 sideBtnStyle addBtn">
                      اضافة شاهد
                    </span>
                  )}
                </div>
              ))}
            </>}

          <div className="uploaderContainer w-100">
            <h4>تحميل اقرار خطي/ سند امانة</h4>

            <div className="row">
              <AttachmentMultiFilesComponent
                attachList={e => console.log(e)}
                fileTypeList={[
                  { name: { en: 'file Type one', ar: 'نوع الملف الاول' }, code: 'one' },
                  { name: { en: 'file Type two', ar: 'نوع الملف الثاني' }, code: 'two' }
                ]}
                lang={lang}
                fileTypePlaceHolder={'Select a File Type'}
              />
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
              إضافة كمبيالة
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default WrittenAcknowledgmentTrustBond;
