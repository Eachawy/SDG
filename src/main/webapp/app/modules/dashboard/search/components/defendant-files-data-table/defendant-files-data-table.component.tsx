import { ProgressBar } from 'primereact/progressbar';
import React, { useEffect } from 'react';
import $ from 'jquery';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { translate } from 'react-jhipster';
import { useAppSelector } from "app/config/store";

export const DefendantFilesDataTable = ({ defendantDataList }) => {
    const lang = useAppSelector((state) => state.locale.currentLocale);
    useEffect(() => {
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

    const dataStatusTemplate = (rowData) => (
        <div className={`progressBar ${rowData.dataStatus === 100 && 'completed'} ${rowData.fileTypeStatus.code === 'CL' && 'closed'} `}>
            <ProgressBar value={rowData.dataStatus} />
            <span>{rowData.dataStatus}%</span>
        </div>
    );

    const fileType = (rowData) => (
        <div className={`fileType ${rowData.fileTypeStatus.code === 'AC' ? 'active' : 'closed'}`}>
            <p>{rowData.fileType}</p> 
            <span>({rowData.fileTypeStatus.name[lang]})</span>
        </div>
    )

    const actionList = () => {
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
                        onClick={() => { }}
                    >
                        {translate('mainDashboard.viewFile')}
                    </span>
                    <span onClick={() => { }}>
                        {translate('search.documents')}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className='defendant-data'>
            <div className='files-table'>
                <div className='titleTableHeader _defendantTableHeader'>
                    <h4>{translate('search.defendantFiles')}</h4>
                    <div className='totalFiles'>
                        {translate('search.totalFiles')}
                        <span>({defendantDataList.length})</span>
                    </div>
                </div>

                <div className="table-container">
                    <DataTable
                        value={defendantDataList}
                        dataKey="id"
                        className="custom-table"
                        scrollable
                        paginator
                        rows={4}
                    >
                        <Column field="fileNumber" header={translate('search.fileNumber')} className="columnStyle fileNo" />
                        <Column field="mainFileName" header={translate('search.mainFileName')} className="columnStyle" />
                        <Column field="registerDate" header={translate('search.registerDate')} className="columnStyle" />
                        <Column field="lastUpdateDate" header={translate('search.lastUpdateDate')} className="columnStyle" />
                        <Column field="fileType" body={fileType} header={translate('search.fileType')} className="columnStyle" />
                        <Column field="dataStatus" header={translate('search.dataStatus')} className="dataStatus-col _defendant-dataStatus-col" body={dataStatusTemplate} />
                        <Column body={actionList} className="columnStyle actionList-col _defendant-actionList-col" />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};
