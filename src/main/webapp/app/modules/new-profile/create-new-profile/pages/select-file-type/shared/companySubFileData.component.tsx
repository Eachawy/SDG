/* eslint-disable prettier/prettier */
import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';


const CompanySubFileData = (props) => {

    const [privateFileCheck, setPrivateFileCheckBox] = useState(false)
    const [fileType, setFileType] = useState(null)
    const [selectedDelegatedPerson, setSelectedDelegatedPerson] = useState(null)


    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const fileTypes = [
        { name: { ar: 'قضايا', en: 'Lawsuits' }, code: "T1" },
        { name: { ar: 'طلب مستعجل', en: 'Urgent Request' }, code: "T2" },
        { name: { ar: 'تحصيل', en: 'Collection' }, code: "T3" }
    ]

    const delegatedPeopleNames = [
        { name: { ar: 'محمد عبد الله رشوان', en: 'Mohamed Abd Allah Rashwan' }, code: "P1" },
        { name: { ar: 'محمد أحمد على', en: 'Mohamed Ahmed Ali' }, code: "P2" },
        { name: { ar: 'زكريا محمد محسن', en: 'Zakaria Mohamed Mohsin' }, code: "P3" }
    ]

    const privateFileList = [
        { name: { ar: 'محمد عبد الله رشوان', en: 'Mohamed Abd Allah Rashwan' }, code: "PF1" },
        { name: { ar: 'محمد أحمد على', en: 'Mohamed Ahmed Ali' }, code: "PF2" },
        { name: { ar: 'زكريا محمد محسن', en: 'Zakaria Mohamed Mohsin' }, code: "PF3" },
        { name: { ar: 'الدميري منصور عبد الرحمن', en: 'Mansour Abd El Rahman El Demiry' }, code: "PF4" },
    ]

    const [selectedPrivateFile, setSelectedPrivateFile] = useState([privateFileList[0]]);


    useEffect(() => {
        setSelectedPrivateFile(prevSelected => {
            if (!prevSelected.some(item => item.code === privateFileList[0].code)) {
                return [privateFileList[0], ...prevSelected];
            }
            return prevSelected;
        });
    }, []);


    const handleSelectionChange = (e: MultiSelectChangeEvent) => {
        const selectedValues = e.value.filter(item => item.code !== privateFileList[0].code);
        setSelectedPrivateFile([privateFileList[0], ...selectedValues]);
    };

    const onPrivateFileChange = (e) => {
        setPrivateFileCheckBox(e);
    };

    // const sessionLocale = sessionStorage?.getItem("locale");

    return (
        <div className='companySubFileData'>
            <div>
                <h3>{translate("selectFileType.companySubFileData")}</h3>
                <div>
                    <p><label>{translate("selectFileType.companyName")}</label>شركة النور للتحصيل والمحاماة</p>
                    <p><label>{translate("selectFileType.fileOpenDate")}</label>02-12-2024</p>
                </div>
            </div>

            <div className="privateFileDiv">
                <div className="fileTypeAndDelegatedPersonDiv">

                    <div>
                        <label className="ml-2">{translate("selectFileType.fileTypeSelection")}<span>*</span></label>
                        <Dropdown
                            value={fileType}
                            onChange={(e) => setFileType(e.value)}
                            options={fileTypes}
                            optionLabel="name.ar"
                            placeholder={translate("selectFileType.fileTypePlaceholder")}
                            className="dropdownList"
                        />
                    </div>

                    <div>
                        <label className="ml-2">{translate("selectFileType.delegatedPersonName")}<span>*</span></label>
                        <Dropdown
                            value={selectedDelegatedPerson}
                            onChange={(e) => setSelectedDelegatedPerson(e.value)}
                            options={delegatedPeopleNames}
                            optionLabel="name.ar"
                            placeholder={translate("selectFileType.delegatedPersonPlaceholder")}
                            className="custom-multiselect w-full md:w-20rem"
                            filter
                            filterPlaceholder={translate("selectFileType.searchPlaceholder")}
                        />
                    </div>
                </div>
                <div className="checkBoxDiv">
                    <Checkbox inputId="privateFileCheckBox" name="privateFileCheckBox" value="privateFileCheckBox" onChange={e => onPrivateFileChange(e.checked)} checked={privateFileCheck} />
                    <label htmlFor="privateFileCheckBox" className="ml-2">{translate("selectFileType.privateFile")}</label>
                </div>
                {privateFileCheck && (
                    <div className="privateFileMultiSelect">
                        <MultiSelect
                            value={selectedPrivateFile}
                            onChange={handleSelectionChange}
                            options={privateFileList}
                            optionLabel="name.ar"
                            display="chip"
                            placeholder={translate("selectFileType.privateFileSelection")}
                            itemTemplate={(option) => (
                                <div style={{ opacity: option.code === privateFileList[0].code ? 0.7 : 1 ,
                                 }}>
                                    {option.name.ar}
                                </div>
                            )}
                            disabled={false}
                        />
                    </div>
                )}
            </div>
        </div>
    )
};

export default CompanySubFileData;
