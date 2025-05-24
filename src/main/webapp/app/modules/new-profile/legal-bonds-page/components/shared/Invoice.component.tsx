import {
  AttachmentFileComponent,
  ButtonComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { Storage } from "react-jhipster";
import { useAppDispatch, useAppSelector } from "app/config/store";
import {
  useForm,
} from "react-hook-form";
import { CurrencyList } from "app/modules/shared/constants";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import dayjs from "dayjs";
import { addLegalBond } from "../legalBonds.reducer";
import _ from 'lodash';
import { setInitAttachFile } from "app/shared/util/utils";

const Invoice = (props) => {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);
  const $fileId = ($createFileResponse?.collectionFile?.id) ?? Storage.session.get('fileId');
  const $addLegalBondResponse = useAppSelector(state => state.legalBonds.addLegalBondResponse);

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch, } = useForm({ mode: "onTouched" });

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
      setValue('invoiceAmount', props.rowDataEdit?.totalAmount);
      setValue('invoiceNo', props.rowDataEdit?.invoiceNumber);
      setValue('invoiceIssueDate', new Date(props.rowDataEdit?.invoiceDate));
      setValue('invoiceCurrency', _.find(CurrencyList, (item) => item.code === props.rowDataEdit?.currency));
    }
  }

  const addInvoiceFn = async (data: any) => {
    setShowLoader(true);

    const obj = {
      fileId: $fileId,
      invoice: {
        ...(props.rowDataEdit?.id && { id: props.rowDataEdit?.id }),
        totalAmount: Number(data.invoiceAmount),
        currency: data.invoiceCurrency?.code,
        invoiceDate: dayjs(data.invoiceIssueDate).format('YYYY-MM-DD'),
        invoiceNumber: data.invoiceNo,
        attachments: [
          {
            attachmentType: "INVOICE",
            name: data.invoiceAttach?.name,
            content: data.invoiceAttach?.base64,
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
              dateFormat="dd/mm/yy"
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
                id="invoiceCurrency"
                name="invoiceCurrency"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={CurrencyList}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => setValue("invoiceCurrency", e.value)}
                placeholder="دينار"
                setValue={CurrencyList[0]}
                rules={{ required: "يجب اختيار العملة" }}
              />
            </div>

            <InputComponent
              id="invoiceNo-id"
              type="text"
              name="invoiceNo"
              placeholder="مثال: 1234567"
              register={register}
              errors={errors}
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
                <AttachmentFileComponent
                  id="invoiceAttach"
                  name="invoiceAttach"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال صورة الفاتورة' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("invoiceAttach", e)}
                  Class="col-md-12 col-lg-6"
                  initFile={setInitAttachFile(props.rowDataEdit?.attachments[0])}
                />
              </div>
            </div>

            <div className="actionBtns">
              <ButtonComponent Class={'BtnCancel'} onClick={() => props.closepopUpFn(false)}>إلغاء</ButtonComponent>
              <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(addInvoiceFn)}>
                {props.rowDataEdit?.id ? 'تعديل الفاتورة' : 'إضافة فاتورة'}
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
