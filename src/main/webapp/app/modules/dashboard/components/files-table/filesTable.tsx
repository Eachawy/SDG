import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import $ from 'jquery';
import { ProgressBar } from 'primereact/progressbar';
import { translate } from 'react-jhipster';

export const FilesTable = ({ filesList }) => {

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
        <div className="progressBar">
            <ProgressBar value={rowData.dataStatus} />
            <span>{rowData.dataStatus}%</span>
        </div>
    );

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
                </div>
            </div>
        );
    };

    return (
        <div className='files-table'>
            <div className='titleTableHeader'>
                <div className="tableTabs">
                    <div className="active">
                        {translate('mainDashboard.filesNeedUpdate')} <span>(5)</span>
                    </div>
                    <div>
                        {translate('mainDashboard.activeFiles')} <span>(20)</span>
                    </div>
                    <div>
                        {translate('mainDashboard.closedFiles')} <span>(1500)</span>
                    </div>
                </div>
                <div className='totalFiles'>
                    {translate('mainDashboard.totalFiles')}
                    <span>(2500)</span>
                </div>
            </div>

            <div className="table-container">
                <DataTable
                    value={filesList}
                    dataKey="id"
                    className="custom-table"
                    rows={10}
                >
                    <Column field="fileNumber" header={translate('mainDashboard.fileNumber')} className="columnStyle fileNo" />
                    <Column field="mainFileName" header={translate('mainDashboard.mainFileName')} className="columnStyle" />
                    <Column field="defendantName" header={translate('mainDashboard.defendantName')} className="columnStyle" />
                    <Column field="registerDate" header={translate('mainDashboard.registerDate')} className="columnStyle" />
                    <Column field="lastUpdateDate" header={translate('mainDashboard.lastUpdateDate')} className="columnStyle" />
                    <Column field="fileType" header={translate('mainDashboard.fileType')} className="columnStyle" />
                    <Column field="dataStatus" header={translate('mainDashboard.dataStatus')} className="columnStyle" body={dataStatusTemplate} />
                    <Column body={actionList} className="columnStyle" style={{ width: '40px' }} />
                </DataTable>
            </div>
        </div>
    );
};
