import { ProgressBar } from 'primereact/progressbar';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import $ from 'jquery';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { translate,Storage } from 'react-jhipster';
import { getFilesTableData, getMasterFileAttachments, handleResetMasterFileAttachments, handleResetMasterFileDetails } from 'app/modules/dashboard/dashboard.reducer';
import { useAppSelector, useAppDispatch } from "app/config/store";
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import { FileTypes } from 'app/modules/shared/constants';
import _ from 'lodash'
import { pushNotification } from 'app/shared/util/utils';
import AttachmentPopupComponent from 'app/shared/components/attachmentPopup.Component/attachmentPopup.Component';

export const DefendantFilesDataTable = ({ personData, masterFileDetails }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = React.useState(false);
    const [filesList, setFilesList] = React.useState([]);
    const [attachmentListRow, setAttachmentListRow] = React.useState<number | null>(null);

    const $lang = useAppSelector((state) => state.locale.currentLocale);
    const $tableFilesData = useAppSelector((state) => state.dashboard.tableFilesData);
    const $masterFileAttachmentssss = useAppSelector((state) => state.dashboard.masterFileAttachments);

    useEffect(() => {
        getTableFilesFN();
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
        if ($tableFilesData) {
            setShowLoader(false);
            setFilesList($tableFilesData);
        }
    }, [$tableFilesData]);

    useEffect(() => {
        if ($masterFileAttachmentssss) {
            setShowLoader(false);
            if ($masterFileAttachmentssss.attachments && $masterFileAttachmentssss.attachments.length > 0) {
                setAttachmentListRow($masterFileAttachmentssss);
            } else {
                setAttachmentListRow(null);
                pushNotification("error", "لم يتم العثور على مرفقات لهذا الملف");
            }
            dispatch(handleResetMasterFileAttachments());
        }
    }, [$masterFileAttachmentssss]);

    const getTableFilesFN = async () => {
        setShowLoader(true);
        let obj: any = {
            personId: personData?.id,
        }
        if (masterFileDetails) {
            obj = {
                ...obj,
                masterFileId: masterFileDetails.id
            }
        }
        await dispatch(getFilesTableData(obj));
    }

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
                    <span onClick={() => getMasterFileAttachmentsFn(rowData.masterFileId)}>
                        {translate('search.documents')}
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

    const fileTypeTemplate = (rowData) => (
        <span>{(_.find(FileTypes, (item) => item.code === rowData.fileType)).name[$lang] || ' '}</span>
    );

    const getMasterFileAttachmentsFn = (id) => {
        setShowLoader(true);
        dispatch(getMasterFileAttachments(id))
    }


    return (
        <div className='defendant-data'>
            <div className='files-table'>
                <div className='titleTableHeader _defendantTableHeader'>
                    <h4>{translate('search.defendantFiles')}</h4>
                    <div className='totalFiles'>
                        {translate('search.totalFiles')}
                        <span>({filesList.length})</span>
                    </div>
                </div>

                <div className="table-container">
                    <DataTable
                        value={filesList}
                        dataKey="fileId"
                        className="custom-table"
                        scrollable
                        paginator
                        rows={5}
                    >
                        <Column field="fullFileNumber" header={translate('search.fileNumber')} className="columnStyle fileNo" />
                        <Column field={$lang === 'en' ? 'masterFileNameEn' : 'masterFileNameAr'} header={translate('search.mainFileName')} className="columnStyle" />
                        <Column field="creationDate" header={translate('search.registerDate')} className="columnStyle" />
                        <Column field="lastModifiedDate" header={translate('search.lastUpdateDate')} className="columnStyle" />
                        <Column field="fileType" body={fileTypeTemplate} header={translate('search.fileType')} className="columnStyle" />
                        <Column field="dataStatus" header={translate('search.dataStatus')} className="dataStatus-col _defendant-dataStatus-col" body={dataStatusTemplate} />
                        <Column body={actionList} className="columnStyle actionList-col _defendant-actionList-col" />
                    </DataTable>
                </div>
            </div>
            <LoaderComponent show={showLoader} />
            {attachmentListRow &&
                <AttachmentPopupComponent attachList={attachmentListRow}
                    closeAttachmentPopupFn={() => {
                        setAttachmentListRow(null)
                    }}
                />
            }
        </div>
    );
};
