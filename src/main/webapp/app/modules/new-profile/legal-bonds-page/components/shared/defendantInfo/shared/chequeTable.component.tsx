import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import { deleteLegalBond } from '../../../legalBonds.reducer';
import { CurrencyList } from 'app/modules/shared/constants';
import _ from 'lodash';
import DeleteRowPopup from 'app/shared/components/deleteRowPopup.Component/deleteRowPopup.Component';
import AttachmentPopupComponent from 'app/shared/components/attachmentPopup.Component/attachmentPopup.Component';
import $ from 'jquery';

const ChequeTableComponent = (props) => {
  const [selectedCheques, setSelectedCheques] = useState([]);
  const [attachmentListRow, setAttachmentListRow] = useState<number | null>(null)
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

  const openBeneficiaryList = (e: any) => {
    $('.action-column').find('.actionList').hide();
    $(e.currentTarget).find('.actionList._beneficiary').css("display", "flex");
  }

  const beneficiarylegalBondInfoTemplateList = (rowData: any) => {
    return (
      <div className="action-column NFBList"
        onClick={(e) => {
          e.stopPropagation();
          openBeneficiaryList(e);
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
  }

  const beneficiaryInfoTemplateList = (rowData: any) => {
    return (
      <div className="action-column NFBList"
        onClick={(e) => {
          e.stopPropagation();
          openBeneficiaryList(e);
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
            <span key={b.id}>
              {index !== 0 && (
                <div>
                  <p><label>اسم المجير له</label>{b.name}</p>
                </div>
              )}
            </span>
          ))}
        </div>
      </div>
    )
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
              props.editRecordDataFN('CHQ', rowData);
            }}
          >
            تعديل
          </span>
          <span
            onClick={() => {
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
          {!props.isDashboard && <Column selectionMode="multiple" header="" className="checkBoxCol" />}
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
            body={(rowData) =>
              rowData?.legalBondParticipant?.length > 0 ?
                beneficiarylegalBondInfoTemplateList(rowData) :
                beneficiaryInfoTemplateList(rowData)
            }
          />


          <Column body={attachmentTemplate}
            header="المرفقات"
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