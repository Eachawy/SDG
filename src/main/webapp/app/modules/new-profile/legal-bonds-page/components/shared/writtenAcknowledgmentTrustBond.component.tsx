import {
  AttachmentFileComponent,
  ButtonComponent,
  CheckBoxComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
  RadioButtonComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { translate, Storage } from "react-jhipster";
import { useAppDispatch, useAppSelector } from "app/config/store";
import {
  useFieldArray,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CurrencyList, TrustWrittenList } from "app/modules/shared/constants";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import dayjs from "dayjs";
import { addLegalBond } from "../legalBonds.reducer";
import _ from 'lodash'

const WrittenAcknowledgmentTrustBond = (props) => {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showRequestTypeError, setShowRequestTypeError] = useState(false);
  const { register, handleSubmit, control, formState: { errors }, getValues, setValue, watch, } = useForm({ mode: "onTouched" });

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);
  const $collectionFileId = ($createFileResponse?.collectionFile?.id) ?? Storage.session.get('collectionFileId');
  const $addLegalBondResponse = useAppSelector(state => state.legalBonds.addLegalBondResponse);

  useEffect(() => {
    if (props.rowDataEdit?.id) {
      setValue('WATB', _.find(TrustWrittenList, (item) => item.code === props.rowDataEdit?.bondType))
      setValue('issueDate', new Date(props.rowDataEdit?.issueDate));
      setValue('claimType', props.rowDataEdit?.category);
      setTimeout(() => {
        setValue('WATBdueDate', new Date(props.rowDataEdit?.dueDate));
        setValue('WATBAmount', props.rowDataEdit?.totalAmount);
        setValue('WATBCurrencyList', _.find(CurrencyList, (item) => item.code === props.rowDataEdit?.currency));
        setValue('debtorsName', props.rowDataEdit?.deborName);
        setValue('WATBNationalNumber', props.rowDataEdit?.deborSsn);

        if (props.rowDataEdit?.witnesses?.length > 0) {
          setValue('WATBCheckBoxWitnesses', true);
          for (let i = 0; i < props.rowDataEdit?.witnesses?.length; i++) {
            const x = props.rowDataEdit?.witnesses[i];
            if (i !== 0) {
              addNewWitness()
            }
            setTimeout(() => {
              setValue(`witnesses[${i}].witnessName`, x?.name);
              setValue(`witnesses[${i}].witnessesNationalNumber`, x?.ssn);
            }, 100);
          }
        }

        if(props.rowDataEdit?.paymentSchedules?.length > 0){
          for (let i = 0; i < props.rowDataEdit?.paymentSchedules?.length; i++) {
            const x = props.rowDataEdit?.paymentSchedules[i];
            if (i !== 0) {
              addingScheduled()
            }
            setTimeout(() => {
              setValue(`scheduling[${i}].addingDate`, new Date(x?.paymentDate));
              setValue(`scheduling[${i}].totalAmount`, x?.amount);
              setValue(`scheduling[${i}].currency`, _.find(CurrencyList, (item) => item.code === x?.currency));
            }, 100);
          }
        }
      }, 100);

    }
  }, [props.rowDataEdit, setValue]);

  useEffect(() => {
    setValue("inputForm", "legalBonds");
    if ($addLegalBondResponse?.id) {
      props.closepopUpFn(false);
    }
  }, [setValue, $addLegalBondResponse]);

  const { fields: witnesses, append: appendWitness, remove: removeWitness } = useFieldArray({
    control,
    name: "witnesses",
  });

  const { fields: scheduling, append: addingScheduledRow, remove: removeScheduledRow } = useFieldArray({
    control,
    name: "scheduling",
  });


  useEffect(() => {
    // if (!watch("witnesses") || watch("witnesses").length === 0) {
    //   setValue("witnesses", [{ witnessName: "", witnessesNationalNumber: "" }]);
    // }

    if (!watch("scheduling") || watch("scheduling").length === 0) {
      setValue("scheduling", [{ addingDate: "", totalAmount: "", currency: "" }]);
    }

    if (watch("WATBCheckBoxWitnesses")) {
      addNewWitness();
    } else {
      removeWitness();
    }
  }, [setValue, watch("scheduling"), watch("WATBCheckBoxWitnesses")]);


  const addNewWitness = () => {
    appendWitness({ witnessName: "", witnessesNationalNumber: "" });
  };

  const removeWitnessRow = (index) => {
    removeWitness(index);
  };

  const addingScheduled = () => {
    addingScheduledRow({ addingDate: "", totalAmount: "", currency: "" });
  }

  const removeScheduled = (index) => {
    if (index >= 0 && index < scheduling.length) {
      removeScheduledRow(index);
    }
  };

  const cancelFn = () => {
    props.closepopUpFn(false)
  };

  const addChequeFn = async (data: any) => {
    if (!watch("claimType")) {
      setShowRequestTypeError(true);
      return
    } else {
      setShowRequestTypeError(false);
    }

    setShowLoader(true);
    let obj = {}

    switch (data.claimType) {
      case 'UPON_REQUEST':
        obj = restructureUponRequest(data);
        break;
      case 'SCHEDULED':
        obj = restructureScheduled(data);
        break;
      case 'NON_SCHEDULED':
        obj = restructureNonScheduled(data);
        break;
      default:
        break;
    }


    // Call API
    await dispatch(addLegalBond(obj));
    setShowLoader(false);
  };

  const restructureUponRequest = (data) => {
    const witnessesList: [] = data.witnesses?.length > 0 && data.witnesses.map((item: any) => {
      return {
        name: item.witnessName,
        ssn: Number(item.witnessesNationalNumber),
      }
    });

    return {
      collectionFileId: $collectionFileId,
      bond: {
        ...(props.rowDataEdit?.id && { id: props.rowDataEdit?.id }),
        bondType: data.WATB?.code,
        issueDate: data.issueDate ? dayjs(data.issueDate).format('YYYY-MM-DD') : null,
        category: "UPON_REQUEST",
        totalAmount: data.WATBAmount,
        currency: data.WATBCurrencyList?.code,
        deborName: data.debtorsName,
        deborSsn: Number(data.WATBNationalNumber),
        witnesses: witnessesList.length > 0 ? witnessesList : [],
        attachments: [
          {
            attachmentType: data.WATB?.code,
            name: data.WTAttach1?.name,
            content: data.WTAttach1?.base64,
            mimeType: "PDF"
          },
          {
            attachmentType: data.WATB?.code,
            name: data.WTAttach2?.name,
            content: data.WTAttach2?.base64,
            mimeType: "PDF"
          }
        ]
      }
    }
  }

  const restructureScheduled = (data) => {
    const witnessesList: [] = data.witnesses?.length > 0 && data.witnesses.map((item: any) => {
      return {
        name: item.witnessName,
        ssn: Number(item.witnessesNationalNumber),
      }
    });

    const paymentSchedulesList: [] = data.scheduling?.length > 0 && data.scheduling.map((item: any) => {
      return {
        paymentDate: dayjs(item.addingDate).format('YYYY-MM-DD'),
        amount: Number(item.totalAmount),
        currency: item?.currency?.code
      }
    });
    const totalAmount = data.scheduling.reduce((sum, payment) => sum + Number(payment?.totalAmount), 0)

    return {
      collectionFileId: $collectionFileId,
      bond: {
        ...(props.rowDataEdit?.id && { id: props.rowDataEdit?.id }),
        bondType: data.WATB?.code,
        issueDate: data.issueDate ? dayjs(data.issueDate).format('YYYY-MM-DD') : null,
        category: "SCHEDULED",
        totalAmount,
        currency: data.scheduling[0]?.currency?.code,
        deborName: data.debtorsName,
        deborSsn: Number(data.WATBNationalNumber),
        witnesses: witnessesList?.length > 0 ? witnessesList : [],
        paymentSchedules: paymentSchedulesList.length > 0 ? paymentSchedulesList : [],
        attachments: [
          {
            attachmentType: data.WATB?.code,
            name: data.WTAttach1?.name,
            content: data.WTAttach1?.base64,
            mimeType: "PDF"
          },
          {
            attachmentType: data.WATB?.code,
            name: data.WTAttach2?.name,
            content: data.WTAttach2?.base64,
            mimeType: "PDF"
          }
        ]
      }
    }
  }

  const restructureNonScheduled = (data) => {
    const witnessesList: [] = data.witnesses?.length > 0 && data.witnesses.map((item: any) => {
      return {
        name: item.witnessName,
        ssn: Number(item.witnessesNationalNumber),
      }
    });

    return {
      collectionFileId: $collectionFileId,
      bond: {
        ...(props.rowDataEdit?.id && { id: props.rowDataEdit?.id }),
        bondType: data.WATB?.code,
        issueDate: data.issueDate ? dayjs(data.issueDate).format('YYYY-MM-DD') : null,
        category: "NON_SCHEDULED",
        totalAmount: data.WATBAmount,
        currency: data.WATBCurrencyList?.code,
        deborName: data.debtorsName,
        deborSsn: Number(data.WATBNationalNumber),
        witnesses: witnessesList?.length > 0 ? witnessesList : [],
        dueDate: data.WATBdueDate ? dayjs(data.WATBdueDate).format('YYYY-MM-DD') : null,
        attachments: [
          {
            attachmentType: data.WATB?.code,
            name: data.WTAttach1?.name,
            content: data.WTAttach1?.base64,
            mimeType: "PDF"
          },
          {
            attachmentType: data.WATB?.code,
            name: data.WTAttach2?.name,
            content: data.WTAttach2?.base64,
            mimeType: "PDF"
          }
        ]
      }
    }
  }

  return (
    <>
      <LoaderComponent show={showLoader} />
      <div className="popupView">
        <div className="content">
          <div className="writtenAcknowledgmentTrustBond row">
            <h4>اضافة بيانات سند الأمانة / اقرار خطي</h4>

            <DropDownComponent
              id="WATBList"
              name="WATB"
              register={register}
              watch={watch}
              setValueMethod={setValue}
              options={TrustWrittenList}
              optionLabel={`name.${$lang}`}
              errors={errors}
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
              errors={errors}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => setValue("issueDate", e.target.value)}
              dateFormat="dd/mm/yy"
            />

            <div className="radioButtonDiv">
              <RadioButtonComponent
                name="claimType"
                label="غب الطلب"
                register={register}
                errors={errors}
                value={'UPON_REQUEST'}
                watch={watch}
                onChange={(e) => {
                  setValue("claimType", e.value === 'UPON_REQUEST' && 'UPON_REQUEST');
                  setShowRequestTypeError(false);
                }}
                checked={getValues().claimType === 'UPON_REQUEST'}
              />

              <RadioButtonComponent
                name="claimType"
                label="جدولة"
                register={register}
                errors={errors}
                value={'SCHEDULED'}
                watch={watch}
                onChange={(e) => {
                  setValue("claimType", e.value === 'SCHEDULED' && 'SCHEDULED');
                  setShowRequestTypeError(false);
                }}
                checked={getValues().claimType === 'SCHEDULED'}
              />

              <RadioButtonComponent
                name="claimType"
                label="بدون جدولة"
                register={register}
                errors={errors}
                value={'NON_SCHEDULED'}
                watch={watch}
                onChange={(e) => {
                  setValue("claimType", e.value === 'NON_SCHEDULED' && 'NON_SCHEDULED');
                  setShowRequestTypeError(false);
                }}
                checked={getValues().claimType === 'NON_SCHEDULED'}
              />
            </div>
            {showRequestTypeError &&
              <span className="errorMsg">
                يجب اختيار نوع الطلب
              </span>
            }

            {watch('claimType') === 'NON_SCHEDULED' && (

              <DatePickerComponent
                id="WATBlegalBondsDueDate"
                name="WATBdueDate"
                label={"تاريخ الاستحقاق"}
                placeholder={"DD/MM/YYYY"}
                register={register}
                rules={{ required: "يجب اختيار تاريخ الاستحقاق" }}
                errors={errors?.WATBdueDate ? { WATBdueDate: errors.WATBdueDate } : undefined}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => setValue("WATBdueDate", e.target.value)}
                className="col-md-6 mb-4"
                dateFormat="dd/mm/yy"
              />
            )}

            {watch('claimType') && (
              <>
                {(watch('claimType') === 'UPON_REQUEST' || watch('claimType') === 'NON_SCHEDULED') && (
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
                        rules={{ required: "يجب ادخال القيمة" }}
                        label="اجمالي المبلغ"
                      />

                      <DropDownComponent
                        id="WATBCurrencyList-id"
                        name="WATBCurrencyList"
                        register={register}
                        watch={watch}
                        setValueMethod={setValue}
                        options={CurrencyList}
                        setValue={CurrencyList[0]}
                        optionLabel={`name.${$lang}`}
                        errors={errors}
                        onChange={(e) => setValue("WATBCurrencyList", e.value)}
                        placeholder="دينار"
                        rules={{ required: "يجب اختيار العملة" }}
                      />
                    </div>
                  </div>
                )}

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
                  onChange={(e) => {
                    const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
                    setValue(`debtorsName`, letterValue);
                  }}
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

            {watch('claimType') === 'SCHEDULED' && (
              <>
                {scheduling?.map((field, index) => (
                  <div key={field.id} className="dynamicRow">
                    <div>
                      <DatePickerComponent
                        id={`addingScheduledDate${field.id}id`}
                        name={`scheduling[${index}].addingDate`}
                        label={"اضافة التاريخ"}
                        placeholder={"DD/MM/YYYY"}
                        onChange={(e) => setValue(`scheduling[${index}].addingDate`, e.target.value)}
                        register={register as unknown as UseFormRegister<Record<string, unknown>>}
                        control={control}
                        errors={
                          errors?.scheduling?.[index]?.addingDate
                            ? {
                              [`addingScheduledDate${field.id}id`]:
                                errors.scheduling[index].addingDate,
                            }
                            : undefined
                        }
                        setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                        watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                        dateFormat="dd/mm/yy"
                        rules={{ required: "يجب اضافة التاريخ" }}
                      />
                      {errors.scheduling?.[index]?.addingDate &&
                        <span className="errorMsg">
                          يجب اضافة التاريخ
                        </span>
                      }
                    </div>

                    <div className="amountDeleteDiv">
                      <div className="ammountDiv">
                        <div className="customEightWidthDiv">
                          <InputComponent
                            id={`addingScheduledAmount${field.id}id`}
                            type="text"
                            name={`scheduling[${index}].totalAmount`}
                            placeholder="المبلغ"
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/[^0-9]/g, "");
                              setValue(`scheduling[${index}].totalAmount`, numericValue);
                            }}
                            label="اجمالي المبلغ"
                            register={register as unknown as UseFormRegister<Record<string, unknown>>}
                            control={control}
                            errors={
                              errors?.scheduling?.[index]?.totalAmount
                                ? {
                                  [`addingScheduledAmount${field.id}id`]:
                                    errors.scheduling[index].totalAmount,
                                }
                                : undefined
                            }
                            setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                            watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                            rules={{ required: "يجب اضافة اجمالي المبلغ" }}
                          />
                          {errors.scheduling?.[index]?.totalAmount &&
                            <span className="errorMsg">
                              يجب اضافة اجمالي المبلغ
                            </span>
                          }
                        </div>
                        <div className="customTwentyWidthDiv">
                          <DropDownComponent
                            id={`addingScheduledCurrencyList${index}-id`}
                            name={`scheduling[${index}].currency`}
                            options={CurrencyList}
                            setValue={CurrencyList[0]}
                            optionLabel={`name.${$lang}`}
                            onChange={(e) => setValue(`scheduling[${index}].currency`, e.value)}
                            placeholder="دينار"
                            rules={{ required: "يجب اختيار العملة" }}
                            register={register as unknown as UseFormRegister<Record<string, unknown>>}
                            control={control}
                            errors={
                              errors?.scheduling?.[index]?.currency
                                ? {
                                  [`addingScheduledCurrencyList${index}-id`]:
                                    errors.scheduling[index].currency,
                                }
                                : undefined
                            }
                            setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                            watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                          // rules={{ required: "يجب اختيار اسم الشاهد" }}
                          />
                          {errors.scheduling?.[index]?.currency &&
                            <span className="errorMsg">
                              يجب اختيار العملة
                            </span>
                          }
                        </div>
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

            {(watch('claimType')) &&
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

                {watch("WATBCheckBoxWitnesses") &&
                  witnesses?.map((field, index) => (
                    <div key={field.id} className="dynamicRow">
                      <div>
                        <InputComponent
                          id={`WATBWitnessesName_${field.id}`}
                          type="text"
                          name={`witnesses.[${index}].witnessName`}
                          placeholder="ادخل اسم الشاهد"
                          onChange={(e) => {
                            const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
                            setValue(`witnesses.[${index}].witnessName`, letterValue);
                          }}
                          value={watch(`witnesses.[${index}].witnessName`)}
                          label="اسم الشاهد"
                          register={register as unknown as UseFormRegister<Record<string, unknown>>}
                          control={control}
                          errors={
                            errors?.witnesses?.[index]?.witnessName
                              ? {
                                [`WATBWitnessesName_${field.id}`]:
                                  errors.witnesses[index].witnessName,
                              }
                              : undefined
                          }
                          setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                          watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                          rules={{ required: "يجب اختيار اسم الشاهد" }}
                        />
                        {errors.witnesses?.[index]?.witnessName &&
                          <span className="errorMsg">
                            يجب اختيار اسم الشاهد
                          </span>
                        }
                      </div>

                      <div className="row-withSideBtn">
                        <div>
                          <InputComponent
                            id={`WATBWitnessesNationalNumber-_${field.id}`}
                            type="text"
                            name={`witnesses[${index}].witnessesNationalNumber`}
                            placeholder={translate("createNewProfile.exm") + "1234567"}
                            value={watch(`witnesses.[${index}].witnessesNationalNumber`)}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/[^0-9]/g, "");
                              setValue(`witnesses.[${index}].witnessesNationalNumber`, numericValue);
                            }}
                            rules={{ required: "يجب ادخال الرقم الوطني" }}
                            label={translate("createNewProfile.nationalNumber")}
                            register={register as unknown as UseFormRegister<Record<string, unknown>>}
                            control={control}
                            errors={
                              errors?.witnesses?.[index]?.witnessesNationalNumber
                                ? {
                                  [`WATBWitnessesNationalNumber-_${field.id}`]:
                                    errors?.witnesses?.[index]?.witnessesNationalNumber,
                                }
                                : undefined 
                            }
                            setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                            watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                          />
                          {errors.witnesses?.[index]?.witnessesNationalNumber &&
                            <span className="errorMsg">
                              يجب ادخال الرقم الوطني
                            </span>
                          }
                        </div>

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
              </>
            }

            <div className="uploaderContainer w-100">
              <h4>تحميل اقرار خطي/ سند امانة</h4>

              <div className="row">
                <AttachmentFileComponent
                  id="WTAttach1"
                  name="WTAttach1"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال الواجهة الأمامية اقرار خطي/ سند امانة' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("WTAttach1", e)}
                  Class="col-md-12 col-lg-6"
                />
              </div>
              <div className="row">
                <AttachmentFileComponent
                  id="WTAttach2"
                  name="WTAttach2"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال الواجهة الخلفية اقرار خطي/ سند امانة' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("WTAttach2", e)}
                  Class="col-md-12 col-lg-6"
                />
              </div>
            </div>

            <div className="actionBtns">
              <ButtonComponent Class={'BtnCancel'} onClick={() => cancelFn()}>إلغاء</ButtonComponent>
              <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(addChequeFn)}>
                
                {props.rowDataEdit?.id ? 'تعديل سند امانة / اقرار خطي' : 'إضافة سند امانة / اقرار خطي'}
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default WrittenAcknowledgmentTrustBond;
