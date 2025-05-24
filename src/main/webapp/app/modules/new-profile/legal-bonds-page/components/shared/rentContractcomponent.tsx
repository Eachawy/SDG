import {
  AttachmentFileComponent,
  ButtonComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
  RadioButtonComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { Storage } from "react-jhipster";
import { useAppDispatch, useAppSelector } from "app/config/store";
import {
  useFieldArray,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CurrencyList } from "app/modules/shared/constants";
import { addLegalBond } from "../legalBonds.reducer";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import dayjs from "dayjs";
import _ from 'lodash';
import { setInitAttachFile } from "app/shared/util/utils";

const RentContract = (props) => {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showSchedulingTypeError, setShowSchedulingTypeError] = useState(false);
  const [showPaymentTypeError, setShowPaymentTypeError] = useState(false);
  const { register, handleSubmit, control, formState: { errors }, getValues, setValue, watch, } = useForm({ mode: "onTouched" });

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);
  const $fileId = ($createFileResponse?.collectionFile?.id) ?? Storage.session.get('fileId');
  const $addLegalBondResponse = useAppSelector(state => state.legalBonds.addLegalBondResponse);


  useEffect(() => {
    setValue("inputForm", "legalBonds");
    if ($addLegalBondResponse?.id) {
      props.closepopUpFn(false);
    }
  }, [setValue, $addLegalBondResponse]);

  useEffect(() => {
    handelEditMode()
  }, [props.rowDataEdit, setValue]);

  const handelEditMode = () => {
    if (props.rowDataEdit?.id) {
      setValue('schedulingType', 'manualScheduling');
      setValue('paymentType', props.rowDataEdit?.paymentPeriod);
      for (let i = 0; i < props.rowDataEdit.paymentSchedules?.length; i++) {
        const x = props.rowDataEdit.paymentSchedules[i];
        addingScheduledRow({
          addingDate: "", // placeholder to create the row
          totalAmount: "",
          currency: null
        });

        // Wait for the row to be appended before setting values
        setTimeout(() => {
          setValue(`schedulingList[${i}].addingDate`, new Date(x?.paymentDate));
          setValue(`schedulingList[${i}].totalAmount`, x?.amount);
          setValue(`schedulingList[${i}].currency`, _.find(CurrencyList, item => item.code === x?.currency));
        }, 100);
      }
    }
  }

  const { fields: schedulingList, append: addingScheduledRow, remove: removeScheduledRow, replace: replaceScheduledList } = useFieldArray({
    control,
    name: "schedulingList",
  });

  const { fields: autoSchedulingList, append: addingAutoScheduledRow, remove: removeAutoScheduledRow } = useFieldArray({
    control,
    name: "autoSchedulingList",
  });

  useEffect(() => {
    if (!watch("schedulingList") || watch("schedulingList").length === 0) {
      setValue("schedulingList", [{ addingDate: "", totalAmount: "", currency: "" }]);
    }
  }, [setValue, watch("schedulingList")]);

  useEffect(() => {
    if (watch("schedulingType") === "autoScheduling") {
      const paymentElementsCount = {
        MONTHLY: 12,
        QUARTERLY: 4,
        HALF_YEARLY: 2,
        YEARLY: 1,
      };
      const count = paymentElementsCount[watch("paymentType")] || 0;

      // reset array before setting new values
      removeAutoScheduledRow();
      for (let i = 0; i < count; i++) {
        addingAutoScheduledRow({ addingDate: "", totalAmount: "", currency: "" });
      }
    }
  }, [watch("schedulingType"), watch("paymentType")]);

  const addingScheduled = () => {
    if (watch("schedulingType") === "manualScheduling") {
      addingScheduledRow({ addingDate: "", totalAmount: "", currency: "" })
    }
  };

  const removeScheduled = (index) => {
    if (index >= 0 && index < schedulingList.length) {
      removeScheduledRow(index);
    }
  };

  const addRentContractFn = async (data: any) => {
    if (!watch("schedulingType")) {
      setShowSchedulingTypeError(true);
      return
    } else {
      setShowSchedulingTypeError(false);
    }
    if (!watch("paymentType")) {
      setShowPaymentTypeError(true);
      return
    } else {
      setShowPaymentTypeError(false);
    }
    setShowLoader(true);

    const schedulingFormatted = data.schedulingList?.length > 0 && data.schedulingList.map((item: any) => {
      return {
        paymentDate: dayjs(item.addingDate).format('YYYY-MM-DD'),
        amount: Number(item.totalAmount),
        currency: item.currency?.code
      }
    });

    const autoSchedulingFormatted = data.autoSchedulingList?.length > 0 && data.autoSchedulingList.map((item: any) => {
      return {
        paymentDate: dayjs(item.addingDate).format('YYYY-MM-DD'),
        amount: Number(item.totalAmount),
        currency: item.currency?.code
      }
    });

    const obj = {
      fileId: $fileId,
      rentedContract: {
        ...(props.rowDataEdit?.id && { id: props.rowDataEdit?.id }),
        paymentPeriod: data.paymentType,
        paymentSchedules: watch("schedulingType") === 'autoScheduling' ? autoSchedulingFormatted : schedulingFormatted,
        attachments: [
          {
            attachmentType: "RENT_CONTRACT",
            name: data.contractAttach?.name,
            content: data.contractAttach?.base64,
            mimeType: "PDF"
          }
        ]
      }
    }

    // Call API
    await dispatch(addLegalBond(obj));
    setShowLoader(false);
  };

  return (
    <>
      <LoaderComponent show={showLoader} />
      <div className="popupView">
        <div className="content">
          <div className="leaseContract row">
            <h4>اضافة بيانات عقد ايجار</h4>

            <div className="w-50">
              <label>
                طريقة الجدولة
              </label>

              <div className="radioButtonDiv">
                <RadioButtonComponent
                  name="autoScheduling"
                  group="schedulingType"
                  label="جدولة تلقائية"
                  register={register}
                  errors={errors}
                  value={'autoScheduling'}
                  watch={watch}
                  onChange={() => {
                    setShowSchedulingTypeError(false);
                    setValue("schedulingType", "autoScheduling");
                    setValue("schedulingList", []);
                  }}
                  checked={getValues().schedulingType === 'autoScheduling'}
                />

                <RadioButtonComponent
                  name="manualScheduling"
                  group="schedulingType"
                  label="جدولة يدوية"
                  register={register}
                  errors={errors}
                  value={'manualScheduling'}
                  watch={watch}
                  onChange={() => {
                    setShowSchedulingTypeError(false);
                    setValue("schedulingType", "manualScheduling");
                    setValue("autoSchedulingList", []);
                    setValue("schedulingList", []);
                    setValue("paymentType", "");
                  }}
                  checked={getValues().schedulingType === 'manualScheduling'}
                />

              </div>

              {showSchedulingTypeError &&
                <span className="errorMsg">
                  يجب اختيار نوع الجدولة
                </span>
              }
            </div>


            <div className="w-50">
              <label>
                طريقة السداد
              </label>

              <div className="radioButtonDiv">

                <RadioButtonComponent
                  name="MONTHLY"
                  group="paymentType"
                  label="شهري"
                  register={register}
                  errors={errors}
                  value={'MONTHLY'}
                  watch={watch}
                  onChange={(e) => {
                    setShowPaymentTypeError(false);
                    setValue("paymentType", 'MONTHLY')
                  }
                  }
                  checked={getValues().paymentType === 'MONTHLY'}
                />

                <RadioButtonComponent
                  name="QUARTERLY"
                  group="paymentType"
                  label="ربع سنوي"
                  register={register}
                  errors={errors}
                  value={'QUARTERLY'}
                  watch={watch}
                  onChange={(e) => {
                    setShowPaymentTypeError(false);
                    setValue("paymentType", 'QUARTERLY')
                  }}
                  checked={getValues().paymentType === 'QUARTERLY'}
                />

                <RadioButtonComponent
                  name="HALF_YEARLY"
                  group="paymentType"
                  label="نص سنوي"
                  register={register}
                  errors={errors}
                  value={'HALF_YEARLY'}
                  watch={watch}
                  onChange={(e) => {
                    setShowPaymentTypeError(false);
                    setValue("paymentType", 'HALF_YEARLY')
                  }
                  }
                  checked={getValues().paymentType === 'HALF_YEARLY'}
                />

                <RadioButtonComponent
                  name="YEARLY"
                  group="paymentType"
                  label="سنوي"
                  register={register}
                  errors={errors}
                  value={'YEARLY'}
                  watch={watch}
                  onChange={(e) => {
                    setShowPaymentTypeError(false);
                    setValue("paymentType", 'YEARLY')
                  }
                  }
                  checked={getValues().paymentType === 'YEARLY'}
                />
              </div>

              {showPaymentTypeError &&
                <span className="errorMsg">
                  يجب اختيار طريقة السداد
                </span>
              }
            </div>

            <div className="autoSchedulingDiv flex-row">
              {watch("schedulingType") === "autoScheduling" && watch("paymentType") &&
                autoSchedulingList.map((field, i) => (
                  <div key={field.id} className="dynamicRow">
                    <div>
                      <DatePickerComponent
                        id={`addingAutoScheduledDate${field.id}id`}
                        name={`autoSchedulingList[${i}].addingDate`}
                        dateFormat="dd/mm/yy"
                        label={"تاريخ بدأ الإيجار"}
                        placeholder={"DD/MM/YYYY"}
                        rules={{ required: "يجب اختيار تاريخ بدأ الإيجار" }}
                        onChange={(e) => setValue(`autoSchedulingList[${i}].addingDate`, e.target.value)}
                        register={register as unknown as UseFormRegister<Record<string, unknown>>}
                        control={control}
                        errors={
                          errors?.autoSchedulingList?.[i]?.addingDate
                            ? {
                              [`addingAutoScheduledDate${field.id}id`]:
                                errors?.autoSchedulingList?.[i]?.addingDate,
                            }
                            : undefined
                        }
                        setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                        watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                      />
                      {errors?.autoSchedulingList?.[i]?.addingDate &&
                        <span className="errorMsg">
                          يجب اختيار تاريخ بدأ الإيجار
                        </span>
                      }
                    </div>

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <div className="customEightWidthDiv">
                          <InputComponent
                            id={`addingAutoScheduledAmount${field.id}id`}
                            type="text"
                            name={`autoSchedulingList[${i}].totalAmount`}
                            placeholder="المبلغ"
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/[^0-9]/g, "");
                              setValue(`autoSchedulingList[${i}].totalAmount`, numericValue);
                            }}

                            rules={{ required: "يجب ادخال قيمة الايجار" }}
                            label="قيمة الدفعة"
                            register={register as unknown as UseFormRegister<Record<string, unknown>>}
                            control={control}
                            errors={
                              errors?.autoSchedulingList?.[i]?.totalAmount
                                ? {
                                  [`addingAutoScheduledAmount${field.id}id`]:
                                    errors?.autoSchedulingList?.[i]?.totalAmount,
                                }
                                : undefined
                            }
                            setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                            watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                          />
                          {errors?.autoSchedulingList?.[i]?.totalAmount &&
                            <span className="errorMsg">
                              يجب ادخال قيمة الإيجار
                            </span>
                          }
                        </div>

                        <DropDownComponent
                          id={`addingAutoScheduledCurrencyList${field.id}-id`}
                          name={`autoSchedulingList[${i}].currency`}
                          options={CurrencyList}
                          optionLabel={`name.${$lang}`}
                          setValue={CurrencyList[0]}
                          onChange={(e) => setValue(`autoSchedulingList[${i}].currency`, e.value)}
                          placeholder="دينار"
                          rules={{ required: "يجب اختيار العملة" }}
                          register={register as unknown as UseFormRegister<Record<string, unknown>>}
                          control={control}
                          errors={
                            errors?.autoSchedulingList?.[i]?.currency
                              ? {
                                [`addingAutoScheduledCurrencyList${field.id}-id`]:
                                  errors?.autoSchedulingList?.[i]?.currency,
                              }
                              : undefined
                          }
                          setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                          watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>


            {watch("schedulingType") === "manualScheduling" && watch("paymentType") &&
              schedulingList?.map((field, index) => (
                <div key={field.id} className="dynamicRow">
                  <div>
                    <DatePickerComponent
                      id={`addingScheduledDate${field.id}id`}
                      name={`schedulingList[${index}].addingDate`}
                      label={"تاريخ الاستحقاق"}
                      placeholder={"DD/MM/YYYY"}
                      dateFormat="dd/mm/yy"
                      rules={{ required: "يجب اختيار تاريخ الاستحقاق" }}
                      onChange={(e) => setValue(`schedulingList[${index}].addingDate`, e.target.value)}
                      register={register as unknown as UseFormRegister<Record<string, unknown>>}
                      control={control}
                      errors={
                        errors?.schedulingList?.[index]?.addingDate
                          ? {
                            [`addingScheduledDate${field.id}id`]:
                              errors.schedulingList[index].addingDate,
                          }
                          : undefined
                      }
                      setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                      watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                    />
                    {errors.schedulingList?.[index]?.addingDate &&
                      <span className="errorMsg">
                        يجب اختيار تاريخ بدأ الإيجار
                      </span>
                    }
                  </div>

                  <div className="amountDeleteDiv">
                    <div className="ammountDiv">
                      <div className="customEightWidthDiv">
                        <InputComponent
                          id={`addingScheduledAmount${field.id}id`}
                          type="text"
                          name={`schedulingList[${index}].totalAmount`}
                          placeholder="المبلغ"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "");
                            setValue(`schedulingList[${index}].totalAmount`, numericValue);
                          }}
                          rules={{ required: "يجب ادخال قيمة الإيجار" }}
                          label="قيمة الإيجار"
                          register={register as unknown as UseFormRegister<Record<string, unknown>>}
                          control={control}
                          errors={
                            errors?.schedulingList?.[index]?.totalAmount
                              ? {
                                [`addingScheduledAmount${field.id}id`]:
                                  errors.schedulingList[index].totalAmount,
                              }
                              : undefined
                          }
                          setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                          watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                        />
                        {errors.schedulingList?.[index]?.totalAmount &&
                          <span className="errorMsg">
                            يجب ادخال قيمة الإيجار
                          </span>
                        }
                      </div>

                      <DropDownComponent
                        id={`addingScheduledCurrencyList${index}-id`}
                        name={`schedulingList[${index}].currency`}
                        options={CurrencyList}
                        optionLabel={`name.${$lang}`}
                        setValue={CurrencyList[0]}
                        onChange={(e) => setValue(`schedulingList[${index}].currency`, e.value)}
                        placeholder="دينار"
                        rules={{ required: "يجب اختيار العملة" }}
                        register={register as unknown as UseFormRegister<Record<string, unknown>>}
                        control={control}
                        errors={
                          errors?.schedulingList?.[index]?.currency
                            ? {
                              [`addingScheduledCurrencyList${index}-id`]:
                                errors?.schedulingList?.[index]?.currency,
                            }
                            : undefined
                        }
                        setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                        watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                      />
                    </div>

                    {index !== 0 && (
                      <span onClick={() => removeScheduled(index)} className="sideBtnStyle deleteBtn">
                        حذف
                      </span>
                    )}

                  </div>

                  {index === schedulingList.length - 1 && (
                    <span onClick={addingScheduled} className="sideBtnStyle addBtn">
                      اضافة جدولة
                    </span>
                  )}
                </div>
              ))}

            <div className="uploaderContainer w-100">
              <h4>تحميل عقد الايجار</h4>

              <div className="row">
                <AttachmentFileComponent
                  id="contractAttach"
                  name="contractAttach"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال صورة عقد الايجار' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("contractAttach", e)}
                  Class="col-md-12 col-lg-6"
                  initFile={setInitAttachFile(props.rowDataEdit?.attachments[0])}
                />
              </div>
            </div>

            <div className="actionBtns">
              <ButtonComponent Class={'BtnCancel'} onClick={() => props.closepopUpFn(false)}>إلغاء</ButtonComponent>
              <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(addRentContractFn)}>
                {props.rowDataEdit?.id ? 'تعديل عقد ايجار' : 'اضافة عقد ايجار'}
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default RentContract;
