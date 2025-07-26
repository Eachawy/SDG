import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React, { useState, useEffect } from 'react';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { DefendantData } from '../components/defendant-data/defendant-data.component';
import { EditDefendantProfilePopup } from '../components/edit-defendant-main-file-popup/edit-defendant-main-file-popup.component';
import { DefendantFilesDataTable } from '../components/defendant-files-data-table/defendant-files-data-table.component';
import { combineSerialWithName } from 'app/shared/util/utils';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { getAllMasterFiles, getAllFilteredPersons, getAllPersons } from '../../dashboardLookups.reducer';
import _ from 'lodash'
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';

export const SearchByDefendant = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [showPopup, setShowPopup] = useState(false)
    const [showLoader, setShowLoader] = useState(false);
    const [masterFilesList, setMasterFilesList] = React.useState<any>([]);
    const [filteredPersonList, setFilteredPesonsList] = React.useState<any>([]);
    const [personData, setPersonData] = React.useState(null);

    const $masterFilesList = useAppSelector((state) => state.dashboardLookups.masterFilesList);
    const $filteredPersonsList = useAppSelector((state) => state.dashboardLookups.filteredPersonsList);
    const $allPersonsList = useAppSelector((state) => state.dashboardLookups.allPersonsList);

    const createNewFileFn = () => {
        navigate('/create-file/create-new-profile');
    }

    useEffect(() => {
        getFilteredMasterFilesFN();
        getFilteredPersonsFN(0);
        getAllPersonsFN();
    }, []);

    useEffect(() => {
        if ($masterFilesList) {
            const filteredFiles = $masterFilesList.map((item) => {
                return {
                    id: item.id,
                    code: item.fileNumber,
                    name: {
                        en: item.englishName,
                        ar: item.arabicName
                    },

                };
            });
            setMasterFilesList(filteredFiles);
        }
    }, [$masterFilesList]);

    useEffect(() => {
        if ($filteredPersonsList) {
            const filteredPersons = $filteredPersonsList.map((item) => {
                return {
                    code: item.id,
                    name: {
                        en: item.nameEnglish,
                        ar: item.nameArabic
                    },

                };
            });
            setFilteredPesonsList(filteredPersons);
        }
    }, [$filteredPersonsList]);

    useEffect(() => {
        if ($allPersonsList) {
            const filteredPerson = _.find($allPersonsList, item => item.id === 1);
            setPersonData(filteredPerson);
            setShowLoader(false);
        }
    }, [$allPersonsList]);

    const getFilteredMasterFilesFN = async () => {
        setShowLoader(true);
        await dispatch(getAllMasterFiles());
    }

    const getFilteredPersonsFN = async (id) => {
        await dispatch(getAllFilteredPersons(id));
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
                    <ButtonComponent onClick={createNewFileFn}>
                        {translate('mainDashboard.createNewFileButton')}
                    </ButtonComponent>
                </div>

                <FileSearch
                    label1={translate('search.searchByNoNameMainFile')}
                    placeholder1={translate('search.searchByNoNameMainFile')}
                    optionList1={combineSerialWithName(masterFilesList)}
                    label2={translate('mainDashboard.searchByDefendantName')}
                    placeholder2={translate('mainDashboard.searchByDefendantName')}
                    optionList2={filteredPersonList}
                    list1Change={(e) => getFilteredPersonsFN(e.id)}
                    list2Change={(e) => console.log(e)}
                />

                {personData && (
                    <>
                        <DefendantData setShowPopup={setShowPopup} personData={personData} />
                        <DefendantFilesDataTable personData={personData} />
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