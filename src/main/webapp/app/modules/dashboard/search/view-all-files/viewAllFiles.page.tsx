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
import { CollectionInfo } from '../components/collection-info/collection-info.component';
import { Lawsuits } from '../components/lawsuits/lawsuits';
import { UrgentRequest } from '../components/urgnet-request/urgentRequest.component';

export const ViewAllFiles = () => {
    const [showDefendantPopup, setShowDefendantPopup] = useState(false)
    const [showMainFilePopup, setShowMainFilePopup] = useState(false)
    const [footerActiveTab, setFooterActiveTab] = useState("legalBonds");
    const navigate = useNavigate();
    const createNewFileFn = () => {
        navigate('/create-file/create-new-profile');
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
                        id: 'PAGE1',
                        name: {
                            en: 'View files',
                            ar: 'عرض الملفات',
                        },
                    }
                ]}
            />

            <div className='sdg_page searchByProfile main-file-data'>
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

                <FileInfoHeader setShowPopup={setShowMainFilePopup}  masterFileDetails={null} />

                <MainFileDefendantData
                    setShowDefendantPopup={setShowDefendantPopup}
                    setShowMainFilePopup={setShowMainFilePopup}
                    fileData={{
                        fileType: "تحصيل",
                        fileOpenDate: "02-12-2024",
                        fileStatus: "مغلق",
                        fileStatusMode: 'closed'
                    }}
                />

                {true && <CollectionInfo />}

                {true && <UrgentRequest />}

                {true && <Lawsuits />}

                <div className="tabs mt-5">
                    <div
                        className={footerActiveTab === "followUps" && "active"}
                        onClick={() => setFooterActiveTab("followUps")}
                    >
                        {translate('search.followUps')}
                    </div>
                    <div
                        className={footerActiveTab === "legalBonds" && "active"}
                        onClick={() => setFooterActiveTab("legalBonds")}
                    >
                        {translate('search.legalBonds')}
                    </div>
                </div>

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
