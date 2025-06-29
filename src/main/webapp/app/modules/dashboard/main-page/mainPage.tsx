import { ButtonComponent } from '@eachawy/frontend-library';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React from 'react';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { FileSearch } from '../components/file-search/file-search';
import { DashboardCard } from '../components/dashboard-card/dashboard-card';
import { FileChart } from '../components/fileChart/fileChart';
import { FilesTable } from '../components/files-table/filesTable';



const MainPage = () => {

    const navigate = useNavigate();

    const createNewFileFn = () => {
        navigate('/create-file/create-new-profile');
    }

    const chartData = {
        series: [30, 150, 50, 200, 400, 80, 250, 350, 450, 500, 100, 180]
    };

    const filesList = [
        {
            id: 1,
            fileNumber: "12345",
            mainFileName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileType: "تحصيل",
            dataStatus: 20,
        },
        {
            id: 2,
            fileNumber: "12345",
            mainFileName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileType: "طلب مستعجل",
            dataStatus: 60,
        },
        {
            id: 3,
            fileNumber: "12345",
            mainFileName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileType: "قضايا",
            dataStatus: 10,
        },
        {
            id: 4,
            fileNumber: "12345",
            mainFileName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileType: "تحصيل",
            dataStatus: 60,
        },
        {
            id: 5,
            fileNumber: "12345",
            mainFileName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileType: "طلب مستعجل",
            dataStatus: 20,
        },
        {
            id: 6,
            fileNumber: "12345",
            mainFileName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileType: "تحصيل",
            dataStatus: 60,
        },
        {
            id: 7,
            fileNumber: "12345",
            mainFileName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileType: "تحصيل",
            dataStatus: 75,
        },
    ];

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
                        id: 'PAGE1',
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
                        <ButtonComponent Class={''} onClick={createNewFileFn}>
                            {translate('mainDashboard.createNewFileButton')}
                        </ButtonComponent>
                    </div>

                    <FileSearch
                        label1={translate('mainDashboard.searchByFileOrName')}
                        placeholder1={translate('mainDashboard.searchByFileOrName')}
                        optionList1={[
                            { name: { ar: "محمد أحمد عامر", en: "Mohamed Ahmed Amer" }, code: "1234" },
                            { name: { ar: "فاطمة علي حسن", en: "Fatima Ali Hassan" }, code: "5978" },
                            { name: { ar: "خالد محمود سالم", en: "Khaled Mahmoud Salem" }, code: "8799" }
                        ]}
                        label2={translate('mainDashboard.searchByDefendantName')}
                        placeholder2={translate('mainDashboard.searchByDefendantName')}
                        optionList2={[
                            { name: { ar: "محمد أحمد عامر", en: "Mohamed Ahmed Amer" }, code: "9784" },
                            { name: { ar: "فاطمة علي حسن", en: "Fatima Ali Hassan" }, code: "6635" },
                            { name: { ar: "خالد محمود سالم", en: "Khaled Mahmoud Salem" }, code: "7849" }
                        ]}
                    />

                    <div className='divCardsRow'>
                        <DashboardCard
                            mode={''}
                            label={translate('mainDashboard.totalFiles')}
                            count={2500}
                        />

                        <DashboardCard
                            mode={'_card_1'}
                            label={translate('mainDashboard.urgentFiles')}
                            count={600}
                        />

                        <DashboardCard
                            mode={'_card_2'}
                            label={translate('mainDashboard.collectionFiles')}
                            count={1700}
                        />

                        <DashboardCard
                            mode={'_card_3'}
                            label={translate('mainDashboard.casesFiles')}
                            count={2200}
                        />
                    </div>

                    <div className='row chartstDiv g-4'>
                        <FileChart
                            chartTitle={translate('mainDashboard.activeFiles')}
                            lastMonth={300}
                            currentMonth={200}
                            chartData={chartData}
                            color={'green'}
                        />
                        <FileChart
                            chartTitle={translate('mainDashboard.closedFiles')}
                            lastMonth={300}
                            currentMonth={200}
                            chartData={undefined}
                            color={'orange'}
                        />
                    </div>

                    <FilesTable filesList={filesList} />

                </div>
            </div>
        </>
    )
}

export default MainPage;
