import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useForm } from "react-hook-form";
import {
  CheckBoxComponent,
  DropDownComponent,
} from "@eachawy/frontend-library";
import { useAppSelector } from "app/config/store";

const CompanySubFileData = (props) => {
  const { triggerHandleSubmit, onValidationSuccess } = props;
  const lang = useAppSelector((state) => state.locale.currentLocale);

  const [privateFileCheck, setPrivateFileCheckBox] = useState(false);
  const [selectedPrivateFile, setSelectedPrivateFile] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    setValue("companyType", "corporateType");
  }, [setValue]);

  const fileTypes = [
    { name: { ar: "قضايا", en: "Lawsuits" }, code: "T1" },
    { name: { ar: "طلب مستعجل", en: "Urgent Request" }, code: "T2" },
    { name: { ar: "تحصيل", en: "Collection" }, code: "T3" },
  ];

  const delegatedPeopleNames = [
    {
      name: { ar: "محمد عبد الله رشوان", en: "Mohamed Abd Allah Rashwan" },
      code: "P1",
    },
    { name: { ar: "محمد أحمد على", en: "Mohamed Ahmed Ali" }, code: "P2" },
    {
      name: { ar: "زكريا محمد محسن", en: "Zakaria Mohamed Mohsin" },
      code: "P3",
    },
  ];

  const legalStatusOfTheParty = [
    {
      name: { ar: "مدعى عليه", en: "Defendant" },
      code: "DE",
    },
    { name: { ar: "مشتكى عليه", en: "Accused" }, code: "AC" },
  ];

  const privateFileList = [
    {
      name: { ar: "محمد عبد الله رشوان", en: "Mohamed Abd Allah Rashwan" },
      code: "PF1",
    },
    { name: { ar: "محمد أحمد على", en: "Mohamed Ahmed Ali" }, code: "PF2" },
    {
      name: { ar: "زكريا محمد محسن", en: "Zakaria Mohamed Mohsin" },
      code: "PF3",
    },
    {
      name: {
        ar: "الدميري منصور عبد الرحمن",
        en: "Mansour Abd El Rahman El Demiry",
      },
      code: "PF4",
    },
  ];

  useEffect(() => {
    setSelectedPrivateFile((prevSelected) => {
      if (!prevSelected.some((item) => item.code === privateFileList[0].code)) {
        return [privateFileList[0], ...prevSelected];
      }
      return prevSelected;
    });
  }, []);

  const handleSelectionChange = (e: MultiSelectChangeEvent) => {
    const selectedValues = e.value.filter(
      (item) => item.code !== privateFileList[0].code,
    );
    setSelectedPrivateFile([privateFileList[0], ...selectedValues]);
  };

  const onPrivateFileChange = (e) => {
    setPrivateFileCheckBox(e);
  };

  const onSubmit = (data) => {
    // console.log("Form submitted:", data);
    onValidationSuccess(true);
  };

  useEffect(() => {
    if (triggerHandleSubmit > 0) {
      handleSubmit(
        (data) => onSubmit(data),
        () => onValidationSuccess(false),
      )();
    }
  }, [triggerHandleSubmit, handleSubmit, onValidationSuccess]);

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
            optionLabel={`name.${lang}`}
            errors={errors}
            onChange={(e) => setValue("fileType", e.value as object)}
            placeholder={translate("selectFileType.fileTypePlaceholder")}
            // placeholder="Test Placeholder"
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
            optionLabel={`name.${lang}`}
            errors={errors}
            onChange={(e) =>
              setValue("selectedDelegatedPerson", e.value as object)
            }
            placeholder={translate("selectFileType.delegatedPersonPlaceholder")}
            rules={{ required: "You must select the Delegated Person." }}
            filter
          />
        </div>
        {/* <div className="checkBoxDiv">
                    <Checkbox
                        inputId="privateFileCheckBox"
                        name="privateFileCheckBox"
                        value="privateFileCheckBox"
                        onChange={(e) => onPrivateFileChange(e.checked)}
                        checked={privateFileCheck}
                    />
                    <label htmlFor="privateFileCheckBox" className="ml-2">
                        {translate("selectFileType.privateFile")}
                    </label>
                </div> */}

        <CheckBoxComponent
          id="privateFileCheckBox"
          name="privateFileCheckBox"
          label={translate("selectFileType.privateFile")}
          className="mb-2"
          register={register}
          errors={errors}
          setValueMethod={setValue}
          watch={watch}
          onChange={(e) => setValue("privateFileCheckBox", e.value)}
        />

        {watch("privateFileCheckBox") && (
          <div className="privateFileMultiSelect">
            <MultiSelect
              value={selectedPrivateFile}
              onChange={handleSelectionChange}
              options={privateFileList}
              optionLabel="name.ar"
              display="chip"
              placeholder={translate("selectFileType.privateFileSelection")}
              itemTemplate={(option) => (
                <div
                  style={{
                    opacity: option.code === privateFileList[0].code ? 0.7 : 1,
                  }}
                >
                  {option.name.ar}
                </div>
              )}
            />
          </div>
        )}
      </div>

      <div className="selectedLegalStatusOfThePartyDiv">
        <DropDownComponent
          id="selectedLegalStatusOfTheParty"
          name="selectedLegalStatusOfTheParty"
          label="صفة الخصم"
          register={register}
          watch={watch}
          setValueMethod={setValue}
          options={legalStatusOfTheParty}
          optionLabel={`name.${lang}`}
          errors={errors}
          onChange={(e) =>
            setValue("selectedLegalStatusOfTheParty", e.value as object)
          }
          placeholder="اختر صفة الخصم"
          rules={{ required: "You must select the legal status of the party" }}
        />
      </div>
    </div>
  );
};

export default CompanySubFileData;
