import React from "react";
import { translate } from "react-jhipster";
import { MultiSelectChangeEvent } from "primereact/multiselect";
import {
  CheckBoxComponent,
  DropDownComponent,
  DropDownMultiComponent,
} from "@eachawy/frontend-library";
import { useAppSelector } from "app/config/store";

const CompanySubFileData = (props) => {

  const $lang = useAppSelector((state) => state.locale.currentLocale);

  const fileTypes = [
    { name: { ar: "قضايا", en: "Lawsuits" }, code: "T1" },
    { name: { ar: "طلب مستعجل", en: "Urgent Request" }, code: "T2" },
    { name: { ar: "تحصيل", en: "Collection" }, code: "T3" },
  ];

  const delegatedPeopleNames = [
    { name: { ar: "محمد عبد الله رشوان", en: "Mohamed Abd Allah Rashwan" }, code: "PF1" },
    { name: { ar: "محمد أحمد على", en: "Mohamed Ahmed Ali" }, code: "PF2" },
    { name: { ar: "زكريا محمد محسن", en: "Zakaria Mohamed Mohsin" }, code: "PF3" }
  ];

  const legalStatusOfTheParty = [
    {
      name: { ar: "مدعى عليه", en: "Defendant" },
      code: "DE",
    },
    { name: { ar: "مشتكى عليه", en: "Accused" }, code: "AC" },
  ];

  const privateFileList = [
    { name: { ar: "محمد عبد الله رشوان", en: "Mohamed Abd Allah Rashwan" }, code: "PF1" },
    { name: { ar: "محمد أحمد على", en: "Mohamed Ahmed Ali" }, code: "PF2" },
    { name: { ar: "زكريا محمد محسن", en: "Zakaria Mohamed Mohsin" }, code: "PF3" },
    { name: { ar: "الدميري منصور عبد الرحمن", en: "Mansour Abd El Rahman El Demiry" }, code: "PF4" }
  ];

  const handleSelectionChange = (e: MultiSelectChangeEvent) => {
    const selectedValues = e.value.filter(
      (item) => item.code !== privateFileList[0].code,
    );
    props.setValue('privateFileSelection', [privateFileList[0], ...selectedValues]);
  };

  return (
    <div className="companySubFileData">
      <div>
        <h3>{translate("selectFileType.companySubFileData")}</h3>
        <div>
          <p>
            <label>{translate("selectFileType.companyName")}</label>شركة النور
            للتحصيل والمحاماة
          </p>
          <p>
            <label>{translate("selectFileType.fileOpenDate")}</label>02-12-2024
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
            options={fileTypes}
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
            options={delegatedPeopleNames}
            optionLabel={`name.${$lang === "en" ? "en" : "ar"}`}
            errors={props.errors}
            onChange={(e) => props.setValue("selectedDelegatedPerson", e.value as object)}
            placeholder={translate("selectFileType.delegatedPersonPlaceholder")}
            rules={{ required: "You must select the Delegated Person." }}
            filter
            label={translate("selectFileType.delegatedPersonName")}
            className="col-md-6 flex-1"
          />
        </div>
        <CheckBoxComponent
          id="privateFileCheckBox"
          name="privateFileCheckBox"
          label={translate("selectFileType.privateFile")}
          className="col-12 mb-2"
          register={props.register}
          errors={props.errors}
          setValueMethod={props.setValue}
          watch={props.watch}
          onChange={(e) => props.setValue("privateFileCheckBox", e.value)}
        />
        {props.watch("privateFileCheckBox") && (
          <div className="row g-4 mb-4">
            <DropDownMultiComponent
              name="privateFileSelection"
              label={translate("selectFileType.delegatedPersonName")}
              register={props.register}
              watch={props.watch}
              setValueMethod={props.setValue}
              options={privateFileList}
              optionLabel={`name.${$lang}`}
              onChange={handleSelectionChange}
              placeholder={translate("selectFileType.delegatedPersonPlaceholder")}
              rules={{ required: "You must select the Delegated Person." }}
              setValue={props.watch('selectedDelegatedPerson') && [props.watch('selectedDelegatedPerson')]}
              className="col-md-6"
            />
          </div>
        )}
      </div>
      {props.watch("fileType")?.code === "T1" &&
        <div className="row g-4">
          <DropDownComponent
            id="selectedLegalStatusOfTheParty"
            name="selectedLegalStatusOfTheParty"
            label="صفة الخصم"
            register={props.register}
            watch={props.watch}
            setValueMethod={props.setValue}
            options={legalStatusOfTheParty}
            optionLabel={`name.${$lang}`}
            errors={props.errors}
            onChange={(e) =>
              props.setValue("selectedLegalStatusOfTheParty", e.value as object)
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
