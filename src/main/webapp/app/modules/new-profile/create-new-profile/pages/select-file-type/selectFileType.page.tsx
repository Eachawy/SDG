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
import { attachmentDTO, IsUndefined } from "app/shared/util/utils";


const SelectFileTypePage = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [isSaveClose, setIsSaveClose] = useState(false);
    const [date, setDate] = useState(Date);

    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: "onTouched" });

    const $masterFile = useAppSelector(state => state.createProfile.masterFile) ?? Storage.session.get('masterFile');
    const $createFileResponse = useAppSelector(state => state.selectFileType.createFileResponse);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if ($createFileResponse?.id) {
            if (isSaveClose) {
                navigate("/dashoard");
            } else {
                Storage.session.set("selectFileId", $createFileResponse?.id);
                if ($createFileResponse?.fileType === "COLLECTION" && $createFileResponse?.collectionFile?.id) {
                    Storage.session.set("collectionFileId", $createFileResponse?.collectionFile?.id);
                    navigate("/create-file/legal-bonds");
                }else{
                    navigate("/create-file/determine-responsibility-and-follow-up");
                }
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
            case 'COLLECTION':
                obj = restructureCollectionObj(data);
                break;
            default:
                break;
        }

        // Call API
        await dispatch(CreateFile(obj));
        setShowLoader(false);
    }

    const restructureUrgentRequestObj = (data: any) => {
        const arr = data.privateEmployees || [];
        const privateEmployees = arr.map((item: any) => {
            return {
                followupEmployee: false,
                employee: {
                    id: item.code
                }
            }
        });
        return {
            masterFileId: $masterFile?.id,
            fileType: data.fileType?.code,
            vip: data.vip ?? false,
            issueDate: dayjs(date).format('YYYY-MM-DD'),
            courtCaseFile: {
                registrationDate: data.urgentRequestRecordDate ? dayjs(data.urgentRequestRecordDate).format('YYYY-MM-DD') : null,
                requiredAmount: data.urgentRequestAmount ? IsUndefined(Number(data.urgentRequestAmount)) : null,
                currency: data.urgentRequestAmount ? IsUndefined(data.urgentRequestCurrency?.code) : null,
                opponentCategory: 'NONE',
                court: data.court?.code ? { id: Number(data.court?.code) } : {},
                caseType: { id: data.requestType?.code },
                judge: data.judge?.code ? { id: Number(data.judge?.code) } : {},
                caseNumber: IsUndefined(data.requestNumber),
                attachments: attachmentDTO(data.urgentCaseAttach, data.fileType?.code)
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
        const arr = data.privateEmployees || [];
        const privateEmployees = arr.map((item: any) => {
            return {
                followupEmployee: false,
                employee: {
                    id: item.code
                }
            }
        });

        return {
            masterFileId: $masterFile?.id,
            fileType: data.fileType?.code,
            vip: data.vip ?? false,
            issueDate: dayjs(date).format('YYYY-MM-DD'),
            courtCaseFile: {
                registrationDate: data.lawsuitsRecordDate ? dayjs(data.lawsuitsRecordDate).format('YYYY-MM-DD') : null,
                requiredAmount: data.lawsuitsAmount ? Number(data.lawsuitsAmount) : null,
                currency: data.lawsuitsAmount ? IsUndefined(data.lawsuitsCurrency?.code) : null,
                opponentCategory: data.opponentCategory?.code,
                court: data.court?.code ? { id: Number(data.court?.code) } : {},
                caseType: { id: data.caseType?.code },
                judge: data.judge?.code ? { id: Number(data.judge?.code) } : {},
                caseNumber: IsUndefined(data.caseNumber),
                attachments: attachmentDTO(data.lawsuitsAttach, data.opponentCategory?.code)
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

    const restructureCollectionObj = (data: any) => {
        const arr = data.privateEmployees || [];
        const privateEmployees = arr.map((item: any) => {
            return {
                followupEmployee: false,
                employee: {
                    id: item.code
                }
            }
        });

        return {
            masterFileId: $masterFile?.id,
            fileType: data.fileType?.code,
            vip: data.vip ?? false,
            issueDate: dayjs(date).format('YYYY-MM-DD'),
            collectionFile: {
                totalAmount: data.collectionAmount ? Number(data.collectionAmount) : null,
                currency: data.collectionAmount ? IsUndefined(data.collectionCurrency?.code) : null,
                requiredCollectionAmount: data.requiredCollectionAmount
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
                            en: 'Select File Type',
                            ar: 'اختيار نوع الملف',
                        },
                    }
                ]}
            />
            <LoaderComponent show={showLoader} />
            <CreateNewProfileStepsComponent step={2} />

            <div className="sdg_page">
                <label className="serialNoSubNo">{translate("createNewProfile.serial")} <span>{`${$masterFile?.fileNumber}`}</span></label>
                <CompanySubFileData register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />

                {(watch('fileType')?.code === "URGENT_REQUEST" ||
                    (watch('fileType')?.code === "COURT_CASE" && watch('opponentCategory')) ||
                    (watch('fileType')?.code === "COLLECTION")
                ) &&
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

                {watch('fileType')?.code === "COLLECTION" && watch('personId') && (
                    <Collection register={register} errors={errors} watch={watch} setValue={setValue} getValues={getValues} />
                )}

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
