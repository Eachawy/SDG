import {
  AttachmentFileComponent,
  ButtonComponent,
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
import { addLegalBond } from "../legalBonds.reducer";
import _ from 'lodash';
import { setInitAttachFile } from "app/shared/util/utils";

const AccountStatement = (props) => {

  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);
  const $collectionFileId = ($createFileResponse?.collectionFile?.id) ?? Storage.session.get('collectionFileId');
  const $addLegalBondResponse = useAppSelector(state => state.legalBonds.addLegalBondResponse);

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch, } = useForm({ mode: "onTouched" });

  useEffect(() => {
    setValue("inputForm", "legalBonds");

    if ($addLegalBondResponse?.id) {
      props.closepopUpFn(false);
    }

  }, [setValue, $addLegalBondResponse]);

  useEffect(() => {
    if (props.rowDataEdit?.id) {
      setValue('accountStatNumber', props.rowDataEdit?.accountNumber);
      setValue('accountStatAmount', props.rowDataEdit?.totalAmount);
      setValue('accountStatCurrency', _.find(CurrencyList, (item) => item.code === props.rowDataEdit?.currency));
    }
  }, [props, setValue]);


  const cancelFn = () => {
    props.closepopUpFn(false)
  };

  const addAccountStatFn = async (data: any) => {
    setShowLoader(true);

    const obj = {
      collectionFileId: $collectionFileId,
      accountStatement: {
        ...(props.rowDataEdit?.id && { id: props.rowDataEdit?.id }),
        accountNumber: Number(data.accountStatNumber),
        totalAmount: Number(data.accountStatAmount),
        currency: data.accountStatCurrency?.code,
        attachments: [
          {
            attachmentType: "ACCOUNT_STATEMENT",
            name: data.accountStatAttach?.name,
            content: data.accountStatAttach?.base64,
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
          <div className="row promissoryNotePopup _accountStatement">
            <h4>إضافة بيانات كشف حساب</h4>

            <InputComponent
              id="accountStatNumber"
              type="text"
              name="accountStatNumber"
              placeholder="مثال: 1234567"
              register={register}
              errors={errors}
              setValueMethod={setValue}
              watch={watch}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setValue("accountStatNumber", numericValue);
              }}
              // value={watch("accountStatNumber")}
              label="رقم كشف الحساب"
              className="col-md-6"
              rules={{ required: "يجب ادخال رقم كشف الحساب" }}
            />

            <div className="ammountDiv row col-md-6">
              <InputComponent
                id="accountStatAmount"
                type="text"
                name="accountStatAmount"
                placeholder="المبلغ"
                register={register}
                errors={errors}
                setValueMethod={setValue}
                watch={watch}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setValue("accountStatAmount", numericValue);
                }}
                rules={{ required: "يجب ادخال المبلغ" }}
                label="اجمالي المبلغ"
              />

              <DropDownComponent
                id="accountStatCurrency"
                name="accountStatCurrency"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={CurrencyList}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => setValue("accountStatCurrency", e.value)}
                placeholder="دينار"
                rules={{ required: "يجب اختيار العملة" }}
                setValue={CurrencyList[0]}
              />
            </div>

            <div className="uploaderContainer w-100">
              <h4>تحميل كشف حساب <span className="text-danger">*</span></h4>

              <div className="row">
                <AttachmentFileComponent
                  id="accountStatAttach"
                  name="accountStatAttach"
                  lang={$lang}
                  register={register}
                  watch={watch}
                  rules={{ required: 'يجب ادخال صورة كشف الحساب' }}
                  errors={errors}
                  setValueMethod={setValue}
                  attachList={(e) => setValue("accountStatAttach", e)}
                  Class="col-md-12 col-lg-6"
                  initFile={setInitAttachFile(props.rowDataEdit?.attachments[0])}
                />
              </div>
            </div>


            <div className="actionBtns">
              <ButtonComponent Class={'BtnCancel'} onClick={() => cancelFn()}>إلغاء</ButtonComponent>
              <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(addAccountStatFn)}> 
                {props.rowDataEdit?.id ? 'تعديل كشف حساب' : 'إضافة كشف حساب'}
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountStatement;
