import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useState } from "react";
import { Storage, translate } from "react-jhipster";
import CreateNewProfileStepsComponent from "../../../Shared/createNewProfileSteps.component";
import CompanySubFileData from "./shared/companySubFileData.component";
import { useNavigate } from "react-router";
import Lawsuits from "./shared/lawsuits.component";
import UrgentRequest from "./shared/urgentRequest.component";
import Collection from "./shared/collection.component";
import { useForm } from "react-hook-form";
import { ButtonComponent } from "@eachawy/frontend-library";
import SearchByDefendant from "./shared/searchByDefendant.component";
import { useAppDispatch, useAppSelector } from "app/config/store";
import LoaderComponent from "app/modules/shared/loaderComponent/loaderComponent";
import { CreateFile } from "./select-file-type.reducer";
import dayjs from "dayjs";


const SelectFileTypePage = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [date, setDate] = useState(Date);

    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: "onTouched" });

    const $fileNumber = useAppSelector(state => state.createProfile.fileNumber) ?? Storage.session.get('fileNumber');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const saveAndCloseFn = (data) => {
        submitCreateFile(data);
    }

    const nextFn = (data) => {
        if (data !== null) {
            if (watch('fileType')?.code === "COLLECTIONS") {
                navigate("/create-file/legal-bonds");
            } else {
                navigate("/create-file/determine-responsibility-and-follow-up");
            }
        }
    };

    const submitCreateFile = async (data) => {
        setShowLoader(true);
        const _data = {
            masterFileId: $fileNumber?.id,
            fileType: data.fileType?.code,
            vip: data.vip ?? false,
            issueDate: dayjs(date).format('YYYY-MM-DD'),
            courtCaseFile: {
                registrationDate: data.fileType?.code === 'COURT_CASE' ? dayjs(data.lawsuitsRecordDate).format('YYYY-MM-DD') : dayjs(data.urgentRequestRecordDate).format('YYYY-MM-DD') ,
                requiredAmount: Number(data.amountToBeCollected),
                currency: data.amountCurrency?.code,
                opponentCategory: data.opponentCategory?.code,
                court: {
                    id: Number(data.court?.code)
                },
                caseType: {
                    id: data.fileType?.code === 'COURT_CASE' ? data.caseType?.code : data.requestType?.code
                },
                judge: {
                    id: Number(data.judge?.code)
                },
                caseNumber: data.fileType?.code === 'COURT_CASE' ? data.caseNumber : data.requestNumber,
                attachments: [
                    {
                        attachmentType: data.opponentCategory?.code,
                        name: data.selectFileAttach_1?.name,
                        content: data.selectFileAttach_1?.base64,
                        mimeType: "PDF"
                    },
                    {
                        attachmentType: data.opponentCategory?.code,
                        name: data.selectFileAttach_2?.name,
                        content: data.selectFileAttach_2?.base64,
                        mimeType: "PDF"
                    }
                ]
            },
            personId: data.personId?.code,
            employees: [
                {
                    followupEmployee: true,
                    employee: {
                        id: data.selectedDelegatedPerson?.code
                    }
                }
            ]
        }

        // Call API
        await dispatch(CreateFile(_data));
        setShowLoader(false);
    }

    return (
        <div className="SelectFileTypePage">
            <BreadcrumbComponent />
            <LoaderComponent show={showLoader} />
            <CreateNewProfileStepsComponent step={2} />

            <div className="sdg_page">
                <label className="serialNoSubNo">{translate("createNewProfile.serialAndSubNumber")} <span>{`${$fileNumber?.fileNumber} / ${$fileNumber?.id}`}</span></label>
                <CompanySubFileData register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />

                {(watch('fileType')?.code === "URGENT_REQUEST" || watch('fileType')?.code === "COURT_CASE") &&
                    (watch('opponentCategory')?.code === "RESPONDENT" || watch('opponentCategory')?.code === "ACCUSED") &&
                    <SearchByDefendant register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />
                }

                {watch('fileType')?.code === "COURT_CASE" &&
                    watch('personId') &&
                    (watch('opponentCategory')?.code === "RESPONDENT" || watch('opponentCategory')?.code === "ACCUSED") &&
                    <Lawsuits register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />
                }

                {watch('fileType')?.code === "URGENT_REQUEST" &&
                    watch('personId') &&
                    (watch('opponentCategory')?.code === "RESPONDENT" || watch('opponentCategory')?.code === "ACCUSED") &&
                    <UrgentRequest register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />
                }

                {watch('fileType')?.code === "COLLECTION" && <Collection register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />}

                <div className="actionBtns">
                    <ButtonComponent Class={'BtnCancel'} onClick={saveAndCloseFn}>{translate("createNewProfile.saveAndClose")}</ButtonComponent>
                    {/* <ButtonComponent Class={'btnStyle _saveAndAdd'} onClick={handleSubmit(saveAndCloseFn)}>{translate("createNewProfile.addAndSave")}</ButtonComponent> */}
                    <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(saveAndCloseFn)}>{translate("createNewProfile.next")}</ButtonComponent>
                </div>
            </div>
        </div>
    );
};

export default SelectFileTypePage;
