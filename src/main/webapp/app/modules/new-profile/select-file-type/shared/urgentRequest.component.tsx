import {
  AttachmentMultiFilesComponent,
  DatePickerComponent,
  DropDownComponent,
  InputComponent,
} from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { CurrencyList } from "app/modules/shared/constants";
import { getAllCourts, getAllJudges, getAllRequestTypes } from "../newProfileLookups.reducer";

const UrgentRequest = (props) => {

  const dispatch = useAppDispatch();
  const [allRequestTypes, setAllRequestTypes] = useState([]);
  const [allCourts, setAllCourts] = useState([]);
  const [allJudges, setAllJudges] = useState([]);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $requestTypes = useAppSelector((state) => state.createProfileLookups.requestTypesList);
  const $courts = useAppSelector((state) => state.createProfileLookups.courtsList);
  const $judges = useAppSelector((state) => state.createProfileLookups.judgesList);

  useEffect(() => {
    getAllLookups();
  }, []);


  useEffect(() => {
    if ($requestTypes?.length > 0) {
      const arr = $requestTypes.map(item => {
        return {
          name: {
            en: item?.englishName,
            ar: item?.arabicName
          },
          code: item?.id
        }
      })
      setAllRequestTypes(arr);
    }

    if ($courts?.length > 0) {
      const arr = $courts.map(item => {
        return {
          name: {
            en: item?.englishName,
            ar: item?.arabicName
          },
          code: item?.id
        }
      })
      setAllCourts(arr);
    }

    if ($judges?.length > 0) {
      const arr = $judges.map(item => {
        return {
          name: {
            en: item?.englishName,
            ar: item?.arabicName
          },
          code: item?.id
        }
      })
      setAllJudges(arr);
    }

  }, [$requestTypes, $courts, $judges]);

  const getAllLookups = async () => {
    await dispatch(getAllRequestTypes());
    await dispatch(getAllCourts());
    await dispatch(getAllJudges());
  }

  return (
    <div className="urgentRequest container p-0">
      <h4>بيانات طلب مستعجل</h4>
      <div className="row g-4 gy-4 d-flex mb-4">
        <DropDownComponent
          id="requestType"
          name="requestType"
          label="نوع الطلب"
          register={props.register}
          watch={props.watch}
          setValueMethod={props.setValue}
          options={allRequestTypes}
          optionLabel={`name.${$lang}`}
          errors={props.errors}
          onChange={(e) => props.setValue("requestType", e.value as object)}
          placeholder="اختر نوع الطلب"
          rules={{ required: "يجب اختيار نوع الطلب" }}
          className="col-md-6 flex-1 mb-4"
        />

        <DropDownComponent
          id="court"
          name="court"
          label="موقع المحكمة"
          register={props.register}
          watch={props.watch}
          setValueMethod={props.setValue}
          options={allCourts}
          optionLabel={`name.${$lang}`}
          // errors={props.errors}
          onChange={(e) => props.setValue("court", e.value as object)}
          placeholder="اختر موقع المحكمة"
          // rules={{ required: "يجب اختيار موقع المحكمة" }}
          className="col-md-6 mb-4"
        />

        <DropDownComponent
          id="judge"
          name="judge"
          label="القاضي"
          register={props.register}
          watch={props.watch}
          setValueMethod={props.setValue}
          options={allJudges}
          optionLabel={`name.${$lang}`}
          onChange={(e) => props.setValue("judge", e.value as object)}
          placeholder="ادخل اسم القاضي"
          // errors={props.errors}
          // rules={{ required: "يجب اختيار اسم القاضي" }}
          className="col-md-6 mb-4"
        />

        <InputComponent
          id="requestNumber"
          type="text"
          name="requestNumber"
          label="رقم الطلب"
          placeholder="رقم الطلب"
          register={props.register}
          setValueMethod={props.setValue}
          watch={props.watch}
          onChange={(e) => props.setValue("requestNumber", e.target.value)}
          // errors={props.errors}
          // rules={{ required: "يجب ادخال رقم الطلب" }}
          className="col-md-6 flex-1 mb-4"
        />

        <DatePickerComponent
          id="urgentRequestRecordDate"
          name="urgentRequestRecordDate"
          label={"تاريخ تسجيل الطلب"}
          placeholder={"DD/MM/YYYY"}
          register={props.register}
          // rules={{ required: "You must select urgent request record date" }}
          // errors={props.errors}
          setValueMethod={props.setValue}
          watch={props.watch}
          onChange={(e) => props.setValue("urgentRequestRecordDate", e.target.value)}
          className="col-md-6 flex-1 mb-4"
        />

        <div className="amountToCollect row p-0 col-md-6 mb-4">
          <InputComponent
            id="urgentRequestAmount"
            type="text"
            name="urgentRequestAmount"
            placeholder={translate("createNewProfile.exm") + "20,000"}
            register={props.register}
            errors={props.errors}
            setValueMethod={props.setValue}
            watch={props.watch}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              props.setValue("urgentRequestAmount", numericValue);
            }}
            label="المبلغ المراد تحصيله"
          />
          <DropDownComponent
            id="urgentRequestCurrency"
            name="urgentRequestCurrency"
            register={props.register}
            watch={props.watch}
            setValueMethod={props.setValue}
            options={CurrencyList}
            optionLabel={`name.${$lang}`}
            errors={props.errors}
            onChange={(e) => props.setValue("urgentRequestCurrency", e.value as object)}
            placeholder="دينار"
            setValue={CurrencyList[0]}
          />
        </div>



        <div className="uploaderContainer">
          <h4>{translate("createNewProfile.attachments")}</h4>
          <div className="row">
            {/* <AttachmentFileComponent
              id="urgentCaseAttach_1"
              name="urgentCaseAttach_1"
              lang={$lang}
              register={props.register}
              watch={props.watch}
              // rules={{ required: 'يجب ادخال المىفقات' }}
              // errors={props.errors}
              setValueMethod={props.setValue}
              attachList={(e) => props.setValue("urgentCaseAttach_1", e)}
              Class="col-md-12 col-lg-6"
            />
            <AttachmentFileComponent
              id="urgentCaseAttach_2"
              name="urgentCaseAttach_2"
              lang={$lang}
              register={props.register}
              watch={props.watch}
              // rules={{ required: 'يجب ادخال المىفقات' }}
              // errors={errors}
              setValueMethod={props.setValue}
              attachList={(e) => props.setValue("urgentCaseAttach_2", e)}
              Class="col-md-12 col-lg-6"
            /> */}
            <AttachmentMultiFilesComponent
              name={"urgentCaseAttach"}
              attachList={(e) => props.setValue("urgentCaseAttach", e)}
              lang={$lang}
              register={props.register}
              watch={props.watch}
              setValueMethod={props.setValue}
              fileTypePlaceHolder={'Select a File Type'}
              Class="col-md-12 col-lg-6"
            />
          </div>

        </div>
      </div>

      <div className="uploaderContainer">
        <h4>{translate("createNewProfile.attachments")}</h4>
      </div>
    </div>
  );
};

export default UrgentRequest;
