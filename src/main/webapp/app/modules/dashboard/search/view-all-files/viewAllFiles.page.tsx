import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React, { useEffect, useState } from 'react';
import { translate, Storage } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { FileInfoHeader } from '../components/main-file-info-header/main-file-info-header.component';
import { EditMainProfilePopup } from '../components/edit-main-file-popup/edit-main-file-popup.component';
import { MainFileDefendantData } from '../components/main-file-defendant-data/main-file-defendant-data.component';
import { EditDefendantProfilePopup } from '../components/edit-defendant-main-file-popup/edit-defendant-main-file-popup.component';
import { CollectionInfo } from '../components/collection-info/collection-info.component';
import { Lawsuits } from '../components/lawsuits/lawsuits';
import { UrgentRequest } from '../components/urgnet-request/urgentRequest.component';
import { useAppSelector, useAppDispatch } from "app/config/store";
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import { getFileDetails, getMasterFileCounters, getMasterFileDetails } from '../../dashboard.reducer';
import _ from 'lodash';

export const ViewAllFiles = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const [showDefendantPopup, setShowDefendantPopup] = useState(false)
    const [showMainFilePopup, setShowMainFilePopup] = useState(false)
    const [footerActiveTab, setFooterActiveTab] = useState("legalBonds");
    const [masterFileDetails, setMasterFileDetails] = useState(null);
    const [fileDetails, setFileDetails] = useState(null)

    Storage.session.remove("DashboardSelectedMasterFileID");
    Storage.session.remove("DashboardSelectedPersonID");


    const $masterFileDetails = useAppSelector((state) => state.dashboard.masterFileDetails);
    const $fileDetailsResponse = useAppSelector((state) => state.dashboard.fileDetailsResponse);

    useEffect(() => {
        const _viewFilesMasterFileID = Storage.session.get("viewFilesMasterFileID");
        const _viewFilesFileID = Storage.session.get("viewFilesFileID");
        if (_viewFilesMasterFileID) {
            getFileDetailsFN(_viewFilesFileID);
            getMasterFileDetailsFn(_viewFilesMasterFileID);
        }
    }, []);

    useEffect(() => {
        if ($masterFileDetails) {
            setShowLoader(false);
            setMasterFileDetails($masterFileDetails)
        }
    }, [$masterFileDetails]);

    useEffect(() => {
        if ($fileDetailsResponse) {
            setFileDetails($fileDetailsResponse);
        }
    }, [$fileDetailsResponse]);

    const getFileDetailsFN = async (id) => {
        await dispatch(getFileDetails(id));
    }

    const getMasterFileDetailsFn = (id) => {
        setShowLoader(true);
        dispatch(getMasterFileDetails(id))
    }

    return (
        <>
            <BreadcrumbComponent
                back={true}
                links={[
                    {
                        id: 'PAGE1',
                        name: {
                            en: 'Dashboard',
                            ar: 'لوحة التحكم',
                        },
                    },
                    {
                        id: 'PAGE2',
                        name: {
                            en: 'View files',
                            ar: 'عرض الملفات',
                        },
                    }
                ]}
            />

            <div className='sdg_page searchByProfile main-file-data'>
                <div className='titlePageDashboard'>
                    <h2>{translate('search.showAllFiles')}</h2>
                    <ButtonComponent onClick={() => navigate('/create-file/create-new-profile')}>
                        {translate('mainDashboard.createNewFileButton')}
                    </ButtonComponent>
                </div>

                <FileSearch />

                <FileInfoHeader setShowPopup={setShowMainFilePopup} masterFileDetails={masterFileDetails} />

                <MainFileDefendantData
                    setShowDefendantPopup={setShowDefendantPopup}
                    setShowMainFilePopup={setShowMainFilePopup}
                    fileData={{
                        fileType: "تحصيل",
                        fileOpenDate: fileDetails?.issueDate,
                        fileStatus: fileDetails?.status,
                        fileStatusMode: 'closed'
                    }}
                    masterFileDetails={masterFileDetails}
                    personData={null}
                />

                {fileDetails?.fileType === 'COLLECTION' && <CollectionInfo collectionsDetails={fileDetails?.collectionFile} />}

                {fileDetails?.fileType === 'URGENT_REQUEST' && <UrgentRequest urgentRequestDetails={fileDetails?.collectionFile} />}

                {fileDetails?.fileType === 'COURT_CASE' && <Lawsuits courtCaseDetails={fileDetails?.collectionFile} />}

                <div className="tabs mt-5">
                    <div
                        className={footerActiveTab === "followUps" && "active"}
                        onClick={() => setFooterActiveTab("followUps")}
                    >
                        {translate('search.followUps')}
                    </div>
                    <div
                        className={footerActiveTab === "legalBonds" && "active"}
                        onClick={() => setFooterActiveTab("legalBonds")}
                    >
                        {translate('search.legalBonds')}
                    </div>
                </div>

                {showMainFilePopup && (
                    <EditMainProfilePopup setShowPopup={setShowMainFilePopup} masterFileDetails={masterFileDetails} />
                )}

                {showDefendantPopup && (
                    <EditDefendantProfilePopup setShowPopup={setShowDefendantPopup} personData={null} />
                )}

                <LoaderComponent show={showLoader} />
            </div>
        </>
    );
}
