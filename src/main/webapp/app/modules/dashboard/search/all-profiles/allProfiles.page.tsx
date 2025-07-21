import React, { useEffect } from 'react';
import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { AllProfilesDataTable } from '../components/all-profiles-data-table/all-profiles-data-table.component';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { getAllMasterFiles, getAllFilteredPersons } from '../../dashboardLookups.reducer';
import { combineSerialWithName } from 'app/shared/util/utils';

export const AllProfiles = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [masterFilesList, setMasterFilesList] = React.useState<any>([]);
    const [filteredPersonList, setFilteredPesonsList] = React.useState<any>([]);

    const $masterFilesList = useAppSelector((state) => state.dashboardLookups.masterFilesList);
    const $filteredPersonsList = useAppSelector((state) => state.dashboardLookups.filteredPersonsList);

    useEffect(() => {
        getFilteredMasterFilesFN();
        getFilteredPersonsFN(0);
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

    const getFilteredMasterFilesFN = async () => {
        await dispatch(getAllMasterFiles());
    }

    const getFilteredPersonsFN = async (id) => {
        await dispatch(getAllFilteredPersons(id));
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
                            ar: 'عرض جميع الملفات',
                        },
                    }
                ]}
            />

            <div className='sdg_page searchByProfile'>
                <div className='titlePageDashboard'>
                    <h2>{translate('search.showAllFiles')}</h2>
                    <ButtonComponent onClick={() => navigate('/create-file/create-new-profile')}>
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

                <AllProfilesDataTable />
            </div>
        </>
    );
}
