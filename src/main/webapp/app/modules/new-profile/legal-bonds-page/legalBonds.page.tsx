import CreateNewProfileStepsComponent from "app/modules/new-profile/createNewProfileStepsComponent/createNewProfileSteps.component";
import BreadcrumbComponent from "app/shared/components/breadcrumbs.Component/breadcrumb.component";
import React, { useEffect, useState } from "react";
import { ButtonComponent } from "@eachawy/frontend-library";
import { useForm } from "react-hook-form";
import { Storage, translate } from "react-jhipster";
import LegalBonds from "./components/legalBonds.component";
import { useNavigate } from "react-router";
import { useAppSelector } from "app/config/store";
import { pushNotification } from "app/shared/util/utils";


const LegalBondsPage = () => {
    const [fileRespone, setFileResponse] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
    } = useForm({ mode: "onTouched" });

    const $masterFile = useAppSelector(state => state.createProfile.masterFile) ?? Storage.session.get('masterFile');

    const navigate = useNavigate();

    const saveAndCloseFn = (data:any) => {
        if (Object.values(fileRespone).some(value => Array.isArray(value) && value.length > 0)){
            navigate("/dashoard");
        } else {
            pushNotification("error", "يرجى اضافة السندات القانونية");
        }
    }

    const nextFn = (data:any) => {
        if (Object.values(fileRespone).some(value => Array.isArray(value) && value.length > 0)){
            navigate("/create-file/determine-responsibility-and-follow-up");
        } else {
            pushNotification("error", "يرجى اضافة السندات القانونية");
        }
    };

    return (
        <>
            <div className="SelectFileTypePage">
                <BreadcrumbComponent
                    links={[
                        {
                            id: 'PAGE1',
                            name: {
                                en: 'Add Company or Individual',
                                ar: 'اضافة شركة أو شخص',
                            },
                        },
                        {
                            id: 'PAGE2',
                            name: {
                                en: 'Select File Type',
                                ar: 'اختيار نوع الملف',
                            },
                        },
                        {
                            id: 'PAGE3',
                            name: {
                                en: 'Select Legal Bonds',
                                ar: 'اختيار السندات القانونية',
                            },
                        }
                    ]}
                />
                <CreateNewProfileStepsComponent step={2} />
                <div className="sdg_page ">
                    <label className="serialNoSubNo">{translate("createNewProfile.serial")} <span>{`${$masterFile?.fileNumber}`}</span></label>
                    <LegalBonds register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} returnFileResponseFn={(obj) => setFileResponse(obj)} />

                    <div className="actionBtns">
                        <ButtonComponent Class={'BtnCancel'} onClick={saveAndCloseFn}>{translate("createNewProfile.saveAndClose")}</ButtonComponent>
                        {/* <ButtonComponent Class={'btnStyle _saveAndAdd'} onClick={handleSubmit(saveAndCloseFn)}>{translate("createNewProfile.addAndSave")}</ButtonComponent> */}
                        <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(nextFn)}>{translate("createNewProfile.next")}</ButtonComponent>
                    </div>
                </div>
            </div>
        </>
    )

}

export default LegalBondsPage;