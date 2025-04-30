import BreadcrumbComponent from "app/shared/components/breadcrumb.component";
import React, { useEffect, useState } from "react";
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
    const [isSaveClose, setIsSaveClose] = useState(false);
    const [date, setDate] = useState(Date);

    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: "onTouched" });

    const $fileNumber = useAppSelector(state => state.createProfile.fileNumber) ?? Storage.session.get('fileNumber');
    const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if ($createFileResponse?.id) {
            if (isSaveClose) {
                navigate("/dashoard");
            } else {
                navigate("/create-file/determine-responsibility-and-follow-up");
            }
        }
    }, [$createFileResponse])


    const saveAndContinueFn = (data: any) => {
        setIsSaveClose(false);
        submitCreateFile(data);
    }

    const saveAndCloseFn = (data: any) => {
        setIsSaveClose(true);
        submitCreateFile(data);
    }

    const submitCreateFile = async (data: any) => {
        setShowLoader(true);
        let obj = {}
        switch (data.fileType?.code) {
            case 'COURT_CASE':
                obj = restructureCourtCaseObj(data);
                break;
            case 'URGENT_REQUEST':
                obj = restructureUrgentRequestObj(data);
                break;

            default:
                break;
        }

        // Call API
        await dispatch(CreateFile(obj));
        setShowLoader(false);
    }

    const restructureUrgentRequestObj = (data: any) => {
        const arr = data.privateEmployees;
        const privateEmployees = arr.map((item: any) => {
            return {
                followupEmployee: false,
                employee: {
                    id: item.code
                }
            }
        });
        return {
            masterFileId: $fileNumber?.id,
            fileType: data.fileType?.code,
            vip: data.vip ?? false,
            issueDate: dayjs(date).format('YYYY-MM-DD'),
            courtCaseFile: {
                registrationDate: dayjs(data.urgentRequestRecordDate).format('YYYY-MM-DD'),
                requiredAmount: Number(data.urgentRequestAmount),
                currency: data.urgentRequestCurrency?.code,
                opponentCategory: 'NONE',
                court: {
                    id: Number(data.court?.code)
                },
                caseType: {
                    id: data.requestType?.code
                },
                judge: {
                    id: Number(data.judge?.code)
                },
                caseNumber: data.requestNumber,
                attachments: [
                    {
                        attachmentType: data.fileType?.code,
                        name: data.urgentCaseAttach_1?.name,
                        content: data.urgentCaseAttach_1?.base64,
                        mimeType: "PDF"
                    },
                    {
                        attachmentType: data.fileType?.code,
                        name: data.urgentCaseAttach_2?.name,
                        content: data.urgentCaseAttach_2?.base64,
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
                },
                ...privateEmployees
            ]
        }
    }

    const restructureCourtCaseObj = (data: any) => {
        const arr = data.privateEmployees;
        const privateEmployees = arr.map((item: any) => {
            return {
                followupEmployee: false,
                employee: {
                    id: item.code
                }
            }
        });

        return {
            masterFileId: $fileNumber?.id,
            fileType: data.fileType?.code,
            vip: data.vip ?? false,
            issueDate: dayjs(date).format('YYYY-MM-DD'),
            courtCaseFile: {
                registrationDate: dayjs(data.lawsuitsRecordDate).format('YYYY-MM-DD'),
                requiredAmount: Number(data.lawsuitsAmount),
                currency: data.lawsuitsCurrency?.code,
                opponentCategory: data.opponentCategory?.code,
                court: {
                    id: Number(data.court?.code)
                },
                caseType: {
                    id: data.caseType?.code
                },
                judge: {
                    id: Number(data.judge?.code)
                },
                caseNumber: data.caseNumber,
                attachments: [
                    {
                        attachmentType: data.opponentCategory?.code,
                        name: data.lawsuitsAttach_1?.name,
                        content: data.lawsuitsAttach_1?.base64,
                        mimeType: "PDF"
                    },
                    {
                        attachmentType: data.opponentCategory?.code,
                        name: data.lawsuitsAttach_2?.name,
                        content: data.lawsuitsAttach_2?.base64,
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
                },
                ...privateEmployees
            ]
        }
    }

    return (
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
                            en: 'Select file type',
                            ar: 'اختيار نوع الملف',
                        },
                    }
                ]}
            />
            <LoaderComponent show={showLoader} />
            <CreateNewProfileStepsComponent step={2} />

            <div className="sdg_page">
                <label className="serialNoSubNo">{translate("createNewProfile.serialAndSubNumber")} <span>{`${$fileNumber?.fileNumber} / ${$fileNumber?.id}`}</span></label>
                <CompanySubFileData register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />

                {(watch('fileType')?.code === "URGENT_REQUEST" || (watch('fileType')?.code === "COURT_CASE" && watch('opponentCategory'))) &&
                    watch('selectedDelegatedPerson') &&
                    <SearchByDefendant register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} opponentCategory={watch('opponentCategory')} fileType={watch('fileType')} />
                }

                {watch('fileType')?.code === "COURT_CASE" &&
                    watch('personId') &&
                    (watch('opponentCategory')?.code === "RESPONDENT" || watch('opponentCategory')?.code === "ACCUSED") &&
                    <Lawsuits register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />
                }

                {watch('fileType')?.code === "URGENT_REQUEST" &&
                    watch('personId') &&
                    <UrgentRequest register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />
                }

                {watch('fileType')?.code === "COLLECTION" && <Collection register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />}

                <div className="actionBtns">
                    <ButtonComponent Class={'BtnCancel'} onClick={handleSubmit(saveAndCloseFn)}>{translate("createNewProfile.saveAndClose")}</ButtonComponent>
                    {/* <ButtonComponent Class={'btnStyle _saveAndAdd'} onClick={handleSubmit(saveAndCloseFn)}>{translate("createNewProfile.addAndSave")}</ButtonComponent> */}
                    <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(saveAndContinueFn)}>{translate("createNewProfile.next")}</ButtonComponent>
                </div>
            </div>
        </div>
    );
};

export default SelectFileTypePage;
