import React from 'react';
import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { AllProfilesDataTable } from '../components/all-profiles-data-table/all-profiles-data-table.component';

export const AllProfiles = () => {
    const navigate = useNavigate();
    const createNewFileFn = () => {
        navigate('/create-file/create-new-profile');
    }

    const allProfilesDataTableList = [
        {
            id: 1,
            fileNumber: "12345",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            fileRegisterDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileType: "تحصيل",
            dataStatus: 20
        },
        {
            id: 2,
            fileNumber: "12346",
            companyOrPersonName: "شركة الشرق",
            defendantName: "عبدالله مصطفى",
            fileRegisterDate: "01-04-2025",
            lastUpdateDate: "22-12-2025",
            fileType: "طلب مستعجل",
            dataStatus: 100
        },
        {
            id: 3,
            fileNumber: "12347",
            companyOrPersonName: "شركة النور",
            defendantName: "عمرو أحمد",
            fileRegisterDate: "03-04-2025",
            lastUpdateDate: "23-12-2025",
            fileType: "قضايا",
            dataStatus: 20
        },
        {
            id: 4,
            fileNumber: "12348",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "سامي حمدي",
            fileRegisterDate: "05-04-2025",
            lastUpdateDate: "24-12-2025",
            fileType: "تحصيل",
            dataStatus: 10
        },
        {
            id: 5,
            fileNumber: "12349",
            companyOrPersonName: "شركة القمة",
            defendantName: "طارق حسن",
            fileRegisterDate: "07-04-2025",
            lastUpdateDate: "25-12-2025",
            fileType: "طلب مستعجل",
            dataStatus: 60
        },
        {
            id: 6,
            fileNumber: "12350",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            fileRegisterDate: "09-04-2025",
            lastUpdateDate: "26-12-2025",
            fileType: "قضايا",
            dataStatus: 100
        },
        {
            id: 7,
            fileNumber: "12351",
            companyOrPersonName: "شركة الأمل",
            defendantName: "سعيد عبدالرحمن",
            fileRegisterDate: "11-04-2025",
            lastUpdateDate: "27-12-2025",
            fileType: "تحصيل",
            dataStatus: 100
        },
        {
            id: 8,
            fileNumber: "12352",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "أحمد مجدي",
            fileRegisterDate: "13-04-2025",
            lastUpdateDate: "28-12-2025",
            fileType: "طلب مستعجل",
            dataStatus: 10
        },
        {
            id: 9,
            fileNumber: "12353",
            companyOrPersonName: "شركة الريادة",
            defendantName: "رامي خالد",
            fileRegisterDate: "15-04-2025",
            lastUpdateDate: "29-12-2025",
            fileType: "قضايا",
            dataStatus: 60
        },
        {
            id: 10,
            fileNumber: "12354",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "عادل يوسف",
            fileRegisterDate: "17-04-2025",
            lastUpdateDate: "30-12-2025",
            fileType: "تحصيل",
            dataStatus: 40
        },
        {
            id: 11,
            fileNumber: "12355",
            companyOrPersonName: "شركة المتحدة",
            defendantName: "إيهاب حسين",
            fileRegisterDate: "19-04-2025",
            lastUpdateDate: "01-01-2026",
            fileType: "طلب مستعجل",
            dataStatus: 20
        },
        {
            id: 12,
            fileNumber: "12356",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            fileRegisterDate: "21-04-2025",
            lastUpdateDate: "02-01-2026",
            fileType: "قضايا",
            dataStatus: 20
        },
        {
            id: 13,
            fileNumber: "12357",
            companyOrPersonName: "شركة الوفاء",
            defendantName: "ياسر كمال",
            fileRegisterDate: "23-04-2025",
            lastUpdateDate: "03-01-2026",
            fileType: "تحصيل",
            dataStatus: 100
        },
        {
            id: 14,
            fileNumber: "12358",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "خالد جابر",
            fileRegisterDate: "25-04-2025",
            lastUpdateDate: "04-01-2026",
            fileType: "طلب مستعجل",
            dataStatus: 65
        },
        {
            id: 15,
            fileNumber: "12359",
            companyOrPersonName: "شركة الرخاء",
            defendantName: "مصطفى علي",
            fileRegisterDate: "27-04-2025",
            lastUpdateDate: "05-01-2026",
            fileType: "قضايا",
            dataStatus: 35
        },
        {
            id: 16,
            fileNumber: "12360",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            fileRegisterDate: "29-04-2025",
            lastUpdateDate: "06-01-2026",
            fileType: "تحصيل",
            dataStatus: 80
        },
        {
            id: 17,
            fileNumber: "12361",
            companyOrPersonName: "شركة المستقبل",
            defendantName: "سمير هاشم",
            fileRegisterDate: "01-05-2025",
            lastUpdateDate: "07-01-2026",
            fileType: "طلب مستعجل",
            dataStatus: 55
        },
        {
            id: 18,
            fileNumber: "12362",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            fileRegisterDate: "03-05-2025",
            lastUpdateDate: "08-01-2026",
            fileType: "قضايا",
            dataStatus: 100
        },
        {
            id: 19,
            fileNumber: "12363",
            companyOrPersonName: "شركة النجاح",
            defendantName: "نبيل شوقي",
            fileRegisterDate: "05-05-2025",
            lastUpdateDate: "09-01-2026",
            fileType: "تحصيل",
            dataStatus: 10
        },
        {
            id: 20,
            fileNumber: "12364",
            companyOrPersonName: "اسم الشركة يكتب هنا",
            defendantName: "محمد عبدالله رشوان",
            fileRegisterDate: "07-05-2025",
            lastUpdateDate: "10-01-2026",
            fileType: "طلب مستعجل",
            dataStatus: 95
        }
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

            <div className='sdg_page searchByProfile'>
                <div className='titlePageDashboard'>
                    <h2>{translate('search.showAllFiles')}</h2>
                    <ButtonComponent onClick={createNewFileFn}>
                        {translate('mainDashboard.createNewFileButton')}
                    </ButtonComponent>
                </div>

                <FileSearch
                    label1={translate('search.searchByNoNameMainFile')}
                    placeholder1={translate('search.searchByNoNameMainFile')}
                    optionList1={[
                        { name: { ar: "محمد أحمد عامر", en: "Mohamed Ahmed Amer" }, code: "1234" },
                        { name: { ar: "فاطمة علي حسن", en: "Fatima Ali Hassan" }, code: "5978" },
                        { name: { ar: "خالد محمود سالم", en: "Khaled Mahmoud Salem" }, code: "8799" }
                    ]}
                    label2={translate('mainDashboard.searchByDefendantName')}
                    placeholder2={translate('mainDashboard.searchByDefendantName')}
                    optionList2={[
                        { name: { ar: "محمد أحمد عامر", en: "Mohamed Ahmed Amer" }, code: "1284" },
                        { name: { ar: "فاطمة علي حسن", en: "Fatima Ali Hassan" }, code: "8976" },
                        { name: { ar: "خالد محمود سالم", en: "Khaled Mahmoud Salem" }, code: "9965" }
                    ]}
                />

                <AllProfilesDataTable allProfilesDataTableList={allProfilesDataTableList} />
            </div>
        </>
    );
}
