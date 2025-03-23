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

const LeaseContract = (props) => {

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

  // const schedulingTypeValue = watch("schedulingType");
  // const paymentTypeValue = watch("paymentType");

  // useEffect(() => {
  //   if (schedulingTypeValue === "manualScheduling") {
  //     setValue("autoscheduling", []);
  //     setValue("paymentType", "");
  //   } else if (schedulingTypeValue === "autoScheduling") {
  //     setValue("scheduling", []);
  //   }
  // }, [schedulingTypeValue, setValue]);

  useEffect(() => {
    if (watch("schedulingType") === "autoScheduling") {
      const paymentElementsCount = {
        monthly: 12,
        quarterly: 4,
        semiAnnual: 2,
        annual: 1,
      };

      const count = paymentElementsCount[watch("paymentType")] || 0;

      setValue(
        "autoscheduling",
        Array.from({ length: count }, () => ({ addingDate: "", totalAmount: "" }))
      );
    }
  }, [watch("paymentType"), watch("schedulingType"), setValue]);

  const addingScheduled = () => {
    if (watch("schedulingType") === "manualScheduling") {
      addingScheduledRow({ addingDate: "", totalAmount: "" });
    }
  };

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

  const renderPaymentElements = (paymentType) => {
    let count;
    switch (paymentType) {
      case 'monthly':
        count = 12;
        break;
      case 'quarterly':
        count = 4;
        break;
      case 'semiAnnual':
        count = 2;
        break;
      case 'annual':
        count = 1;
        break;
      default:
        count = 0;
    }

    const elements = [];
    for (let i = 0; i < count; i++) {
      if (watch("schedulingType") === "autoScheduling") {
        elements.push(
          <div key={i} className="dynamicRow">

            <DatePickerComponent
              id={`addingAutoScheduledDate${i}id`}
              name={`autoscheduling[${i}].addingDate`}
              label={"تاريخ بدأ الإيجار"}
              placeholder={"DD/MM/YYYY"}
              register={register}
              rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
              errors={errors?.scheduling?.[i]?.addingDate}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => setValue(`autoscheduling[${i}].addingDate`, e.target.value)}
            />

            <div className="amountDeleteDiv">
              <div className="ammountDiv">
                <InputComponent
                  id={`addingScheduledAmount${i}id`}
                  type="text"
                  name={`autoscheduling[${i}].totalAmount`}
                  placeholder="المبلغ"
                  register={register}
                  errors={errors}
                  setValueMethod={setValue}
                  watch={watch}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    setValue(`autoscheduling[${i}].totalAmount`, numericValue);
                  }}
                  rules={{ required: "يجب ادخال قيمة الايجار" }}
                  label="قيمة الدفعة"
                />

                <DropDownComponent
                  id={`addingScheduledCurrencyList${i}-id`}
                  name={`scheduling[${i}].currency`}
                  register={register}
                  watch={watch}
                  setValueMethod={setValue}
                  options={currencyList}
                  optionLabel={`name.${lang}`}
                  errors={errors}
                  setValue={currencyList[0]}
                  onChange={(e) => setValue(`scheduling[${i}].currency`, e.value)}
                  placeholder="دينار"
                  rules={{ required: "يجب اختيار العملة" }}
                />
              </div>
            </div>
          </div>
        );
      }
    }
    return elements;
  };

  return (
    <div className="popupView">
      <div className="content">
        <div className="leaseContract row">
          <h4>اضافة بيانات عقد ايجار</h4>

          <div className="w-100">
            <label>
              طريقة الجدولة
            </label>

            <div className="radioButtonDiv">
              <RadioButtonComponent
                name="schedulingType"
                label="جدولة تلقائية"
                register={register}
                errors={errors}
                value={'autoScheduling'}
                watch={watch}
                onChange={() => {
                  setValue("schedulingType", "autoScheduling");
                  setValue("scheduling", []);
                }}
                checked={getValues().schedulingType === 'autoScheduling'}
              />

              <RadioButtonComponent
                name="schedulingType"
                label="جدولة يدوية"
                register={register}
                errors={errors}
                value={'manualScheduling'}
                watch={watch}
                onChange={() => {
                  setValue("schedulingType", "manualScheduling");
                  setValue("autoscheduling", []); // Clear auto-scheduling rows when switching
                  setValue("paymentType", ""); // Reset payment type
                }}
                checked={getValues().schedulingType === 'manualScheduling'}
              />
            </div>
          </div>

          {watch("schedulingType") === "manualScheduling" &&
            scheduling?.map((field, index) => (
              <div key={field.id} className="dynamicRow">

                <DatePickerComponent
                  id={`addingScheduledDate${field.id}id`}
                  name={`scheduling[${index}].addingDate`}
                  label={"تاريخ الاستحقاق"}
                  placeholder={"DD/MM/YYYY"}
                  register={register}
                  rules={{ required: "يجب اختيار تاريخ الاستحقاق" }}
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
                      rules={{ required: "يجب ادخال قيمة الكمبيالة" }}
                      label="قيمة الإيجار"
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
                  <span onClick={addingScheduled} className="sideBtnStyle addBtn">
                    اضافة جدولة
                  </span>
                )}
              </div>
            ))}

          {watch("schedulingType") === "autoScheduling" &&
            <>
              <div className="w-100">
                <label>
                  طريقة السداد
                </label>

                <div className="radioButtonDiv">
                  <RadioButtonComponent
                    name="paymentType"
                    label="شهري"
                    register={register}
                    errors={errors}
                    value={'monthly'}
                    watch={watch}
                    onChange={(e) => setValue("paymentType", e.value)}
                    checked={getValues().paymentType === 'monthly'}
                  />

                  <RadioButtonComponent
                    name="paymentType"
                    label="ربع سنوي"
                    register={register}
                    errors={errors}
                    value={'quarterly'}
                    watch={watch}
                    onChange={(e) => setValue("paymentType", e.value)}
                    checked={getValues().paymentType === 'quarterly'}
                  />

                  <RadioButtonComponent
                    name="paymentType"
                    label="نص سنوي"
                    register={register}
                    errors={errors}
                    value={'semiAnnual'}
                    watch={watch}
                    onChange={(e) => setValue("paymentType", e.value)}
                    checked={getValues().paymentType === 'semiAnnual'}
                  />

                  <RadioButtonComponent
                    name="paymentType"
                    label="سنوي"
                    register={register}
                    errors={errors}
                    value={'annual'}
                    watch={watch}
                    onChange={(e) => setValue("paymentType", e.value)}
                    checked={getValues().paymentType === 'annual'}
                  />
                </div>
              </div>

              <div className="autoSchedulingDiv flex-row">
                {renderPaymentElements(watch("paymentType"))}




                {/* case 'monthly':
                count = 12;
                break;
                case 'quarterly':
                count = 4;
                break;
                case 'semiAnnual':
                count = 2;
                break;
                case 'annual':
                count = 1;
                break;
                default:
                count = 0; */}




                {/* {(watch("schedulingType") === "autoScheduling") &&
                  watch("paymentType") === 'monthly' &&
                  <div className="dynamicRow">

                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>


                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>



                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>



                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>



                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>



                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>


                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>



                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>



                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>



                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>



                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>



                    <DatePickerComponent
                      id={`addingAutoScheduledDate1id`}
                      name={`autoscheduling1.addingDate`}
                      label={"تاريخ بدأ الإيجار"}
                      placeholder={"DD/MM/YYYY"}
                      register={register}
                      rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                      errors={errors?.scheduling?.[1]?.addingDate}
                      setValueMethod={setValue}
                      watch={watch}
                      onChange={(e) => setValue(`autoscheduling1.addingDate`, e.target.value)}
                    />

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <InputComponent
                          id={`addingScheduledAmount1id`}
                          type="text"
                          name={`autoscheduling1.totalAmount`}
                          placeholder="المبلغ"
                          register={register}
                          errors={errors}
                          setValueMethod={setValue}
                          watch={watch}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`autoscheduling1.totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الايجار" }}
                          label="قيمة الدفعة"
                        />

                        <DropDownComponent
                          id={`addingScheduledCurrencyList1-id`}
                          name={`scheduling1.currency`}
                          register={register}
                          watch={watch}
                          setValueMethod={setValue}
                          options={currencyList}
                          optionLabel={`name.${lang}`}
                          errors={errors}
                          setValue={currencyList[0]}
                          onChange={(e) => setValue(`scheduling1.currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                        />
                      </div>
                    </div>
                  </div>
                } */}





              </div>
            </>
          }

          <div className="uploaderContainer w-100">
            <h4>تحميل اقرار خطي/ سند امانة</h4>

            <div className="row">
              {/* <AttachmentMultiFilesComponent
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
              />
              <AttachmentFileComponent
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
              إضافة كمبيالة
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LeaseContract;
