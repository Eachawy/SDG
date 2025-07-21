import { ProgressBar } from 'primereact/progressbar';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { translate } from 'react-jhipster';
import { InputSwitch } from 'primereact/inputswitch';

export const DefendantDataTable = ({ defendantDataList }) => {

    const [isActiveFileSelected, setIsActiveFileSelected] = useState(false);
    const [fileNeedUpdateSelected, setFileNeedUpdateSelected] = useState(false);
    const [closedFilesSelected, setClosedFilesSelected] = useState(false);
    useEffect(() => {
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

    return (
        <div className='defendant-data'>
            <h4>{translate('search.defendantDataTitle')}</h4>
            <div className='files-table'>
                <div className='titleTableHeader'>
                    <div className="tableTabs">
                        <div className="active">
                            {translate('search.collection')} <span>(20)</span>
                        </div>
                        <div>
                            {translate('search.urgentRequest')} <span>(20)</span>
                        </div>
                        <div>
                            {translate('search.cases')} <span>(10)</span>
                        </div>
                    </div>
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

                        <div className='totalFiles'>
                            {translate('search.totalFiles')}
                            <span>(2500)</span>
                        </div>
                    </div>
                </div>

                <div className="table-container">
                    <DataTable
                        value={defendantDataList}
                        dataKey="id"
                        className="custom-table"
                        rows={10}
                        paginator
                        scrollable
                    >
                        <Column field="fileNumber" header={translate("search.fileNumber")} className="columnStyle fileNo" />
                        <Column field="defendantName" header={translate("search.defendantName")} className="columnStyle defendantName-col" />
                        <Column field="nationalNumber" header={translate("search.nationalNumber")} className="columnStyle" />
                        <Column field="registerDate" header={translate("search.fileOpenDate")} className="columnStyle" />
                        <Column field="lastUpdateDate" header={translate("search.lastUpdateDate")} className="columnStyle" />
                        <Column field="legalDocuments" header={translate("search.legalDocuments")} className="legalDocs-col" />
                        <Column field="dataStatus" header={translate("search.fileStatus")} className="dataStatus-col" body={dataStatusTemplate} />
                        <Column body={actionList} className="columnStyle actionList-col" />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};
