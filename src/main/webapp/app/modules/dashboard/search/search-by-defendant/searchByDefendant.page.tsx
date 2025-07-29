import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React, { useState, useEffect } from 'react';
import { translate, Storage } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { DefendantData } from '../components/defendant-data/defendant-data.component';
import { EditDefendantProfilePopup } from '../components/edit-defendant-main-file-popup/edit-defendant-main-file-popup.component';
import { DefendantFilesDataTable } from '../components/defendant-files-data-table/defendant-files-data-table.component';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { getAllPersons } from '../../dashboardLookups.reducer';
import _ from 'lodash'
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';

export const SearchByDefendant = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [showPopup, setShowPopup] = useState(false)
    const [showLoader, setShowLoader] = useState(false);
    const [personData, setPersonData] = React.useState(null);
    const [dashboardSelectedPersonID, setDashboardSelectedPersonID] = useState(null);

    const $allPersonsList = useAppSelector((state) => state.dashboardLookups.allPersonsList);

    useEffect(() => {
        const ـDashboardSelectedPersonID = Storage.session.get("DashboardSelectedPersonID");
        setDashboardSelectedPersonID(ـDashboardSelectedPersonID);
        getAllPersonsFN();
    }, []);

    useEffect(() => {
        if ($allPersonsList) {
            const filteredPerson = _.find($allPersonsList, item => item.id === dashboardSelectedPersonID);
            setPersonData(filteredPerson);
            setShowLoader(false);
        }
    }, [$allPersonsList]);


    const getAllPersonsFN = async () => {
        setShowLoader(true);
        await dispatch(getAllPersons());
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

                {personData && (
                    <>
                        <DefendantData setShowPopup={setShowPopup} personData={personData} />
                        <DefendantFilesDataTable personData={personData} masterFileDetails={null} />
                    </>
                )}

                {showPopup &&
                    <EditDefendantProfilePopup
                        setShowPopup={(status: any) => {
                            setShowPopup(status);
                            getAllPersonsFN()
                        }}
                        personData={personData}
                    />
                }

                <LoaderComponent show={showLoader} />

            </div>
        </>
    )
}