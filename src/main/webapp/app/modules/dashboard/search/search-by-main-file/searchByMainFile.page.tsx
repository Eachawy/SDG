import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React, { useState, useEffect } from 'react';
import { translate, Storage } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { FileInfoHeader } from '../components/main-file-info-header/main-file-info-header.component';
import { MainFileData } from '../components/main-file-data/main-file-data.component';
import { DefendantDataTable } from '../components/defendant-data-table/defendant-data-table.component';
import { EditMainProfilePopup } from '../components/edit-main-file-popup/edit-main-file-popup.component';
import { getMasterFileDetails, handleResetMasterFileCounters, handleResetMasterFileDetails } from '../../dashboard.reducer';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from "app/config/store";
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';

export const SearchByMainFile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [masterFileDetails, setMasterFileDetails] = useState(null);
    const [dashboardSelectedMasterFileID, setDashboardSelectedMasterFileID] = useState(null);

    const $masterFileDetails = useAppSelector((state) => state.dashboard.masterFileDetails);

    dispatch(handleResetMasterFileDetails())
    dispatch(handleResetMasterFileCounters())
    
    useEffect(() => {
        const ـDashboardSelectedMasterFileID = Storage.session.get("DashboardSelectedMasterFileID");
        setDashboardSelectedMasterFileID(ـDashboardSelectedMasterFileID);
        getMasterFileDetailsFn(ـDashboardSelectedMasterFileID);
    }, []);

    useEffect(() => {
        if ($masterFileDetails) {
            setShowLoader(false);
            setMasterFileDetails($masterFileDetails)
        }
    }, [$masterFileDetails]);


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

            <div className='sdg_page searchByProfile'>
                <div className='titlePageDashboard'>
                    <h2>{translate('search.searchResults')}</h2>
                    <ButtonComponent onClick={() => navigate('/create-file/create-new-profile')}>
                        {translate('mainDashboard.createNewFileButton')}
                    </ButtonComponent>
                </div>

                <FileSearch />

                {masterFileDetails && (
                    <>
                        <FileInfoHeader setShowPopup={setShowPopup} masterFileDetails={masterFileDetails} />
                        <MainFileData setShowPopup={setShowPopup} masterFileDetails={masterFileDetails} />
                        <DefendantDataTable masterFileDetails={masterFileDetails} />
                    </>
                )}


                {showPopup && (
                    <EditMainProfilePopup
                        setShowPopup={(status: any) => {
                            setShowPopup(status);
                            getMasterFileDetailsFn(dashboardSelectedMasterFileID)
                        }}
                        masterFileDetails={masterFileDetails}
                    />
                )}

                <LoaderComponent show={showLoader} />
            </div>
        </>
    );
}
