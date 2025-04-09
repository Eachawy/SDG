import CreateNewProfileStepsComponent from "app/modules/new-profile/Shared/createNewProfileSteps.component";
import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React from "react";
import CompanySubFileData from "../select-file-type/shared/companySubFileData.component";
import { ButtonComponent } from "@eachawy/frontend-library";
import { useForm } from "react-hook-form";
import { translate } from "react-jhipster";



import Collection from "../select-file-type/shared/collection.component";
import LegalBonds from "../select-file-type/shared/legalBonds/legalBonds.component";
import { useNavigate } from "react-router";
import { useAppSelector } from "app/config/store";





const LegalBondsPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
    } = useForm({ mode: "onTouched" });

        const $fileNumber = useAppSelector(state => state.createProfile.fileNumber);

    
    const navigate = useNavigate();

    const saveAndCloseFn = (data) => {
        console.log(data);
    }

    const nextFn = (data) => {
        if (data !== null) {
            navigate("/create-file/determine-responsibility-and-follow-up");
        }
    };
    
    return (
        <>
            <div className="SelectFileTypePage">
                <BreadcrumbComponent />
                <CreateNewProfileStepsComponent step={2} />
                <div className="sdg_page ">
                    <label className="serialNoSubNo">{translate("createNewProfile.serialAndSubNumber")} <span>{`${$fileNumber?.fileNumber} / ${$fileNumber?.id}`}</span></label>
                    <LegalBonds register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />

                    <div className="actionBtns">
                        <ButtonComponent Class={'BtnCancel'} onClick={saveAndCloseFn}>{translate("createNewProfile.saveAndClose")}</ButtonComponent>
                        <ButtonComponent Class={'btnStyle _saveAndAdd'} onClick={handleSubmit(saveAndCloseFn)}>{translate("createNewProfile.addAndSave")}</ButtonComponent>
                        <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(nextFn)}>{translate("createNewProfile.next")}</ButtonComponent>
                    </div>
                </div>
            </div>
        </>
    )

}

export default LegalBondsPage;