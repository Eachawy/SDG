/* eslint-disable prettier/prettier */
import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useState } from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "../../../Shared/createNewProfileSteps.component";
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router";

interface Country {
    name: string;
    code: string;
}

const CreateNewProfilePage = () => {
    const [fileType, setFileType] = useState('')

    const [NameAr, setNameAr] = useState('');
    const [NameEn, setNameEn] = useState('');
    const [nationalNumber, setNationalNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('')


    const navigate = useNavigate();
    const countryCode: Country[] = [
        { name: '+962', code: 'ORD' },
        { name: '+20', code: 'EGY' },
    ]

    const saveAndCloseFn = () => {

    }

    const nextFn = () => {
        navigate("/select-file-type");
    };

    return (
        <div className="createNewProfilePage">
            <BreadcrumbComponent />
            <CreateNewProfileStepsComponent step={1} />
            <div className="sdg_page">
                <label className="serialNo">{translate("createNewProfile.serialNumber")}<span>1256543</span></label>

                <div className="radioButtonDiv">
                    <div className="flex align-items-center">
                        <RadioButton inputId="fileType2" name="corporate" value="corporate" onChange={(e) => setFileType(e.value)} checked={fileType === 'corporate'} />
                        <label htmlFor="fileType2" className="ml-2">{translate("createNewProfile.companyTypeCorporate")}</label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="fileType1" name="personal" value="personal" onChange={(e) => setFileType(e.value)} checked={fileType === 'personal'} />
                        <label htmlFor="fileType1" className="ml-2">{translate("createNewProfile.companyTypePersonal")}</label>
                    </div>
                </div>

                <div className="profileDataContainer">
                    <div>
                        <label>{translate("createNewProfile.companyNameAr", {
                            name: fileType === "corporate" ? translate("createNewProfile.company") :
                                translate("createNewProfile.person")
                        })}<span>*</span></label>
                        <InputText placeholder={translate("createNewProfile.companyNameAr", {
                            name: fileType === "corporate" ? translate("createNewProfile.company") :
                                translate("createNewProfile.person")
                        })} value={NameAr} onChange={(e) => setNameAr(e.target.value)} />
                    </div>
                    <div>
                        <label>{translate("createNewProfile.companyNameEn", {
                            name: fileType === "corporate" ? translate("createNewProfile.company") :
                                translate("createNewProfile.person")
                        })}<span>*</span></label>
                        <InputText placeholder={translate("createNewProfile.companyNameEn", {
                            name: fileType === "corporate" ? translate("createNewProfile.company") :
                                translate("createNewProfile.person")
                        })} value={NameEn} onChange={(e) => setNameEn(e.target.value)} />
                    </div>
                    <div>
                        <label>{translate("createNewProfile.nationalNumber")}<span>*</span></label>
                        <InputText placeholder={translate("createNewProfile.exm") + "1234567"} className="nationalNoInput" value={nationalNumber} onChange={(e) => setNationalNumber(e.target.value)} />
                    </div>
                    <div>
                        <label>{translate("createNewProfile.address")}<span>*</span></label>
                        <InputText placeholder={translate("createNewProfile.enterTheAddress")} value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div>
                        <label>{translate("createNewProfile.phoneNumber")}<span>*</span></label>
                        <div>
                            <Dropdown value={selectedCountryCode} onChange={(e) => setSelectedCountryCode(e.value)} options={countryCode} optionLabel="name"
                                placeholder="+962" className="countryCode" />
                            <InputText placeholder={translate("createNewProfile.exm") + "1234567"} className="nationalNoInput" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label>{translate("createNewProfile.email")}<span>*</span></label>
                        <InputText placeholder={translate("loginPage.emailPlaceholder")} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="uploaderContainer">
                    <h4>{translate("createNewProfile.attachments")}</h4>
                </div>

                <div className="actionBtns">
                    <div onClick={saveAndCloseFn} className="white_btnStyle">{translate("createNewProfile.saveAndClose")}</div>
                    <div onClick={nextFn} className="btnStyle">{translate("createNewProfile.next")}</div>
                </div>

            </div>
        </div>
    );
};

export default CreateNewProfilePage;
