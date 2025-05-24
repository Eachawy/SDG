import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonComponent } from '@eachawy/frontend-library';
import { getFileSize, getFileType } from 'app/shared/util/utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import { deleteLegalBond } from '../../../legalBonds.reducer';
import { CurrencyList } from 'app/modules/shared/constants';
import _ from 'lodash';
import DeleteRowPopup from 'app/shared/components/deleteRowPopup.Component/deleteRowPopup.Component';
import AttachmentPopupComponent from 'app/shared/components/attachmentPopup.Component/attachmentPopup.Component';

const ChequeTableComponent = (props) => {
  const [selectedCheques, setSelectedCheques] = useState([]);
  const [actionRowId, setActionRowId] = useState<number | null>(null);
  const [isActionList, setIsActionList] = useState(false);
  const [isBeneficiaryInfoList, setIsBeneficiaryInfoList] = useState(false);
  const [beneficiaryInfoListRowId, setBeneficiaryInfoListRowId] = useState<number | null>(null);
  const [attachmentListRow, setAttachmentListRow] = useState<number | null>(null)
  const [isAttachmentTamplateList, setIsAttachmentTamplateList] = useState(false)
  const [selectedAttachmentCard, setSelectedAttachmentCard] = useState(0)
  const [selectedAttachmentFilePath, setSelectedAttachmentFilePath] = useState('')
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const [deleteID, setDeleteID] = useState<number | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useAppDispatch();
  const $deleteLegalBondResponse = useAppSelector(state => state.legalBonds.deleteLegalBondResponse);

  useEffect(() => {
    if ($deleteLegalBondResponse?.status === 204) {
      setDeleteID(null);
      setShowDeletePopup(false);
      props.deleteIdDoneFn();
    }

  }, [$deleteLegalBondResponse])

  const onChangeSelection = (e) => {
    setSelectedCheques(e.value);
    props.setSelectedRowsFn(e.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".action-column")) {
        $(".action-column .actionList").hide();
      }
      if (!(event.target as HTMLElement).closest(".action-column.NFBList")) {
        $(".action-column.NFBList .actionList._beneficiary").hide();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalAmountBody = (rowData: any) => {
    return (
      <div className="totalAmountBody">
        <span>{rowData?.totalAmount}</span>
        <span>{_.find(CurrencyList, (item) => item.code === rowData?.currency)?.name[$lang]}</span>
      </div>
    )
  }

  const beneficiaryBody = (rowData: any) => {
    if (rowData?.legalBondParticipant?.length > 0) {
      return <span>مستفيد أول</span>
    } else {
      return <span>مجير له</span>
    }
  }

  const attachmentTemplate = (rowData: any) => {
    return (
      <div className="action-column attachmentTemplateDiv"
        onClick={(e) => {
          e.stopPropagation();
          setAttachmentListRow(rowData);
        }}
      >
        <div className="attachmentTdinnerDiv">
          <p>عرض</p>
        </div>
      </div>
    )
  }

  const beneficiaryInfoTemplateList = (rowData: any) => {
    if (rowData?.legalBondParticipant?.length > 0) {
      return (
        <div className="action-column NFBList"
          onClick={(e) => {
            e.stopPropagation();
            $('.action-column.NFBList').find('.actionList._beneficiary').hide();
            $(e.target).find('.actionList._beneficiary').css("display", "flex");;
          }}
        >
          <div className="tdinnerDiv">
            <span />
            <p>{rowData?.chequeBeneficiaries[0]?.name + "/" + rowData?.legalBondParticipant[0]?.name}</p>
          </div>
          <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>
            <div className={'fb'}>
              <p><label>اسم المستفيد</label>{rowData?.chequeBeneficiaries[0]?.name}</p>
              <span>مستفيد أول</span>
            </div>
            {rowData?.legalBondParticipant.map((b) => (

              <div key={b.id}>
                <p><label>اسم الساحب</label>{b.name}</p>
              </div>
            ))}

          </div>
        </div>
      )
    } else {
      return (
        <div className="action-column NFBList"
          onClick={(e) => {
            e.stopPropagation();
            $('.action-column.NFBList').find('.actionList._beneficiary').hide();
            $(e.target).find('.actionList._beneficiary').css("display", "flex");;
          }}
        >
          <div className="tdinnerDiv">
            <span />
            <p>{rowData?.chequeBeneficiaries[0]?.name + (rowData?.chequeBeneficiaries.length > 1 ? "/" + rowData?.chequeBeneficiaries[1].name : '')}</p>
          </div>
          <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>
            <div className={'fb'}>
              <p><label>اسم المجير له</label>{rowData?.chequeBeneficiaries[0]?.name}</p>
              <span>مستفيد أول</span>
            </div>
            {rowData?.chequeBeneficiaries.map((b, index) => (
              <>
                {index !== 0 && (
                  <div key={b.id}>
                    <p><label>اسم المجير له</label>{b.name}</p>
                  </div>
                )}
              </>
            ))}

          </div>
        </div>
      )
    }
  }

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div
        className="action-column"
        onClick={(e) => {
          e.stopPropagation();
          $('.action-column').find('.actionList').hide();
          $(e.target).find('.actionList').css("display", "flex");;
        }}
      >
        <span className="dots-menu" />
        <div className="actionList" onClick={(e) => e.stopPropagation()}>
          <span
            onClick={() => {
              setIsActionList(false);
              props.editRecordDataFN('CHQ', rowData);
            }}
          >
            تعديل
          </span>
          <span
            onClick={() => {
              setIsActionList(false);
              setShowDeletePopup(true);
              setDeleteID(rowData.id);
            }}
          >
            حذف
          </span>
        </div>
      </div>
    );
  };

  const deleteFN = async () => {
    setShowLoader(true);
    const obj = {
      type: "CHEQUE",
      ids: [deleteID]
    }
    await dispatch(deleteLegalBond(obj));
    setShowLoader(false);
  }

  return (
    <>
      <LoaderComponent show={showLoader} />
      <div className="table-container">
        <DataTable
          value={props.chequesList}
          selectionMode="multiple"
          selection={selectedCheques}
          onSelectionChange={onChangeSelection}
          dataKey="id"
          className="custom-table"
          paginator
          rows={10}
        >
          <Column selectionMode="multiple" header="" className="checkBoxCol" />
          <Column field={`bank.${$lang === 'en' ? 'arabicName' : 'englishName'}`} header="اسم البنك" className="columnStyle" />
          <Column
            field="chequeNumber"
            header="رقم الشيك"
            className="columnStyle"
          />
          <Column
            field="totalAmount"
            header="قيمة الشيك"
            className="columnStyle"
            body={totalAmountBody}
          />
          <Column
            field="dueDate"
            header="تاريخ الاستحقاق"
            className="columnStyle"
          />
          <Column
            field="returnDate"
            header="تاريخ الإعادة"
            className="columnStyle"
          />
          <Column field="beneficiary" header="المستفيد" className="columnStyle" body={beneficiaryBody} />

          <Column
            field="drawer"
            header="اسم المستفيد / الساحب / مجير له"
            className="columnStyle"
            body={beneficiaryInfoTemplateList}
          />

          <Column body={attachmentTemplate}
            header="الملاحظات"
            className="columnStyle attachmentCol"
          />

          <Column body={actionBodyTemplate} className="columnStyle" />
        </DataTable>

        {showDeletePopup && (
          <DeleteRowPopup cancelPopup={() => setShowDeletePopup(false)} deleteFN={deleteFN} />
        )}

        {attachmentListRow &&
          <AttachmentPopupComponent attachList={attachmentListRow} closeAttachmentPopupFn={() => setAttachmentListRow(null)} />
        }
      </div>
    </>
  );
};

export default ChequeTableComponent;