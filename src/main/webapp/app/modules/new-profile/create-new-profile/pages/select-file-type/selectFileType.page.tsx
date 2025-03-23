import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useState } from "react";
import { translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "../../../Shared/createNewProfileSteps.component";
import CompanySubFileData from "./shared/companySubFileData.component";
import { useNavigate } from "react-router";
import Lawsuits from "./shared/lawsuits.component";
import UrgentRequest from "./shared/urgentRequest.component";
import Collection from "./shared/collection.component";
import LegalBonds from "./shared/legalBonds/legalBonds.component";
import { useForm } from "react-hook-form";
import { ButtonComponent } from "@eachawy/frontend-library";
import SearchByDefendant from "./shared/searchByDefendant.component";


const SelectFileTypePage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
    } = useForm({ mode: "onTouched" });


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
        <div className="SelectFileTypePage">
            <BreadcrumbComponent />
            <CreateNewProfileStepsComponent step={2} />
            <div className="sdg_page ">
                <label className="serialNoSubNo">{translate("createNewProfile.serialAndSubNumber")} <span>1256543 / 10</span></label>
                <CompanySubFileData register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />
                    
                <SearchByDefendant register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />  

                <LegalBonds register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} /> 

                {watch('fileType')?.code === "T1" &&
                    (watch('selectedLegalStatusOfTheParty')?.code === "DE" || watch('selectedLegalStatusOfTheParty')?.code === "AC") &&
                    <Lawsuits register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />}
                {watch('fileType')?.code === "T2" && <UrgentRequest register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />}
                {watch('fileType')?.code === "T3" && <Collection register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />}
                {watch('fileType')?.code === "T3" && <LegalBonds register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />}

                      


                <div className="actionBtns">
                    <ButtonComponent Class={'BtnCancel'} onClick={saveAndCloseFn}>{translate("createNewProfile.saveAndClose")}</ButtonComponent>
                    <ButtonComponent Class={'btnStyle _saveAndAdd'} onClick={handleSubmit(saveAndCloseFn)}>{translate("createNewProfile.addAndSave")}</ButtonComponent>
                    <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(nextFn)}>{translate("createNewProfile.next")}</ButtonComponent>
                </div>
            </div>
        </div>
    );
};

export default SelectFileTypePage;
