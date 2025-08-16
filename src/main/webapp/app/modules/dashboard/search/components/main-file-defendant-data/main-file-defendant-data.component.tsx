import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router-dom';
import { MainFileData } from '../main-file-data/main-file-data.component';
import { DefendantData } from '../defendant-data/defendant-data.component';
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import AttachmentPopupComponent from 'app/shared/components/attachmentPopup.Component/attachmentPopup.Component';
import { getMasterFileAttachments, handleResetMasterFileAttachments } from 'app/modules/dashboard/dashboard.reducer';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { pushNotification } from 'app/shared/util/utils';
import { Storage } from 'react-jhipster';

interface MainFileDefendantDataProps {
    setShowDefendantPopup: React.Dispatch<React.SetStateAction<boolean>>;
    setShowMainFilePopup: React.Dispatch<React.SetStateAction<boolean>>;
    masterFileDetails: any;
    personData: any;
    fileData?: {
        fileType: string;
        fileOpenDate: string;
        fileStatus: string;
        fileStatusMode: string;
    };
}

export const MainFileDefendantData: React.FC<MainFileDefendantDataProps> = ({ setShowDefendantPopup, setShowMainFilePopup, fileData, masterFileDetails, personData }) => {
    const [activeTab, setActiveTab] = useState("defendant");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [attachmentListRow, setAttachmentListRow] = React.useState<number | null>(null);
    const [showLoader, setShowLoader] = React.useState(false);


    const $masterFileAttachments = useAppSelector((state) => state.dashboard.masterFileAttachments);

    useEffect(() => {
        function handleDocumentClick(e) {
            if (!$(e.target).closest('.menu').length) {
                $('.serviceActionList').hide();
            }
        }
        $(document).on('mousedown', handleDocumentClick);
        return () => {
            $(document).off('mousedown', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        if ($masterFileAttachments) {
            setShowLoader(false);
            if ($masterFileAttachments.attachments && $masterFileAttachments.attachments.length > 0) {
                setAttachmentListRow($masterFileAttachments);
            } else {
                setAttachmentListRow(null);
                pushNotification("error", "لم يتم العثور على مرفقات لهذا الملف");
            }
            dispatch(handleResetMasterFileAttachments());
        }
    }, [$masterFileAttachments]);

    const serviceList = (e) => {
        e.stopPropagation();
        $(e.currentTarget).find('.serviceActionList').css("display", "flex");
    };

    const getMasterFileAttachmentsFn = (id) => {
        setShowLoader(true);
        dispatch(getMasterFileAttachments(id))
    }

    const onEditFile = (e: React.MouseEvent<HTMLElement, MouseEvent>, fileType: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileType === 'main') {
            setShowMainFilePopup(true)
        } else {
            setShowDefendantPopup(true)
        }
    };

    const createNewSubFile = (fileDetails: any) => {
        const $masterFile = {
            fileNumber: fileDetails.fileNumber,
            id: fileDetails.id,
        }
        Storage.session.set("isCompany", fileDetails.company);
        Storage.session.set("applicantName", { en: fileDetails.englishName, ar: fileDetails.arabicName });
        Storage.session.set("masterFile", $masterFile);
        navigate("/create-file/select-file-type");
    }

    const returnToMainFile = (fileDetails: any) => {
        Storage.session.set("DashboardSelectedMasterFileID", fileDetails.id);
        Storage.session.set("DashboardSelectedPersonID", null);
        navigate("/dashoard/search-by-main-file");
    }

    return (
        <div className='main-file-data mb-4'>
            <div className='mainFileHeader _mainDefendantHeader'>
                <div className="tabs">
                    <div
                        className={activeTab === "defendant" && "active"}
                        onClick={() => setActiveTab("defendant")}
                    >
                        {translate('search.defendantData')}
                    </div>
                    <div
                        className={activeTab === "main" && "active"}
                        onClick={() => setActiveTab("main")}
                    >
                        {translate('search.mainFileData')}
                    </div>
                </div>

                <div className='menu' onClick={serviceList}>
                    {translate('search.serviceList')}
                    <div className="serviceActionList">
                        {activeTab === 'main' && (
                            <>
                                <span onClick={(e) => onEditFile(e, 'main')}>
                                    {translate('search.editMainFile')}
                                </span>
                                <span onClick={() => createNewSubFile(masterFileDetails)}>
                                    {translate('search.addsubfile')}
                                </span>
                                <span onClick={() => returnToMainFile(masterFileDetails)}>
                                    العودة للملف الرئيسي
                                </span>
                                {/* <span onClick={() => getMasterFileAttachmentsFn(masterFileDetails.id)}>
                                    {translate('search.attachments')}
                                </span> */}
                            </>
                        )}
                        {activeTab === 'defendant' && (
                            <span onClick={(e) => onEditFile(e, 'defendant')}>
                                {translate('search.editDefendantData')}
                            </span>
                        )}

                    </div>
                </div>
            </div>

            {fileData && (
                <div className='fileInfo'>
                    <div>{translate('search.fileType')}<span>{fileData.fileType}</span></div>
                    <div>{translate('search.fileOpenDate')}<span>{fileData.fileOpenDate}</span></div>
                    <div>{translate('search.fileStatus')}
                        <span className={fileData.fileStatusMode === 'CLOSED' ? 'closed' : 'active'}>
                            {fileData.fileStatus}
                        </span>
                    </div>
                </div>
            )}

            {activeTab === 'main' ? (
                <MainFileData setShowPopup={undefined} masterFileDetails={masterFileDetails} />
            ) : (
                <DefendantData setShowPopup={undefined} personData={personData} />
            )}

            <LoaderComponent show={showLoader} />

            {attachmentListRow &&
                <AttachmentPopupComponent attachList={attachmentListRow}
                    closeAttachmentPopupFn={() => {
                        setAttachmentListRow(null)
                    }}
                />
            }
        </div >
    )
}