import {
  AttachmentFileComponent,
  ButtonComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { translate, Storage } from "react-jhipster";
import { useAppSelector, useAppDispatch } from "app/config/store";
import {
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray
} from "react-hook-form";

import { InputSwitch } from 'primereact/inputswitch';
import { ChequeBeneficiaryList, CurrencyList } from "app/modules/shared/constants";
import { addLegalBond, getAllBanks } from "../legalBonds.reducer";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import dayjs from "dayjs";
import _ from 'lodash'

const Cheque = (props) => {
  const dispatch = useAppDispatch();
  const [isChequeStamped, setIsChequeStamped] = useState(false);
  const [allBanks, setAllBanks] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $banksList = useAppSelector((state) => state.legalBonds.banksList);
  const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);
  const $collectionFileId = ($createFileResponse?.collectionFile?.id) ?? Storage.session.get('collectionFileId');
  const $addLegalBondResponse = useAppSelector(state => state.legalBonds.addLegalBondResponse);

  const { register, handleSubmit, control, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched', });

  useEffect(() => {
    getAllLookups();
  }, []);

  useEffect(() => {
    setValue("inputForm", "legalBonds");
    // if(!props.rowDataEdit?.id){
    setValue("rows", [{ drawerName: "" }]);
    // }

    if ($banksList?.length > 0) {
      const arr = $banksList.map(item => {
        return {
          name: {
            en: item?.englishName,
            ar: item?.arabicName
          },
          code: item?.id
        }
      })
      setAllBanks(arr);
    }

    if ($addLegalBondResponse?.id) {
      props.closepopUpFn(false);
    }

  }, [$banksList, setValue, $addLegalBondResponse]);

  const getAllLookups = async () => {
    await dispatch(getAllBanks());
  }

  useEffect(() => {
    if (props.rowDataEdit?.id) {
      console.log(props.rowDataEdit);
      if ($banksList?.length > 0) {
        setValue('cheuqeBank', {
          name: {
            en: props.rowDataEdit?.bank?.englishName,
            ar: props.rowDataEdit?.bank?.arabicName
          },
          code: props.rowDataEdit?.bank?.id
        })
      }
      setValue('chequeAmount', props.rowDataEdit?.totalAmount);
      setValue('currency', _.find(CurrencyList, item => item.code === props.rowDataEdit?.currency))
      setValue('dueDate', new Date(props.rowDataEdit?.dueDate));
      setValue('chequeNumber', props.rowDataEdit?.chequeNumber);
      if (props.rowDataEdit?.returnDate) {
        setIsChequeStamped(true);
        setTimeout(() => {
          setValue('returnDate', new Date(props.rowDataEdit?.returnDate));
        }, 100);
      }

      if (props.rowDataEdit?.legalBondParticipant?.length > 0) {
        setValue('firstBeneficiary', { name: { ar: "مستفيد اول", en: "First Beneficiary" }, code: "FB" });
        setValue('firstBeneficiaryName', props.rowDataEdit.chequeBeneficiaries[0]?.name);
        for (let i = 0; i < props.rowDataEdit.legalBondParticipant.length; i++) {
          const x = props.rowDataEdit.legalBondParticipant[i];
          if (i !== 0) {
            addNewRow()
          }
          setTimeout(() => {
            setValue(`rows[${i}].drawerName`, x?.name);
          }, 100);
        }
      } else {
        setValue('firstBeneficiary', { name: { ar: "مجير له", en: "Authorized Party" }, code: "AP" });
        for (let i = 0; i < props.rowDataEdit.chequeBeneficiaries.length; i++) {
          const x = props.rowDataEdit.chequeBeneficiaries[i];
          if (i !== 0) {
            addNewRow()
          }
          setTimeout(() => {
            setValue(`rows[${i}].drawerName`, x?.name);
          }, 100);
        }
      }
    }
  }, [props.rowDataEdit, setValue, $banksList]);

  // Array of rows on Extra Participants
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const addNewRow = () => {
    append({ drawerName: "" });
  };

  const removeRow = (index) => {
    remove(index);
  };

  // End Array Configuration

  const cancelFn = () => {
    props.closepopUpFn(false)
  };

  const addChequeFn = async (data: any) => {
    setShowLoader(true);
    const arr = data.rows || [];

    const legalBondParticipants = arr.map((item: any) => {
      return {
        name: item?.drawerName,
        mobileNumber: null,
        type: "CHEQUE_OWNER"
      }
    });

    const extraParticipants = arr.map((item: any, index: any) => {
      return {
        name: item?.drawerName,
        beneficiaryType: "FIRST_BENEFICIARY",
        orderNo: index + 1,
      }
    });


    const obj = {
      collectionFileId: $collectionFileId,
      cheque: {
        ...(props.rowDataEdit?.id && { id: props.rowDataEdit?.id }),
        totalAmount: Number(data.chequeAmount),
        currency: data.chequeCurrencyList?.code,
        chequeNumber: Number(data.chequeNumber),
        dueDate: dayjs(data.dueDate).format('YYYY-MM-DD'),
        returnDate: isChequeStamped && data.returnDate ? dayjs(data.returnDate).format('YYYY-MM-DD') : null,
        bank: { id: Number(data.cheuqeBank?.code) },
        legalBondParticipant: watch("firstBeneficiary")?.code === "FB" ? legalBondParticipants : [],
        chequeBeneficiaries: watch("firstBeneficiary")?.code === "FB" ? [
          {
            name: data.firstBeneficiaryName,
            beneficiaryType: "FIRST_BENEFICIARY",
            orderNo: 1
          }
        ] : extraParticipants,
        attachments: [
          {
            attachmentType: "CHEQUE",
            name: data.chequeFrontAttach?.name,
            content: data.chequeFrontAttach?.base64,
            mimeType: "PDF"
          },
          {
            attachmentType: "CHEQUE",
            name: data.chequeBackAttach?.name,
            content: data.chequeBackAttach?.base64,
            mimeType: "PDF"
          },
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
          <div className="row">
            <h4>إضافة بيانات الشيك</h4>

            <DropDownComponent
              id="cheuqeBank"
              name="cheuqeBank"
              register={register}
              watch={watch}
              setValueMethod={setValue}
              options={allBanks}
              optionLabel={`name.${$lang}`}
              errors={errors?.cheuqeBank ? { cheuqeBank: errors.cheuqeBank } : undefined}
              onChange={(e) => setValue("cheuqeBank", e.value)}
              placeholder="اختر اسم البنك"
              rules={{ required: "يجب اختيار اسم البنك" }}
              label="اسم البنك"
            />

            <div className="ammountDiv">
              <InputComponent
                id="chequeAmount"
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
                id="chequeCurrencyList"
                name="chequeCurrencyList"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={CurrencyList}
                optionLabel={`name.${$lang}`}
                errors={
                  errors?.chequeCurrencyList
                    ? { chequeCurrencyList: errors.chequeCurrencyList }
                    : undefined
                }
                setValue={CurrencyList[0]}
                onChange={(e) => setValue("chequeCurrencyList", e.value)}
                placeholder="دينار"
                rules={{ required: "يجب اختيار العملة" }}
              />
            </div>

            <InputComponent
              id="chequeNumber"
              type="text"
              name="chequeNumber"
              placeholder={translate("createNewProfile.exm") + "123456789"}
              register={register}
              errors={errors?.chequeNumber ? { chequeNumber: errors.chequeNumber } : undefined}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => setValue("chequeNumber", e.target.value)}
              rules={{ required: "يجب ادخال رقم الشيك" }}
              label="رقم الشيك"
            />

            <DatePickerComponent
              id="dueDate"
              name="dueDate"
              label={"تاريخ الاستحقاق"}
              placeholder={"DD/MM/YYYY"}
              register={register}
              rules={{ required: "يجب اختيار تاريخ الاستحقاق" }}
              errors={errors?.dueDate ? { dueDate: errors.dueDate } : undefined}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => setValue("dueDate", e.target.value)}
              dateFormat="dd/mm/yy"
            />

            <div className="switchDiv col-md-12">
              <InputSwitch
                inputId="isChequeStamped-id"
                checked={isChequeStamped}
                onChange={(e) => {
                  setIsChequeStamped(e.value)}
                }
              />

              <label htmlFor="isChequeStamped-id">الشيك مختوم</label>
            </div>

            {isChequeStamped && <DatePickerComponent
              id="returnDate"
              name="returnDate"
              label={"تاريخ الاعادة"}
              placeholder={"DD/MM/YYYY"}
              register={register}
              errors={
                errors?.returnDate ? { returnDate: errors.returnDate } : undefined
              }
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => setValue("returnDate", e.target.value)}
              dateFormat="dd/mm/yy"
            />}

            <div className="flex-row" >
              <DropDownComponent
                id="legalBondsFirstBeneficiary"
                name="firstBeneficiary"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={ChequeBeneficiaryList}
                optionLabel={`name.${$lang}`}
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
                      : "اضف اسم المجير"
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
                    const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
                    setValue("firstBeneficiaryName", letterValue);
                  }}
                  rules={{
                    required:
                      watch("firstBeneficiary")?.code === "FB"
                        ? "يجب ادخال اسم المستفيد الاول"
                        : "يجب ادخال اسم المجير"
                  }}
                  label={
                    watch("firstBeneficiary")?.code === "FB"
                      ? "اسم المستفيد الأول"
                      : "اسم المجير"
                  }
                  className="w-50-16px"
                />
              )}
            </div>

            {watch("firstBeneficiary") &&
              fields.map((field, index) => (
                <div key={field.id} className="flex-row">
                  <div>
                    <InputComponent
                      id={`legalBondsDrawerName_${field.id}id`}
                      type="text"
                      name={`rows[${index}].drawerName`}
                      placeholder={
                        watch("firstBeneficiary")?.code === "FB"
                          ? "اضف اسم اسم الساحب"
                          : "اضف اسم المجير"
                      }
                      onChange={(e) => {
                        const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
                        setValue(`rows[${index}].drawerName`, letterValue);
                      }}
                      rules={{
                        required: watch("firstBeneficiary")?.code === "FB"
                          ? "يجب ادخال اسم الساحب"
                          : "يجب ادخال اسم المجير"
                      }}
                      label={
                        watch("firstBeneficiary")?.code === "FB"
                          ? "اسم الساحب"
                          : "اسم المجير"
                      }
                      register={register as unknown as UseFormRegister<Record<string, unknown>>}
                      control={control}
                      errors={
                        errors?.rows?.[index]?.drawerName
                          ? {
                            [`legalBondsDrawerName_${field.id}id`]:
                              errors?.rows?.[index]?.drawerName,
                          }
                          : undefined
                      }
                      setValueMethod={setValue as unknown as UseFormSetValue<Record<string, unknown>>}
                      watch={watch as unknown as UseFormWatch<Record<string, unknown>>}
                    />
                    {errors.rows?.[index]?.drawerName &&
                      <span className="errorMsg">
                        {(watch("firstBeneficiary")?.code === "FB"
                          ? "يجب ادخال اسم الساحب"
                          : "يجب ادخال اسم المجير"
                        )}
                      </span>
                    }
                  </div>
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
                          : "اضف اسم مجير جديد"}
                      </span>
                    )}
                  </div>
                </div>
              ))}

            <div className="uploaderContainer">
              <h4>تحميل الواجهة الأمامية والخلفية للشيك</h4>
              <div className="row">
                <AttachmentFileComponent
                  id="chequeFrontAttach"
                  name="chequeFrontAttach"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال الواجهة الأمامية للشيك' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("chequeFrontAttach", e)}
                  Class="col-md-12 col-lg-6"
                />
              </div>
              <div className="row">
                <AttachmentFileComponent
                  id="chequeBackAttach"
                  name="chequeBackAttach"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال الواجهة الخلفية للشيك' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("chequeBackAttach", e)}
                  Class="col-md-12 col-lg-6"
                />
              </div>
            </div>

            <div className="actionBtns">
              <ButtonComponent Class={'BtnCancel'} onClick={() => cancelFn()}>إلغاء</ButtonComponent>
              <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(addChequeFn)}>
                {props.rowDataEdit?.id ? 'تعديل الشيك' : 'إضافة شيك'}
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cheque;
