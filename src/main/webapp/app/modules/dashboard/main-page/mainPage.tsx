import { ButtonComponent } from '@eachawy/frontend-library';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React, { useEffect } from 'react';
import { translate, Storage } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { FileSearch } from '../components/file-search/file-search';
import { DashboardCard } from '../components/dashboard-card/dashboard-card';
import { FileChart } from '../components/fileChart/fileChart';
import { FilesTable } from '../components/files-table/filesTable';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { getBoxesData, getCompletedChartsData, getClosedChartsData } from '../dashboard.reducer';
import _ from 'lodash';
import { exportChartData } from 'app/shared/util/utils';
import { CURRENT_MONTH, PREV_MONTH } from 'app/modules/shared/constants';

const MainPage = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [boxesData, setBoxesData] = React.useState<any>(null);

    const $boxesData = useAppSelector((state) => state.dashboard.boxesData);
    const $completedChartsData = useAppSelector((state) => state.dashboard.completedChartsData);
    const $closedChartsData = useAppSelector((state) => state.dashboard.closedChartsData);

    Storage.session.remove("DashboardSelectedMasterFileID");
    Storage.session.remove("DashboardSelectedPersonID");
    Storage.session.remove("fileId");
    Storage.session.remove("selectFileId");
    Storage.session.remove("viewFilesFileID");
    Storage.session.remove("viewFilesMasterFileID");
    Storage.session.remove("viewFilesPersonID");
    
    
    useEffect(() => {
        getBoxesDataFN();
        getCompletedChartsDataFN();
        getClosedChartsDataFN();
    }, []);

    useEffect(() => {
        if ($boxesData) {
            setBoxesData($boxesData);
        }
    }, [$boxesData]);

    const getBoxesDataFN = async () => {
        await dispatch(getBoxesData());
    }

    const getCompletedChartsDataFN = async () => {
        await dispatch(getCompletedChartsData());
    }

    const getClosedChartsDataFN = async () => {
        await dispatch(getClosedChartsData());
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

                    <FileSearch />

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
