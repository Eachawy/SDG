import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React, { useState } from 'react';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { FileInfoHeader } from '../components/main-file-info-header/main-file-info-header.component';
import { EditMainProfilePopup } from '../components/edit-main-file-popup/edit-main-file-popup.component';
import { MainFileDefendantData } from '../components/main-file-defendant-data/main-file-defendant-data.component';
import { EditDefendantProfilePopup } from '../components/edit-defendant-main-file-popup/edit-defendant-main-file-popup.component';
import { DefendantFilesDataTable } from '../components/defendant-files-data-table/defendant-files-data-table.component';

export const SearchByMainFileDefendant = () => {
    const [showDefendantPopup, setShowDefendantPopup] = useState(false)
    const [showMainFilePopup, setShowMainFilePopup] = useState(false)

    const navigate = useNavigate();
    const createNewFileFn = () => {
        navigate('/create-file/create-new-profile');
    }

    const defendantDataList = [
        {
            id: 1,
            fileNumber: "12345",
            mainFileName: "اسم الشركة يكتب هنا",
            nationalNumber: "12345",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileType: "تحصيل",
            fileTypeStatus: { name: { en: 'Active', ar: 'فعال' }, code: 'AC' },
            dataStatus: 100,
        },
        {
            id: 2,
            fileNumber: "12346",
            mainFileName: "اسم الشركة يكتب هنا",
            nationalNumber: "12346",
            registerDate: "01-04-2025",
            lastUpdateDate: "22-12-2025",
            fileType: "طلب مستعجل",
            fileTypeStatus: { name: { en: 'Active', ar: 'فعال' }, code: 'AC' },
            dataStatus: 20,
        },
        {
            id: 3,
            fileNumber: "12347",
            mainFileName: "اسم الشركة يكتب هنا",
            nationalNumber: "12347",
            registerDate: "02-04-2025",
            lastUpdateDate: "23-12-2025",
            fileType: "قضايا",
            fileTypeStatus: { name: { en: 'Closed', ar: 'مغلق' }, code: 'CL' },
            dataStatus: 100,
        },
        {
            id: 4,
            fileNumber: "12348",
            mainFileName: "اسم الشركة يكتب هنا",
            nationalNumber: "12348",
            registerDate: "03-04-2025",
            lastUpdateDate: "24-12-2025",
            fileType: "تحصيل",
            fileTypeStatus: { name: { en: 'Closed', ar: 'مغلق' }, code: 'CL' },
            dataStatus: 100,
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
                    <h2>{translate('search.searchResults')}</h2>
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

                <FileInfoHeader setShowPopup={setShowMainFilePopup} />

                <MainFileDefendantData
                    setShowDefendantPopup={setShowDefendantPopup}
                    setShowMainFilePopup={setShowMainFilePopup}
                />

                <DefendantFilesDataTable defendantDataList={defendantDataList} />
                {showMainFilePopup && (
                    <EditMainProfilePopup setShowPopup={setShowMainFilePopup} />
                )}

                {showDefendantPopup && (
                    <EditDefendantProfilePopup setShowPopup={setShowDefendantPopup} />
                )}
            </div>
        </>
    );
}
