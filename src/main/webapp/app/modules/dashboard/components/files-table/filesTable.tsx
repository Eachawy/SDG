import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import $ from 'jquery';
import { ProgressBar } from 'primereact/progressbar';
import { translate,Storage } from 'react-jhipster';
import { useNavigate } from 'react-router';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { getTableTabsData, getFilesTableData, getMasterFileAttachments, handleResetMasterFileAttachments } from '../../dashboard.reducer';
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import { FileTypes } from 'app/modules/shared/constants';
import AttachmentPopupComponent from 'app/shared/components/attachmentPopup.Component/attachmentPopup.Component';
import { pushNotification } from 'app/shared/util/utils';


export const FilesTable = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [tableTabsData, setTableTabsData] = React.useState<any>(null);
    const [activeTab, setActiveTab] = React.useState('INCOMPLETE');
    const [filesList, setFilesList] = React.useState([]);
    const [showLoader, setShowLoader] = React.useState(false);
    const [attachmentListRow, setAttachmentListRow] = React.useState<number | null>(null);
    const [first, setFirst] = React.useState(0);

    const $lang = useAppSelector((state) => state.locale.currentLocale);
    const $tableTabsData = useAppSelector((state) => state.dashboard.tableTabsData);
    const $tableFilesData = useAppSelector((state) => state.dashboard.tableFilesData);
    const $masterFileAttachments = useAppSelector((state) => state.dashboard.masterFileAttachments);

    useEffect(() => {
        getTableTabsFN();
        getTableFilesFN('INCOMPLETE');
        
        function handleDocumentClick(e) {
            if (!$(e.target).closest('.action-column').length) {
                $('.actionList').hide();
            }
        }
        $(document).on('mousedown', handleDocumentClick);
        return () => {
            $(document).off('mousedown', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        if ($tableTabsData) {
            setTableTabsData($tableTabsData);
        }
    }, [$tableTabsData]);

    useEffect(() => {
        if ($tableFilesData) {
            setShowLoader(false);
            setFilesList($tableFilesData);
        }
    }, [$tableFilesData]);

    useEffect(() => {
        if ($masterFileAttachments) {
            setShowLoader(false);
            if ($masterFileAttachments.attachments && $masterFileAttachments.attachments.length > 0) {
                setAttachmentListRow($masterFileAttachments);
            } else {
                setAttachmentListRow(null);
                pushNotification("error", "لم يتم العثور على مرفقات لهذا الملف");
            }
            dispatch(handleResetMasterFileAttachments());
        }
    }, [$masterFileAttachments]);

    const getTableTabsFN = async () => {
        await dispatch(getTableTabsData());
    }

    const getTableFilesFN = async (tab) => {
        setShowLoader(true);
        const obj = {
            fileStatus: tab
        }
        await dispatch(getFilesTableData(obj));
    }

    const getMasterFileAttachmentsFn = (id) => {
        setShowLoader(true);
        dispatch(getMasterFileAttachments(id))
    }

    const fileTypeTemplate = (rowData) => (
        <span>{(_.find(FileTypes, (item) => item.code === rowData.fileType)).name[$lang] || ' '}</span>
    );

    const dataStatusTemplate = (rowData) => (
        <div className={`progressBar ${rowData.fileCompletionPercentage === 100 && 'completed'}`}>
            <ProgressBar value={rowData.fileCompletionPercentage} />
            <span>{rowData.fileCompletionPercentage}%</span>
        </div>
    );

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
                    <span
                        onClick={() => getMasterFileAttachmentsFn(rowData.masterFileId)}
                    >
                        {translate('search.documents')}
                    </span>
                </div>
            </div>
        );
    };

    const onTabClick = (tabName) => {
        if (activeTab === tabName) return;
        setFilesList([])
        setFirst(0);
        setActiveTab(tabName);
        getTableFilesFN(tabName);
    }

    const onPage = (e) => {
        setFirst(e.first);
    };

    const viewFileFn = (rowData) => {
        Storage.session.set("viewFilesMasterFileID", rowData.masterFileId);
        Storage.session.set("viewFilesFileID", rowData.fileId);
        // Storage.session.set("viewFilesPersonID", rowData.personId);
        navigate(`/dashoard/view-all-files`);
    };

    return (
        <div className='files-table'>
            <div className='titleTableHeader'>
                <div className="tableTabs">
                    <div className={`${activeTab === 'INCOMPLETE' ? 'active' : ''}`} onClick={() => onTabClick('INCOMPLETE')}>
                        {translate('mainDashboard.filesNeedUpdate')}
                        <span>({(_.find(tableTabsData, (item) => item.name === 'INCOMPLETE'))?.count || 0})</span>
                    </div>
                    <div className={`${activeTab === 'COMPLETED' ? 'active' : ''}`} onClick={() => onTabClick('COMPLETED')}>
                        {translate('mainDashboard.activeFiles')}
                        <span>({(_.find(tableTabsData, (item) => item.name === 'COMPLETED'))?.count || 0})</span>
                    </div>
                    <div className={`${activeTab === 'CLOSED' ? 'active' : ''}`} onClick={() => onTabClick('CLOSED')}>
                        {translate('mainDashboard.closedFiles')}
                        <span>({(_.find(tableTabsData, (item) => item.name === 'CLOSED'))?.count || 0})</span>
                    </div>
                </div>
                <div onClick={() => navigate('/dashoard/all-profiles')} className='totalFiles _link'>
                    {translate('mainDashboard.totalFiles')}
                    <span>({(_.find(tableTabsData, (item) => item.name === 'TOTAL'))?.count || 0})</span>
                </div>
            </div>

            <div className="table-container">
                <DataTable
                    value={filesList}
                    dataKey="fileId"
                    className="custom-table"
                    rows={5}
                    paginator
                    first={first}
                    onPage={onPage}
                >
                    <Column field="fullFileNumber" header={translate('mainDashboard.fileNumber')} className="columnStyle fileNo" />
                    <Column field={$lang === 'en' ? 'masterFileNameEn' : 'masterFileNameAr'} header={translate('mainDashboard.mainFileName')} className="columnStyle" />
                    <Column field={$lang === 'en' ? 'personNameEn' : 'personNameAr'} header={translate('mainDashboard.defendantName')} className="columnStyle" />
                    <Column field="creationDate" header={translate('mainDashboard.registerDate')} className="columnStyle" />
                    <Column field="lastModifiedDate" header={translate('mainDashboard.lastUpdateDate')} className="columnStyle" />
                    <Column field="fileType" header={translate('mainDashboard.fileType')} className="columnStyle" body={fileTypeTemplate} />
                    <Column field="dataStatus" header={translate('mainDashboard.dataStatus')} className="columnStyle" body={dataStatusTemplate} />
                    <Column body={actionList} className="actionList-col" style={{ width: '40px' }} />
                </DataTable>
            </div>

            <LoaderComponent show={showLoader} />

            {attachmentListRow &&
                <AttachmentPopupComponent attachList={attachmentListRow} closeAttachmentPopupFn={() => setAttachmentListRow(null)} />
            }
        </div>
    );
};
