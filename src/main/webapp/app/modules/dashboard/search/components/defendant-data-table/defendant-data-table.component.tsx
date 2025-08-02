import { ProgressBar } from 'primereact/progressbar';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { translate, Storage } from 'react-jhipster';
import { getFilesTableData, getMasterFileCounters, handleResetMasterFileCounters } from 'app/modules/dashboard/dashboard.reducer';
import { useAppSelector, useAppDispatch } from "app/config/store";
import _ from 'lodash';
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';

import { InputSwitch } from 'primereact/inputswitch';

export const DefendantDataTable = ({ masterFileDetails }) => {
    const navigate = useNavigate();
    const [isActiveFileSelected, setIsActiveFileSelected] = useState(false);
    const [fileNeedUpdateSelected, setFileNeedUpdateSelected] = useState(false);
    const [closedFilesSelected, setClosedFilesSelected] = useState(false);
    const dispatch = useAppDispatch();
    const [masterFileCounters, setMasterFileCounters] = useState(null)
    const [activeTab, setActiveTab] = React.useState('COLLECTION');
    const [showLoader, setShowLoader] = React.useState(false);
    const [filesList, setFilesList] = React.useState([]);

    const $lang = useAppSelector((state) => state.locale.currentLocale);
    const $masterFileCounters = useAppSelector((state) => state.dashboard.masterFileCounters);
    const $tableFilesData = useAppSelector((state) => state.dashboard.tableFilesData);

    useEffect(() => {
        getMasterFileCountersFN();
        getTableFilesFN(activeTab);
        function handleDocumentClick(e) {
            if (!$(e.target).closest('.action-column').length) {
                $('.actionList').hide();
            }
            if (!$(e.target).closest('.menu').length) {
                $('.fileTypeList').hide();
            }
        }

        $(document).on('mousedown', handleDocumentClick);

        return () => {
            $(document).off('mousedown', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        if ($masterFileCounters) {
            setMasterFileCounters($masterFileCounters);
        }
    }, [$masterFileCounters]);

    useEffect(() => {
        if ($tableFilesData) {
            setShowLoader(false);
            setFilesList($tableFilesData);
        }
    }, [$tableFilesData]);

    const getMasterFileCountersFN = async () => {
        const obj = {
            masterFileId: masterFileDetails?.id
        }
        await dispatch(getMasterFileCounters(obj));
    }

    const dataStatusTemplate = (rowData) => (
        <div className={`progressBar ${rowData.fileCompletionPercentage === 100 && 'completed'}`}>
            <ProgressBar value={rowData.fileCompletionPercentage} />
            <span>{rowData.fileCompletionPercentage}%</span>
        </div>
    );

    const legalDocsTemplate = (rowData) => {
        let text = '';
        if (rowData?.hasCheque) {
            text += 'شيك '
        }
        if (rowData?.hasDraft) {
            text += '/ كمبيالة '
        }
        if (rowData?.hasBond) {
            text += '/ اقرار خطي - سند امانة - سند رهن '
        }
        if (rowData?.hasAccountStatement) {
            text += '/ كشف حساب '
        }
        if (rowData?.hasRentContract) {
            text += '/ عقد إيجار '
        }
        if (rowData?.hasInvoice) {
            text += '/ فاتورة '
        }
        return text;
    }

    const actionList = (rowData) => {
        return (
            <div
                className="action-column"
                onClick={(e) => {
                    e.stopPropagation();
                    $('.action-column').find('.actionList').hide();
                    $(e.currentTarget).find('.actionList').css("display", "flex");
                }}
            >
                <span className="dots-menu" />
                <div className="actionList">
                    <span
                        onClick={() => viewFileFn(rowData)}
                    >
                        {translate('mainDashboard.viewFile')}
                    </span>
                </div>
            </div>
        );
    };

    const viewFileFn = (rowData) => {
        Storage.session.set("viewFilesMasterFileID", rowData.masterFileId);
        Storage.session.set("viewFilesFileID", rowData.fileId);
        Storage.session.set("viewFilesPersonID", rowData.personId);
        navigate(`/dashoard/view-all-files`);
    };

    const fileStatusList = (e) => {
        e.stopPropagation();
        $(e.currentTarget).find('.fileTypeList').css("display", "flex");
    };

    const handleSwitchChange = (e, switchId) => {

        switch (switchId) {
            case "activeFileInputSwitch-id":
                setIsActiveFileSelected(e.value);
                break;

            case "fileNeedUpdateInputSwitch-id":
                setFileNeedUpdateSelected(e.value);
                break;

            case "closedFilesInputSwitch-id":
                setClosedFilesSelected(e.value);
                break;

            default:
                console.log("Unknown switch ID", switchId);
                break;
        }
    };
    const onTabClick = (tabName) => {
        if (activeTab === tabName) return;
        setActiveTab(tabName);
        getTableFilesFN(tabName);
    }

    const getTableFilesFN = async (tab) => {
        setShowLoader(true);
        const obj = {
            masterFileId: masterFileDetails?.id,
            fileType: tab
        }
        await dispatch(getFilesTableData(obj));
    }

    return (
        <div className='defendant-data'>
            <h4>{translate('search.defendantDataTitle')}</h4>
            <div className='files-table'>
                <div className='titleTableHeader'>
                    {masterFileCounters && (
                        <div className="tableTabs">
                            <div className={`${activeTab === 'COLLECTION' ? 'active' : ''}`} onClick={() => onTabClick('COLLECTION')}>
                                {translate('search.collection')} <span>({(_.find(masterFileCounters, (item) => item.name === 'COLLECTION'))?.count || 0})</span>
                            </div>
                            <div className={`${activeTab === 'URGENT_REQUEST' ? 'active' : ''}`} onClick={() => onTabClick('URGENT_REQUEST')}>
                                {translate('search.urgentRequest')} <span>({(_.find(masterFileCounters, (item) => item.name === 'URGENT_REQUEST'))?.count || 0})</span>
                            </div>
                            <div className={`${activeTab === 'COURT_CASE' ? 'active' : ''}`} onClick={() => onTabClick('COURT_CASE')}>
                                {translate('search.cases')} <span>({(_.find(masterFileCounters, (item) => item.name === 'COURT_CASE'))?.count || 0})</span>
                            </div>
                        </div>
                    )}
                    <div className='filterBy'>
                        <div>
                            <p>{translate('search.selectBy')}</p>
                            <div className='menu' onClick={fileStatusList}>
                                {translate('search.fileStatus')}
                                <div className="fileTypeList">
                                    <span>
                                        <p>{translate('search.activeFiles')}<span>(10)</span></p>
                                        <InputSwitch
                                            inputId="activeFileInputSwitch-id"
                                            checked={isActiveFileSelected}
                                            onChange={(e) => handleSwitchChange(e, "activeFileInputSwitch-id")}
                                        />
                                    </span>
                                    <span>
                                        <p>{translate('search.needUpdateFiles')}<span>(5)</span></p>
                                        <InputSwitch
                                            inputId="fileNeedUpdateInputSwitch-id"
                                            checked={fileNeedUpdateSelected}
                                            onChange={(e) => handleSwitchChange(e, "fileNeedUpdateInputSwitch-id")}
                                        />
                                    </span>
                                    <span>
                                        <p>{translate('search.closedFiles')}<span>(5)</span></p>
                                        <InputSwitch
                                            inputId="closedFilesInputSwitch-id"
                                            checked={closedFilesSelected}
                                            onChange={(e) => handleSwitchChange(e, "closedFilesInputSwitch-id")}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='totalFiles'>
                        {translate('search.totalFiles')}
                        <span>({(_.find(masterFileCounters, (item) => item.name === 'TOTAL'))?.count || 0})</span>
                    </div>
                </div>

                <div className="table-container">
                    <DataTable
                        value={filesList}
                        dataKey="fileId"
                        className="custom-table"
                        rows={10}
                        paginator
                        scrollable
                    >
                        <Column field="fullFileNumber" header={translate("search.fileNumber")} className="columnStyle fileNo" />
                        <Column field={$lang === 'en' ? 'personNameEn' : 'personNameAr'} header={translate("search.defendantName")} className="columnStyle defendantName-col" />
                        <Column field="nationalId" header={translate("search.nationalNumber")} className="columnStyle" />
                        <Column field="creationDate" header={translate("search.fileOpenDate")} className="columnStyle" />
                        <Column field="lastModifiedDate" header={translate("search.lastUpdateDate")} className="columnStyle" />
                        <Column field="legalDocuments" header={translate("search.legalDocuments")} className="legalDocs-col" body={legalDocsTemplate} />
                        <Column field="dataStatus" header={translate("search.fileStatus")} className="dataStatus-col" body={dataStatusTemplate} />
                        <Column body={actionList} className="columnStyle actionList-col" />
                    </DataTable>
                </div>
            </div>
            <LoaderComponent show={showLoader} />
        </div>
    );
};
