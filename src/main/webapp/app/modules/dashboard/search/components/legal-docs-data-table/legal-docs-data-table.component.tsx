import { ProgressBar } from 'primereact/progressbar';
import React, { useEffect } from 'react';
import $ from 'jquery';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { translate } from 'react-jhipster';
import { DropDownComponent } from '@eachawy/frontend-library';
import { useAppSelector } from 'app/config/store';
import { useForm } from 'react-hook-form';

export const LegalDocsDataTable = ({ legalDocsDataList }) => {

    const { register, formState: { errors }, watch, setValue } = useForm({ mode: "onTouched" });
    const $lang = useAppSelector((state) => state.locale.currentLocale);
    const fileTypeList = [
        { name: { en: 'Lawsuits', ar: 'قضايا' }, code: 'la' },
        { name: { en: 'Urgent Request', ar: 'طلب مستعجل' }, code: 'ur' },
        { name: { en: 'Collection', ar: 'تحصيل' }, code: 'co' }
    ];

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
                <div className='fileType'>
                    <DropDownComponent
                        id="LDfileType"
                        name="LDfileType"
                        label={translate('search.fileType')}
                        register={register}
                        watch={watch}
                        setValueMethod={setValue}
                        options={fileTypeList}
                        optionLabel={`name.${$lang}`}
                        onChange={(e) => setValue("LDfileType", e.value as object)}
                        placeholder={translate('search.selectFileType')}
                        errors={errors}
                        className="col-md-4 mb-4"
                    />
                </div>
                <div className='titleTableHeader _defendantTableHeader'>
                    <h4>{translate('search.legalBondDetails')}</h4>
                    <div className='totalFiles'>
                        {translate('search.totalFiles')}
                        <span>({legalDocsDataList.length})</span>
                    </div>
                </div>

                <div className="table-container">
                    <DataTable
                        value={legalDocsDataList}
                        dataKey="id"
                        className="custom-table"
                        rows={10}
                        paginator
                        scrollable
                    >
                        <Column field="fileNumber" header={translate('search.fileNumber')} className="columnStyle fileNo" />
                        <Column field="defendantName" header={translate('search.defendantName')} className="columnStyle defendantName-col" />
                        <Column field="nationalNumber" header={translate('search.nationalNumber')} className="columnStyle" />
                        <Column field="lawsuitRegistrationDate" header={translate('search.lawsuitRegistrationDate')} className="columnStyle" />
                        <Column field="lastUpdateDate" header={translate('search.lastUpdateDate')} className="columnStyle" />
                        <Column field="fileOpenDate" header={translate('search.fileOpenDate')} className="columnStyle" />
                        <Column field="legalDocuments" header={translate('search.legalDocuments')} className="legalDocs-col" />
                        <Column field="dataStatus" header={translate('search.fileStatus')} className="dataStatus-col" body={dataStatusTemplate} />
                        <Column body={actionList} className="columnStyle actionList-col" />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};
