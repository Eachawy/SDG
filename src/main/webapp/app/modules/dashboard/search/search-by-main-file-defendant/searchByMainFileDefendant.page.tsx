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
import { LegalDocsDataTable } from '../components/legal-docs-data-table/legal-docs-data-table.component';

export const SearchByMainFileDefendant = () => {
    const [showDefendantPopup, setShowDefendantPopup] = useState(false)
    const [showMainFilePopup, setShowMainFilePopup] = useState(false)

    const navigate = useNavigate();
    const createNewFileFn = () => {
        navigate('/create-file/create-new-profile');
    }

    const legalDocsDataList = [
        {
            id: 1,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 2,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 3,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 4,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 5,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 6,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 7,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 8,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 9,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 10,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 11,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 12,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 13,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 14,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 15,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 16,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 17,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 18,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 19,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 20,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعى عليه يكتب هنا",
            nationalNumber: "12345679",
            lawsuitRegistrationDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            fileOpenDate: "29-03-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
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

                <FileInfoHeader setShowPopup={setShowMainFilePopup} masterFileDetails={null} />

                <MainFileDefendantData
                    setShowDefendantPopup={setShowDefendantPopup}
                    setShowMainFilePopup={setShowMainFilePopup}
                />

                <LegalDocsDataTable legalDocsDataList={legalDocsDataList} />

                {showMainFilePopup && (
                    <EditMainProfilePopup setShowPopup={setShowMainFilePopup} />
                )}

                {showDefendantPopup && (
                    <EditDefendantProfilePopup setShowPopup={setShowDefendantPopup} personData={null} />
                )}
            </div>
        </>
    );
}
