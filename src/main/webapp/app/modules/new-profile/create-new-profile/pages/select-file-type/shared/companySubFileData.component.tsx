/* eslint-disable */
/*prettier-ignore */
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useForm } from "react-hook-form";
import {
  ButtonComponent,
  CheckBoxComponent,
  DropDownComponent,
  DropDownMultiComponent,
} from "@eachawy/frontend-library";
import { useAppSelector } from "app/config/store";

const CompanySubFileData = (props) => {

  const lang = useAppSelector((state) => state.locale.currentLocale);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({ mode: "onTouched" });

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

  const privateFileList = [
    { name: { ar: "محمد عبد الله رشوان", en: "Mohamed Abd Allah Rashwan" }, code: "PF1" },
    { name: { ar: "محمد أحمد على", en: "Mohamed Ahmed Ali" }, code: "PF2" },
    { name: { ar: "زكريا محمد محسن", en: "Zakaria Mohamed Mohsin" }, code: "PF3" },
    { name: { ar: "الدميري منصور عبد الرحمن", en: "Mansour Abd El Rahman El Demiry" }, code: "PF4" }
  ];

  const onSubmit = (data) => props.onChangeControls(data);

  useEffect(() => {
    if (props.triggerHandleSubmit > 0) {
      handleSubmit(data => onSubmit(data))();
    }
  }, [props.triggerHandleSubmit, props.onChangeControls]);

  const onChangeMultipleSelect = (e) => {
    setValue("privateFileSelection", e.value as []);
  }

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
      <div className="privateFileDiv">
        <div className="fileTypeAndDelegatedPersonDiv">
          <DropDownComponent
            id="fileType"
            name="fileType"
            label={translate("selectFileType.fileTypeSelection")}
            register={register}
            watch={watch}
            setValueMethod={setValue}
            options={fileTypes}
            optionLabel={`name.${lang === "en" ? "en" : "ar"}`}
            errors={errors}
            onChange={(e) => setValue("fileType", e.value as object)}
            placeholder={translate("selectFileType.fileTypePlaceholder")}
            rules={{ required: "You must select the file type." }}
          />
          <DropDownComponent
            id="selectedDelegatedPerson"
            name="selectedDelegatedPerson"
            label={translate("selectFileType.delegatedPersonName")}
            register={register}
            watch={watch}
            setValueMethod={setValue}
            options={delegatedPeopleNames}
            optionLabel={`name.${lang === "en" ? "en" : "ar"}`}
            errors={errors}
            onChange={e => setValue("selectedDelegatedPerson", e.value as object)}
            placeholder={translate("selectFileType.delegatedPersonPlaceholder")}
            rules={{ required: "You must select the Delegated Person." }}
            filter
          />
        </div>
        <CheckBoxComponent
          id="privateFileCheckBox"
          name="privateFileCheckBox"
          label={translate("selectFileType.privateFile")}
          register={register}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("privateFileCheckBox", e.value)}
        />

        {getValues().privateFileCheckBox && (
          <DropDownMultiComponent
            id="privateFileSelection"
            name="privateFileSelection"
            register={register}
            watch={watch}
            setValueMethod={setValue}
            display="chip"
            onChange={onChangeMultipleSelect}
            options={privateFileList}
            optionLabel={`name.${lang === "en" ? "en" : "ar"}`}
            placeholder={translate("selectFileType.privateFileSelection")}
            setValue={getValues().selectedDelegatedPerson && [getValues().selectedDelegatedPerson]}
          />
        )}
      </div>
    </div>
  );
};

export default CompanySubFileData;
