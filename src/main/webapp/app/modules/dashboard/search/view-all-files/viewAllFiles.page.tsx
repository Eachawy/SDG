import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React, { useState } from 'react';
import { translate, Storage } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { FileInfoHeader } from '../components/main-file-info-header/main-file-info-header.component';
import { EditMainProfilePopup } from '../components/edit-main-file-popup/edit-main-file-popup.component';
import { MainFileDefendantData } from '../components/main-file-defendant-data/main-file-defendant-data.component';
import { EditDefendantProfilePopup } from '../components/edit-defendant-main-file-popup/edit-defendant-main-file-popup.component';
import { CollectionInfo } from '../components/collection-info/collection-info.component';
import { Lawsuits } from '../components/lawsuits/lawsuits';
import { UrgentRequest } from '../components/urgnet-request/urgentRequest.component';

export const ViewAllFiles = () => {
    const navigate = useNavigate();
    const [showDefendantPopup, setShowDefendantPopup] = useState(false)
    const [showMainFilePopup, setShowMainFilePopup] = useState(false)
    const [footerActiveTab, setFooterActiveTab] = useState("legalBonds");
 
    Storage.session.remove("DashboardSelectedMasterFileID");
    Storage.session.remove("DashboardSelectedPersonID");

 

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

            <div className='sdg_page searchByProfile main-file-data'>
                <div className='titlePageDashboard'>
                    <h2>{translate('search.showAllFiles')}</h2>
                    <ButtonComponent onClick={() => navigate('/create-file/create-new-profile')}>
                        {translate('mainDashboard.createNewFileButton')}
                    </ButtonComponent>
                </div>

                <FileSearch />

                <FileInfoHeader setShowPopup={setShowMainFilePopup} masterFileDetails={null} />

                <MainFileDefendantData
                    setShowDefendantPopup={setShowDefendantPopup}
                    setShowMainFilePopup={setShowMainFilePopup}
                    fileData={{
                        fileType: "تحصيل",
                        fileOpenDate: "02-12-2024",
                        fileStatus: "مغلق",
                        fileStatusMode: 'closed'
                    }}
                    masterFileDetails={null}
                    personData={null}
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
                    <EditMainProfilePopup setShowPopup={setShowMainFilePopup} masterFileDetails={null} />
                )}

                {showDefendantPopup && (
                    <EditDefendantProfilePopup setShowPopup={setShowDefendantPopup} personData={null} />
                )}
            </div>
        </>
    );
}
