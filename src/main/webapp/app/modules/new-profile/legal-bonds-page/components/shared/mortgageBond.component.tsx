import {
  AttachmentFileComponent,
  ButtonComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { translate, Storage } from "react-jhipster";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { useForm } from "react-hook-form";
import { CurrencyList } from "app/modules/shared/constants";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import dayjs from "dayjs";
import { addLegalBond } from "../legalBonds.reducer";
import _ from 'lodash'
import { setInitAttachFile } from "app/shared/util/utils";

const MortgageBond = (props) => {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);
  const $collectionFileId = ($createFileResponse?.collectionFile?.id) ?? Storage.session.get('collectionFileId');
  const $addLegalBondResponse = useAppSelector(state => state.legalBonds.addLegalBondResponse);


  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm({ mode: "onTouched" });


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
      setValue('mortgageBondissueDate', new Date(props.rowDataEdit?.issueDate));
      setValue('mortgageBondDueDate', new Date(props.rowDataEdit?.dueDate));
      setValue('mortgageBondAmount', props.rowDataEdit?.totalAmount);
      setValue('mortgageBondCurrency', _.find(CurrencyList, (item) => item.code === props.rowDataEdit?.currency));
      setValue('mortgagBondDebtorName', props.rowDataEdit?.deborName);
      setValue('mortgageBondNationalNo', props.rowDataEdit?.deborSsn);
    }
  }

  const addMortageBondFn = async (data: any) => {
    setShowLoader(true);

    const obj = {
      collectionFileId: $collectionFileId,
      bond: {
        ...(props.rowDataEdit?.id && { id: props.rowDataEdit?.id }),
        bondType: "MORTGAGE_BOND",
        issueDate: dayjs(data.mortgageBondissueDate).format('YYYY-MM-DD'),
        category: "NON_SCHEDULED",
        totalAmount: Number(data.mortgageBondAmount),
        currency: data.mortgageBondCurrency?.code,
        deborName: data.mortgagBondDebtorName,
        deborSsn: Number(data.mortgageBondNationalNo),
        dueDate: dayjs(data.mortgageBondDueDate).format('YYYY-MM-DD'),
        attachments: [
          {
            attachmentType: "MORTGAGE_BOND",
            name: data.mortageBondAttach1?.name,
            content: data.mortageBondAttach1?.base64,
            mimeType: "PDF"
          },
          {
            attachmentType: "MORTGAGE_BOND",
            name: data.mortageBondAttach2?.name,
            content: data.mortageBondAttach2?.base64,
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
          {/* row promissoryNotePopup */}
          <div className="flex-row">
            <h4>إضافة بيانات سند رهن</h4>

            <DatePickerComponent
              id="mortgageBondissueDate"
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
              maxDate={new Date()}
              dateFormat="dd/mm/yy"
            />

            <DatePickerComponent
              id="mortgageBondDueDate"
              name="mortgageBondDueDate"
              label={"تاريخ الاستحقاق"}
              placeholder={"DD/MM/YYYY"}
              dateFormat="dd/mm/yy"
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
                  id="mortgageBondAmount"
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
                  id="mortgageBondCurrency"
                  name="mortgageBondCurrency"
                  register={register}
                  watch={watch}
                  setValueMethod={setValue}
                  options={CurrencyList}
                  optionLabel={`name.${$lang}`}
                  errors={errors}
                  onChange={(e) => setValue("mortgageBondCurrency", e.value)}
                  placeholder="دينار"
                  rules={{ required: "يجب اختيار عملة" }}
                  setValue={CurrencyList[0]}
                />
              </div>
            </div>

            <InputComponent
              id="mortgagBondDebtorName"
              type="text"
              name="mortgagBondDebtorName"
              placeholder="اسم المدين"
              register={register}
              errors={errors}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => {
                const letterValue = e.target.value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
                setValue("mortgagBondDebtorName", letterValue);
              }}
              value={watch("mortgagBondDebtorName")}
              label="اسم المدين"
              className="w-50-16px"
              rules={{ required: "يجب ادخال اسم المدين" }}
            />

            <InputComponent
              id="mortgageBondNationalNo"
              type="text"
              name="mortgageBondNationalNo"
              placeholder="مثال: 1234567"
              register={register}
              errors={errors}
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
              <h4>تحميل سند الرهن</h4>

              <div className="row">
                <AttachmentFileComponent
                  id="mortageBondAttach1"
                  name="mortageBondAttach1"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال صورة سند الرهن' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("mortageBondAttach1", e)}
                  Class="col-md-12 col-lg-6"
                  initFile={setInitAttachFile(props.rowDataEdit?.attachments[0])}
                />
              </div>
              <div className="row">
                <AttachmentFileComponent
                  id="mortageBondAttach2"
                  name="mortageBondAttach2"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال الواجهة الخلفية لسند الرهن' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("mortageBondAttach2", e)}
                  Class="col-md-12 col-lg-6"
                  initFile={setInitAttachFile(props.rowDataEdit?.attachments[1])}
                />
              </div>
            </div>

            <div className="actionBtns">
              <ButtonComponent Class={'BtnCancel'} onClick={() => props.closepopUpFn(false)}>إلغاء</ButtonComponent>
              <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(addMortageBondFn)}>

                {props.rowDataEdit?.id ? 'تعديل سند رهن' : 'إضافة سند رهن'}
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MortgageBond;
