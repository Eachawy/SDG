import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import { translate, Storage } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { FileInfoHeader } from '../components/main-file-info-header/main-file-info-header.component';
import { EditMainProfilePopup } from '../components/edit-main-file-popup/edit-main-file-popup.component';
import { MainFileDefendantData } from '../components/main-file-defendant-data/main-file-defendant-data.component';
import { EditDefendantProfilePopup } from '../components/edit-defendant-main-file-popup/edit-defendant-main-file-popup.component';
import { DefendantFilesDataTable } from '../components/defendant-files-data-table/defendant-files-data-table.component';
import { useAppSelector, useAppDispatch } from "app/config/store";
import React, { useState, useEffect } from 'react';
import { getMasterFileDetails } from '../../dashboard.reducer';
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import { getAllPersons } from '../../dashboardLookups.reducer';
import _ from 'lodash';

export const SearchByMainFileDefendant = () => {
    const dispatch = useAppDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const [showDefendantPopup, setShowDefendantPopup] = useState(false)
    const [showMainFilePopup, setShowMainFilePopup] = useState(false)
    const [masterFileDetails, setMasterFileDetails] = useState(null);
    const [personData, setPersonData] = React.useState(null);
    const [dashboardSelectedMasterFileID, setDashboardSelectedMasterFileID] = useState(null);
    const [dashboardSelectedPersonID, setDashboardSelectedPersonID] = useState(null);


    const navigate = useNavigate();
    const $masterFileDetails = useAppSelector((state) => state.dashboard.masterFileDetails);
    const $allPersonsList = useAppSelector((state) => state.dashboardLookups.allPersonsList);


    useEffect(() => {
        window.scrollTo(0, 0);
        const ـDashboardSelectedMasterFileID = Storage.session.get("DashboardSelectedMasterFileID");
        setDashboardSelectedMasterFileID(ـDashboardSelectedMasterFileID);

        const ـDashboardSelectedPersonID = Storage.session.get("DashboardSelectedPersonID");
        setDashboardSelectedPersonID(ـDashboardSelectedPersonID);

        getMasterFileDetailsFn(ـDashboardSelectedMasterFileID);
        getAllPersonsFN();
    }, []);

    useEffect(() => {
        if ($masterFileDetails) {
            setShowLoader(false);
            setMasterFileDetails($masterFileDetails)
        }
    }, [$masterFileDetails]);

    useEffect(() => {
        if ($allPersonsList) {
            const filteredPerson = _.find($allPersonsList, item => item.id === dashboardSelectedPersonID);
            setPersonData(filteredPerson);
            setShowLoader(false);
        }
    }, [$allPersonsList]);

    const getMasterFileDetailsFn = (id) => {
        dispatch(getMasterFileDetails(id))
    }

    const getAllPersonsFN = async () => {
        setShowLoader(true);
        await dispatch(getAllPersons());
    }

    return (
        <>
            <BreadcrumbComponent
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

                <FileInfoHeader setShowPopup={setShowMainFilePopup} masterFileDetails={masterFileDetails} />

                <MainFileDefendantData
                    setShowDefendantPopup={setShowDefendantPopup}
                    setShowMainFilePopup={setShowMainFilePopup}
                    masterFileDetails={masterFileDetails}
                    personData={personData}
                />
                {personData && (
                    <DefendantFilesDataTable personData={personData} masterFileDetails={masterFileDetails} />
                )}

                {showMainFilePopup && (
                    <EditMainProfilePopup
                        setShowPopup={(status: any) => {
                            setShowMainFilePopup(status);
                            getMasterFileDetailsFn(dashboardSelectedMasterFileID)
                        }}
                        masterFileDetails={masterFileDetails}
                    />
                )}

                {showDefendantPopup && (
                    <EditDefendantProfilePopup
                        setShowPopup={(status: any) => {
                            setShowDefendantPopup(status);
                            getAllPersonsFN()
                        }}
                        personData={personData}
                    />
                )}

                <LoaderComponent show={showLoader} />
            </div>
        </>
    );
}
