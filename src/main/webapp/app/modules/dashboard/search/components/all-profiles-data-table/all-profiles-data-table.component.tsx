import { ProgressBar } from 'primereact/progressbar';
import React, { useEffect } from 'react';
import $ from 'jquery';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { translate } from 'react-jhipster';

export const AllProfilesDataTable = ({ allProfilesDataTableList }) => {
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
        <div className={`progressBar ${rowData.dataStatus === 100 && 'completed'}`}>
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
                <div className='titleTableHeader _allProfilesTabs'>
                    <div className="tableTabs">
                        <div className="active">
                            {translate('search.showAllFilesTab')} <span>(2500)</span>
                        </div>
                        <div>
                            {translate('search.needUpdateFiles')} <span>(5)</span>
                        </div>
                        <div>
                            {translate('search.activeFiles')} <span>(20)</span>
                        </div>
                        <div>
                            {translate('search.closedFiles')} <span>(1500)</span>
                        </div>
                    </div>

                    <div className='totalFiles'>
                        <p>
                            {translate('search.show')} <span>20</span> {translate('search.fileFrom')} <span>2500</span>
                        </p>
                        <span>نوع الملف</span>
                    </div>
                </div>

                <div className="table-container">
                    <DataTable
                        value={allProfilesDataTableList}
                        dataKey="id"
                        className="custom-table"
                        rows={10}
                        paginator
                        scrollable
                    >
                        <Column
                            field="fileNumber"
                            header={translate("search.fileNumber")}
                            className="columnStyle fileNo"
                        />
                        <Column
                            field="companyOrPersonName"
                            header={translate("search.companyOrPersonName")}
                            className="columnStyle companyOrPersonName-col"
                        />
                        <Column
                            field="defendantName"
                            header={translate("search.defendantName")}
                            className="columnStyle defendantName-col"
                        />
                        <Column
                            field="fileRegisterDate"
                            header={translate("search.fileRegisterDate")}
                            className="columnStyle"
                        />
                        <Column
                            field="lastUpdateDate"
                            header={translate("search.lastUpdateDate")}
                            className="columnStyle"
                        />
                        <Column
                            field="fileType"
                            header={translate("search.fileType")}
                            className="columnStyle fileType-col"
                        />
                        <Column
                            field="dataStatus"
                            header={translate("search.fileStatus")}
                            className="columnStyle fileStatus-col"
                            body={dataStatusTemplate}
                        />
                        <Column
                            body={actionList}
                            className="columnStyle actionList-col"
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};
