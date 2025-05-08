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
import { getAllCaseTypes, getAllCourts, getAllJudges } from "../newProfileLookups.reducer";

const Lawsuits = (props) => {
  const dispatch = useAppDispatch();
  const [allCaseTypes, setAllCaseTypes] = useState([]);
  const [allCourts, setAllCourts] = useState([]);
  const [allJudges, setAllJudges] = useState([]);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $caseTypes = useAppSelector((state) => state.createProfileLookups.caseTypesList);
  const $courts = useAppSelector((state) => state.createProfileLookups.courtsList);
  const $judges = useAppSelector((state) => state.createProfileLookups.judgesList);

  useEffect(() => {
    getAllLookups();
  }, []);


  useEffect(() => {
    if ($caseTypes?.length > 0) {
      const arr = $caseTypes.map(item => {
        return {
          name: {
            en: item?.englishName,
            ar: item?.arabicName
          },
          code: item?.id
        }
      })
      setAllCaseTypes(arr);
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

  }, [$caseTypes, $courts, $judges]);

  const getAllLookups = async () => {
    await dispatch(getAllCaseTypes());
    await dispatch(getAllCourts());
    await dispatch(getAllJudges());
  }

  return (
    <>
      <div className="lawsuits container p-0">
        <h4>بيانات قضايا</h4>
        <div className="row g-4 gy-4 d-flex mb-4">
          <DropDownComponent
            id="caseType"
            name="caseType"
            label="نوع القاضية"
            register={props.register}
            watch={props.watch}
            setValueMethod={props.setValue}
            options={allCaseTypes}
            optionLabel={`name.${$lang}`}
            onChange={(e) => props.setValue("caseType", e.value as object)}
            placeholder="اختر نوع القاضية"
            errors={props.errors}
            rules={{ required: "يجب اختيار نوع القاضية" }}
            className="col-md-6 mb-4"
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
            onChange={(e) => props.setValue("court", e.value as object)}
            placeholder="اختر موقع المحكمة"
            // errors={props.errors}
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
            placeholder="اختر اسم القاضي"
            // errors={props.errors}
            // rules={{ required: "يجب اختيارالقاضي" }}
            className="col-md-6 flex-1 mb-4"
          />

          <InputComponent
            id="caseNumber"
            type="text"
            name="caseNumber"
            label="رقم القضية"
            placeholder="رقم القضية"
            register={props.register}
            setValueMethod={props.setValue}
            watch={props.watch}
            onChange={(e) => props.setValue("caseNumber", e.target.value)}
            // errors={props.errors}
            // rules={{ required: "يجب ادخال رقم القضية" }}
            className="col-md-6 flex-1 mb-4"
          />

          <DatePickerComponent
            id="lawsuitsRecordDate"
            name="lawsuitsRecordDate"
            label={"تاريخ تسجيل القضية"}
            placeholder={"DD/MM/YYYY"}
            register={props.register}
            // rules={{ required: "يجب اختيار تاريخ تسجيل القضية" }}
            // errors={props.errors}
            setValueMethod={props.setValue}
            watch={props.watch}
            onChange={(e) => props.setValue("lawsuitsRecordDate", e.target.value)}
            className="col-md-6 flex-1 mb-4"
          />


          <div className="amountToCollect row p-0 col-md-6 mb-4">
            <InputComponent
              id="lawsuitsAmount"
              type="text"
              name="lawsuitsAmount"
              placeholder={translate("createNewProfile.exm") + "20,000"}
              register={props.register}
              errors={props.errors}
              setValueMethod={props.setValue}
              watch={props.watch}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                props.setValue("lawsuitsAmount", numericValue);
              }}
              label="المبلغ المراد تحصيله"
            />
            <DropDownComponent
              id="lawsuitsCurrency"
              name="lawsuitsCurrency"
              register={props.register}
              watch={props.watch}
              setValueMethod={props.setValue}
              options={CurrencyList}
              optionLabel={`name.${$lang}`}
              errors={props.errors}
              onChange={(e) => props.setValue("lawsuitsCurrency", e.value as object)}
              placeholder="دينار"
              setValue={CurrencyList[0]}
            />
          </div>


          <div className="uploaderContainer">
            <h4>{translate("createNewProfile.attachments")}</h4>
            <div className="row">
              {/* <AttachmentFileComponent
                id="lawsuitsAttach_1"
                name="lawsuitsAttach_1"
                lang={$lang}
                register={props.register}
                watch={props.watch}
                // rules={{ required: 'يجب ادخال المىفقات' }}
                // errors={props.errors}
                setValueMethod={props.setValue}
                attachList={(e) => props.setValue("lawsuitsAttach_1", e)}
                Class="col-md-12 col-lg-6"
              />
              <AttachmentFileComponent
                id="lawsuitsAttach_2"
                name="lawsuitsAttach_2"
                lang={$lang}
                register={props.register}
                watch={props.watch}
                // rules={{ required: 'يجب ادخال المىفقات' }}
                // errors={errors}
                setValueMethod={props.setValue}
                attachList={(e) => props.setValue("lawsuitsAttach_2", e)}
                Class="col-md-12 col-lg-6"
              /> */}
              <AttachmentMultiFilesComponent
                name={"lawsuitsAttach"}
                attachList={(e) => props.setValue("lawsuitsAttach", e)}
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
    </>
  );
};

export default Lawsuits;
