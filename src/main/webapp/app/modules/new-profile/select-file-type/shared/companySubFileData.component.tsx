import React, { useState, useEffect } from "react";
import { translate } from "react-jhipster";
import {
  CheckBoxComponent,
  DropDownComponent,
  DropDownMultiComponent,
} from "@eachawy/frontend-library";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { FileTypes, OpponentCategories } from "app/modules/shared/constants";
import { getAllEmployees } from "../newProfileLookups.reducer";
import dayjs from "dayjs";
import { Storage } from "react-jhipster";


const CompanySubFileData = (props) => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(Date);
  const [allEmployees, setAllEmployees] = useState([]);
  const [allPrivateEmployees, setAllPrivateEmployees] = useState([]);
  const [isCompany, setIsCompany] = useState(null);
  const [applicantName, setApplicantName] = useState(null);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const $employees = useAppSelector((state) => state.createProfileLookups.employeesList);

  useEffect(() => {
    getAllLookups();
  }, []);


  useEffect(() => {
    if ($employees?.length > 0) {
      const arr = $employees.map(item => {
        return {
          name: {
            en: item?.nameEnglish,
            ar: item?.nameArabic
          },
          code: item?.id
        }
      })
      setAllEmployees(arr);
    }

    if (!isCompany) {
      setIsCompany(Storage.session.get('isCompany'));
    }
    if (!applicantName) {
      setApplicantName(Storage.session.get('applicantName'));
    }

  }, [$employees, isCompany, applicantName]);

  const getAllLookups = async () => {
    await dispatch(getAllEmployees());
  }

  const handleSelectEmployee = e => {
    props.setValue("selectedDelegatedPerson", e.value as object);
    const arr = allEmployees.filter((item: any) => {
      return item.code !== e.value.code
    });
    setAllPrivateEmployees(arr);
  }


  return (
    <div className="companySubFileData">
      <div>
        <h3>{isCompany ? translate("selectFileType.companySubFileData") : translate("selectFileType.individualSubFileData")}</h3>
        <div>
          <p>
            <label>{isCompany ? translate("selectFileType.companyName") : translate("selectFileType.individualName")}</label>
            {$lang === "en" ? applicantName?.en : applicantName?.ar}
          </p>
          <p>
            <label>{translate("selectFileType.fileOpenDate")}</label>{dayjs(date).format('DD-MM-YYYY')}
          </p>
        </div>
      </div>
      <div className="container p-0">
        <div className="row g-4 d-flex mb-4">
          <DropDownComponent
            id="fileType"
            name="fileType"
            register={props.register}
            watch={props.watch}
            setValueMethod={props.setValue}
            options={FileTypes}
            optionLabel={`name.${$lang === "en" ? "en" : "ar"}`}
            errors={props.errors}
            onChange={e => props.setValue("fileType", e.value as object)}
            placeholder={translate("selectFileType.fileTypePlaceholder")}
            rules={{ required: "You must select the file type." }}
            label={translate("selectFileType.fileTypeSelection")}
            className="col-md-6 flex-1"
          />
          <DropDownComponent
            id="selectedDelegatedPerson"
            name="selectedDelegatedPerson"
            register={props.register}
            watch={props.watch}
            setValueMethod={props.setValue}
            options={allEmployees}
            optionLabel={`name.${$lang === "en" ? "en" : "ar"}`}
            errors={props.errors}
            onChange={(e) => handleSelectEmployee(e)}
            placeholder={translate("selectFileType.delegatedPersonPlaceholder")}
            rules={{ required: "You must select the Delegated Person." }}
            filter
            label={translate("selectFileType.delegatedPersonName")}
            className="col-md-6 flex-1"
          />
        </div>
        {props.watch("selectedDelegatedPerson") && (
          <CheckBoxComponent
            id="vip"
            name="vip"
            label={translate("selectFileType.privateFile")}
            className="col-12 mb-2"
            register={props.register}
            errors={props.errors}
            setValueMethod={props.setValue}
            watch={props.watch}
            onChange={(e) => props.setValue("vip", e.value)}
          />
        )}

        {props.watch("vip") && (
          <div className="row g-4 mb-4">
            <DropDownMultiComponent
              id="privateEmployees"
              name="privateEmployees"
              label={translate("selectFileType.delegatedPersonName")}
              register={props.register}
              watch={props.watch}
              setValueMethod={props.setValue}
              options={allPrivateEmployees}
              optionLabel={`name.${$lang}`}
              onChange={(e) => props.setValue("privateEmployees", e.value as object)}
              placeholder={translate("selectFileType.delegatedPersonPlaceholder")}
              rules={{ required: "You must select the private persons." }}
              errors={props.errors}
              className="col-md-6"
            />
          </div>
        )}
      </div>
      {(props.watch("fileType")?.code === "COURT_CASE") &&
        props.watch("selectedDelegatedPerson") &&
        <div className="row g-4">
          <DropDownComponent
            id="opponentCategory"
            name="opponentCategory"
            label="صفة الخصم"
            register={props.register}
            watch={props.watch}
            setValueMethod={props.setValue}
            options={OpponentCategories}
            optionLabel={`name.${$lang}`}
            errors={props.errors}
            onChange={(e) =>
              props.setValue("opponentCategory", e.value as object)
            }
            placeholder="اختر صفة الخصم"
            rules={{ required: "You must select the legal status of the party" }}
            className="col-md-6"
          />
        </div>
      }
    </div>
  );
};

export default CompanySubFileData;

