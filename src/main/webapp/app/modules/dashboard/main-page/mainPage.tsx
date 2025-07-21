import { ButtonComponent } from '@eachawy/frontend-library';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React, { useEffect } from 'react';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { FileSearch } from '../components/file-search/file-search';
import { DashboardCard } from '../components/dashboard-card/dashboard-card';
import { FileChart } from '../components/fileChart/fileChart';
import { FilesTable } from '../components/files-table/filesTable';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { getBoxesData, getCompletedChartsData, getClosedChartsData } from '../dashboard.reducer';
import { getAllMasterFiles, getAllFilteredPersons } from '../dashboardLookups.reducer';
import _ from 'lodash';
import { combineSerialWithName, exportChartData } from 'app/shared/util/utils';
import { CURRENT_MONTH, PREV_MONTH } from 'app/modules/shared/constants';

const MainPage = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [boxesData, setBoxesData] = React.useState<any>(null);
    const [masterFilesList, setMasterFilesList] = React.useState<any>([]);
    const [filteredPersonList, setFilteredPesonsList] = React.useState<any>([]);

    const $boxesData = useAppSelector((state) => state.dashboard.boxesData);
    const $completedChartsData = useAppSelector((state) => state.dashboard.completedChartsData);
    const $closedChartsData = useAppSelector((state) => state.dashboard.closedChartsData);
    const $masterFilesList = useAppSelector((state) => state.dashboardLookups.masterFilesList);
    const $filteredPersonsList = useAppSelector((state) => state.dashboardLookups.filteredPersonsList);

    useEffect(() => {
        getBoxesDataFN();
        getFilteredMasterFilesFN();
        getFilteredPersonsFN(0);
        getCompletedChartsDataFN();
        getClosedChartsDataFN();
    }, []);

    useEffect(() => {
        if ($boxesData) {
            setBoxesData($boxesData);
        }
    }, [$boxesData]);

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

    const getBoxesDataFN = async () => {
        await dispatch(getBoxesData());
    }

    const getCompletedChartsDataFN = async () => {
        await dispatch(getCompletedChartsData());
    }

    const getClosedChartsDataFN = async () => {
        await dispatch(getClosedChartsData());
    }

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
                            ar: 'عرض الملفات',
                        },
                    }
                ]}
            />
            <div className='sdg_page'>
                <div className='mainDashboardPage'>
                    <div className='titlePageDashboard'>
                        <h2>{translate('mainDashboard.viewFilesHeader')}</h2>
                        <ButtonComponent Class={''} onClick={() => navigate('/create-file/create-new-profile')}>
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

                    <div className='divCardsRow'>
                        <DashboardCard
                            mode={''}
                            label={translate('mainDashboard.totalFiles')}
                            count={(_.find(boxesData, (item) => item.name === 'TOTAL'))?.count || 0}
                        />

                        <DashboardCard
                            mode={'_card_1'}
                            label={translate('mainDashboard.urgentFiles')}
                            count={(_.find(boxesData, (item) => item.name === 'URGENT_REQUEST'))?.count || 0}
                        />

                        <DashboardCard
                            mode={'_card_2'}
                            label={translate('mainDashboard.collectionFiles')}
                            count={(_.find(boxesData, (item) => item.name === 'COLLECTION'))?.count || 0}
                        />

                        <DashboardCard
                            mode={'_card_3'}
                            label={translate('mainDashboard.casesFiles')}
                            count={(_.find(boxesData, (item) => item.name === 'COURT_CASE'))?.count || 0}
                        />
                    </div>

                    <div className='row chartstDiv g-4'>
                        <FileChart
                            chartTitle={translate('mainDashboard.activeFiles')}
                            lastMonth={_.find($completedChartsData, (item) => item.name === PREV_MONTH)?.count || 0}
                            currentMonth={_.find($completedChartsData, (item) => item.name === CURRENT_MONTH)?.count || 0}
                            chartData={$completedChartsData && exportChartData($completedChartsData)}
                            color={'green'}
                        />
                        <FileChart
                            chartTitle={translate('mainDashboard.closedFiles')}
                            lastMonth={_.find($closedChartsData, (item) => item.name === PREV_MONTH)?.count || 0}
                            currentMonth={_.find($closedChartsData, (item) => item.name === CURRENT_MONTH)?.count || 0}
                            chartData={$closedChartsData && exportChartData($closedChartsData)}
                            color={'orange'}
                        />
                    </div>

                    <FilesTable />

                </div>
            </div>
        </>
    )
}

export default MainPage;
