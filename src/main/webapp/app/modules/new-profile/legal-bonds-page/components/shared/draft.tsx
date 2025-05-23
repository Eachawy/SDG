import {
  AttachmentFileComponent,
  ButtonComponent,
  CheckBoxComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent
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

import { countryCode } from "app/shared/util/date-utils";
import { CurrencyList } from "app/modules/shared/constants";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import { addLegalBond } from "../legalBonds.reducer";
import dayjs from "dayjs";
import _ from 'lodash'
import { getCountryCodeObj, removeCountryCode, setInitAttachFile } from "app/shared/util/utils";

const Draft = (props) => {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);
  const $collectionFileId = ($createFileResponse?.collectionFile?.id) ?? Storage.session.get('collectionFileId');
  const $addLegalBondResponse = useAppSelector(state => state.legalBonds.addLegalBondResponse);


  const { register, handleSubmit, control, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched', });

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
      setValue('draftIssueDate', new Date(props.rowDataEdit?.issueDate));
      setValue('draftDueDate', new Date(props.rowDataEdit?.dueDate))
      setValue('draftAmount', props.rowDataEdit?.totalAmount);
      setValue('draftCurrencyList', _.find(CurrencyList, (item) => item.code === props.rowDataEdit?.currency));
      const debotersList = props.rowDataEdit?.legalBondParticipant.filter(item => item.type === 'DEBTOR_NAME');
      const guarantorsList = props.rowDataEdit?.legalBondParticipant.filter(item => item.type === 'DRAFT_GUARANTOR');

      if (debotersList?.length > 0) {
        for (let i = 0; i < debotersList.length; i++) {
          const x = debotersList[i];
          // if (i !== 0) {
          addNewDebtor()
          // }
          setTimeout(() => {
            setValue(`debtors[${i}].debtorName`, x?.name);
            setValue(`debtors[${i}].phoneNumber`, removeCountryCode(x?.mobileNumber));
            setValue(`debtors[${i}].countryCode`, getCountryCodeObj(x?.mobileNumber));
          }, 100);
        }
      }

      if (guarantorsList?.length > 0) {
        setValue('promissoryNoteGuarantorCheckBox', true);
        for (let i = 0; i < guarantorsList.length; i++) {
          const x = guarantorsList[i];
          // if (i !== 0) {
          addNewGuarantor()
          // }
          setTimeout(() => {
            setValue(`guarantors[${i}].guarantorName`, x?.name);
            setValue(`guarantors[${i}].guarantorPhoneNumber`, removeCountryCode(x?.mobileNumber));
            setValue(`guarantors[${i}].guarantorCountryCode`, getCountryCodeObj(x?.mobileNumber));
          }, 100);
        }
      }

    }
  }

  // Array of rows on Extra Deboters and Guarantors
  const { fields: debtors, append: appendDebtor, remove: removeDebtor } = useFieldArray({
    control,
    name: "debtors",
  });

  const { fields: guarantors, append: appendGuarantor, remove: removeGuarantor } = useFieldArray({
    control,
    name: "guarantors",
  });

  useEffect(() => {
    if (!props.rowDataEdit?.id) {
      setValue("debtors", [{ debtorName: "", phoneNumber: "", countryCode: "" }]);
      setValue("guarantors", [{ guarantorName: "", guarantorPhoneNumber: "", guarantorCountryCode: "" }]);
    }
  }, [props.rowDataEdit, setValue]);

  const addNewDebtor = () => {
    appendDebtor({ debtorName: "", phoneNumber: "", countryCode: "" });
  };

  const addNewGuarantor = () => {
    appendGuarantor({ guarantorName: "", guarantorPhoneNumber: "", guarantorCountryCode: "" });
  };

  const removeRow = (index: number, type: "debtor" | "guarantor") => {
    if (type === "debtor") {
      removeDebtor(index);
    } else {
      removeGuarantor(index);
    }
  };
  // End Array


  const addDraftFn = async (data: any) => {
    setShowLoader(true);

    const depotorsList = data.debtors.map((item: any) => {
      return {
        name: item.debtorName,
        mobileNumber: Number(item.countryCode?.name + item.phoneNumber),
        type: "DEBTOR_NAME"
      }
    });

    const guarantorsList = watch("promissoryNoteGuarantorCheckBox") ? data.guarantors.map((item: any) => {
      return {
        name: item.guarantorName,
        mobileNumber: Number(item.guarantorCountryCode?.name + item.guarantorPhoneNumber),
        type: "DRAFT_GUARANTOR"
      }
    }) : [];

    const obj = {
      collectionFileId: $collectionFileId,
      draft: {
        ...(props.rowDataEdit?.id && { id: props.rowDataEdit?.id }),
        issueDate: data.draftIssueDate ? dayjs(data.draftIssueDate).format('YYYY-MM-DD') : null,
        dueDate: dayjs(data.draftDueDate).format('YYYY-MM-DD'),
        totalAmount: Number(data.draftAmount),
        currency: data.draftCurrencyList?.code,
        legalBondParticipant: [...depotorsList, ...guarantorsList],
        attachments: [
          {
            attachmentType: "DRAFT",
            name: data.draftAttach?.name,
            content: data.draftAttach?.base64,
            mimeType: "PDF"
          }
        ]
      }
    }

    // Call API
    await dispatch(addLegalBond(obj));
    setShowLoader(false);
  }

  return (
    <>
      <LoaderComponent show={showLoader} />
      <div className="popupView">
        <div className="content">
          <div className="row promissoryNotePopup">
            <h4>إضافة بيانات الكمبيالة</h4>

            <DatePickerComponent
              id="draftIssueDate"
              name="draftIssueDate"
              label={"تاريخ التحرير"}
              placeholder={"DD/MM/YYYY"}
              register={register}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => setValue("draftIssueDate", e.target.value)}
              className="w-50-16px"
              maxDate={new Date()}
              dateFormat="dd/mm/yy"
            />

            <DatePickerComponent
              id="draftDueDate"
              name="draftDueDate"
              label={"تاريخ الاستحقاق"}
              placeholder={"DD/MM/YYYY"}
              register={register}
              errors={errors}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => setValue("draftDueDate", e.target.value)}
              className="w-50-16px"
              rules={{ required: "يجب اختيار تاريخ الاستحقاق" }}
              dateFormat="dd/mm/yy"
            />

            <div className="ammountDiv">
              <InputComponent
                id="draftAmount"
                type="text"
                name="draftAmount"
                placeholder="المبلغ"
                register={register}
                errors={errors}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setValue("draftAmount", numericValue);
                }}
                rules={{ required: "يجب ادخال قيمة الكمبيالة" }}
                label="قيمة الكمبيالة"
              />

              <DropDownComponent
                id="draftCurrencyList"
                name="draftCurrencyList"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={CurrencyList}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => setValue("draftCurrencyList", e.value)}
                placeholder="دينار"
                rules={{ required: "يجب اختيار العملة" }}
                setValue={CurrencyList[0]}
              />
            </div>

            {debtors.length > 0 && debtors?.map((field, index) => (
              <div key={field.id} className="dynamicRow">
                <div>
                  <InputComponent
                    id={`promissoryNoteDebtorName_${field.id}`}
                    type="text"
                    name={`debtors[${index}].debtorName`}
                    placeholder="ادخل اسم المدين"
                    onChange={(e) => {
                      const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
                      setValue(`debtors[${index}].debtorName`, letterValue);
                    }}
                    register={register as unknown as UseFormRegister<Record<string, unknown>>}
                    control={control}
                    errors={
                      errors?.debtors?.[index]?.debtorName
                        ? {
                          [`promissoryNoteDebtorName_${field.id}`]:
                            errors.debtors[index].debtorName,
                        }
                        : undefined
                    }
                    setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                    watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                    rules={{ required: "يجب اختيار اسم المدين" }}
                    label="اسم المدين"
                  />

                  {errors.debtors?.[index]?.debtorName &&
                    <span className="errorMsg"> يجب ادخال اسم المدين</span>
                  }
                </div>

                <div className="amountDeleteDiv">
                  <div>

                    <div className={`phoneNumber`}>
                      <label>
                        {translate("createNewProfile.phoneNumber")}
                        {props.error && <span>*</span>}
                      </label>
                      <div>
                        <DropDownComponent
                          id={`debtorsCountryCode${field.id}`}
                          name={`debtors[${index}].countryCode`}
                          options={countryCode}
                          optionLabel={`name`}
                          control={control}
                          setValue={countryCode[0]}
                          onChange={(e) => {
                            setValue(`debtors[${index}].countryCode`, e.value as object);
                          }}
                          register={register as unknown as UseFormRegister<Record<string, unknown>>}
                          errors={
                            errors?.debtors?.[index]?.countryCode
                              ? {
                                [`debtorsCountryCode${field.id}`]:
                                  errors.debtors[index].countryCode,
                              }
                              : undefined
                          }
                          setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                          watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                          rules={{ required: "يجب اختيار كود الدولة" }}
                        />
                        <div className="customEightWidthDiv">
                          <InputComponent
                            id={`debtorsPhoneNumber${field.id}`}
                            type="text"
                            name={`debtors[${index}].phoneNumber`}
                            placeholder={translate("createNewProfile.exm") + "1234567"}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/[^0-9]/g, "");
                              setValue(`debtors[${index}].phoneNumber`, numericValue);
                            }}
                            register={register as unknown as UseFormRegister<Record<string, unknown>>}
                            control={control}
                            errors={
                              errors?.debtors?.[index]?.phoneNumber
                                ? {
                                  [`debtorsPhoneNumber${field.id}`]:
                                    errors.debtors[index].phoneNumber,
                                }
                                : undefined
                            }
                            setValue={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                            watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                            rules={{ required: "يجب اختيار رقم الهاتف" }}
                          />
                          {errors.debtors?.[index]?.phoneNumber &&
                            <span className="errorMsg"> يجب ادخال رقم الهاتف</span>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  {index !== 0 && (
                    <span onClick={() => removeRow(index, "debtor")} className="sideBtnStyle deleteBtn">
                      حذف
                    </span>
                  )}
                </div>


                {index === debtors.length - 1 && (
                  <span onClick={addNewDebtor} className="sideBtnStyle addBtn">
                    اضف اسم مدين جديد
                  </span>
                )}
              </div>
            ))}

            <CheckBoxComponent
              id="promissoryNoteGuarantorCheckBox-id"
              name="promissoryNoteGuarantorCheckBox"
              label="يوجد كفيل"
              className="col-12 mb-2"
              register={register}
              errors={errors}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => setValue("promissoryNoteGuarantorCheckBox", e.value)}
            />

            {watch("promissoryNoteGuarantorCheckBox") &&
              guarantors.length > 0 && guarantors?.map((field, index) => (
                <div key={field.id} className="dynamicRow">
                  <div>
                    <InputComponent
                      id={`promissoryNoteGuarantorName_${field.id}`}
                      type="text"
                      name={`guarantors[${index}].guarantorName`}
                      placeholder="ادخل اسم الكفيل"
                      register={register as unknown as UseFormRegister<Record<string, unknown>>}
                      control={control}
                      errors={
                        errors?.guarantors?.[index]?.guarantorName
                          ? {
                            [`promissoryNoteGuarantorName_${field.id}`]:
                              errors.guarantors[index].guarantorName,
                          }
                          : undefined
                      }
                      setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                      watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                      rules={{ required: "يجب ادخال اسم الكفيل" }}

                      onChange={(e) => {
                        const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
                        setValue(`guarantors[${index}].guarantorName`, letterValue);
                      }}
                      label="اسم الكفيل"
                    />
                    {errors.guarantors?.[index]?.guarantorName &&
                      <span className="errorMsg"> يجب ادخال اسم الكفيل</span>
                    }
                  </div>
                  <div className="amountDeleteDiv">
                    <div>
                      <div className={`phoneNumber`}>
                        <label>
                          {translate("createNewProfile.phoneNumber")}
                          {props.error && <span>*</span>}
                        </label>
                        <div>
                          <DropDownComponent
                            id={`guarantorCountryCode${field.id}`}
                            name={`guarantors[${index}].guarantorCountryCode`}
                            options={countryCode}
                            optionLabel={`name`}
                            control={control}
                            setValue={countryCode[0]}
                            onChange={(e) => {
                              setValue(`guarantors[${index}].guarantorCountryCode`, e.value as object);
                            }}
                            register={register as unknown as UseFormRegister<Record<string, unknown>>}
                            errors={
                              errors?.guarantors?.[index]?.guarantorCountryCode
                                ? {
                                  [`guarantorCountryCode${field.id}`]:
                                    errors.guarantors[index].guarantorCountryCode,
                                }
                                : undefined
                            }
                            setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                            watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                            rules={{ required: "يجب ادخال كود الدولة" }}
                          />
                          <div className="customEightWidthDiv">
                            <InputComponent
                              id={`guarantorPhoneNumber${field.id}`}
                              type="text"
                              name={`guarantors[${index}].guarantorPhoneNumber`}
                              placeholder={translate("createNewProfile.exm") + "1234567"}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                setValue(`guarantors[${index}].guarantorPhoneNumber`, numericValue);
                              }}
                              register={register as unknown as UseFormRegister<Record<string, unknown>>}
                              control={control}
                              errors={
                                errors?.guarantors?.[index]?.guarantorPhoneNumber
                                  ? {
                                    [`guarantorPhoneNumber${field.id}`]:
                                      errors.guarantors[index].guarantorPhoneNumber,
                                  }
                                  : undefined
                              }
                              setValue={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                              watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                              rules={{ required: "يجب ادخال رقم الهاتف" }}
                            />
                            {errors.guarantors?.[index]?.guarantorPhoneNumber &&
                              <span className="errorMsg"> يجب ادخال رقم الهاتف</span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    {index !== 0 && (
                      <span onClick={() => removeRow(index, "guarantor")} className="sideBtnStyle deleteBtn">
                        حذف
                      </span>
                    )}
                  </div>

                  {index === guarantors.length - 1 && (
                    <span onClick={addNewGuarantor} className="sideBtnStyle addBtn">
                      اضف اسم كفيل جديد
                    </span>
                  )}
                </div>
              ))}

            <div className="uploaderContainer w-100">
              <h4>تحميل الكمبيالة</h4>

              <div className="row">
                <AttachmentFileComponent
                  id="draftAttach"
                  name="draftAttach"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال صورة الكمبيالة' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("draftAttach", e)}
                  Class="col-md-12 col-lg-6"
                  initFile={setInitAttachFile(props.rowDataEdit?.attachments[0])}
                />
              </div>
            </div>

            <div className="actionBtns">
              <ButtonComponent Class={'BtnCancel'} onClick={() => props.closepopUpFn(false)}>إلغاء</ButtonComponent>
              <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(addDraftFn)}>
                {props.rowDataEdit?.id ? 'تعديل كمبيالة' : 'إضافة كمبيالة'}
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Draft;
