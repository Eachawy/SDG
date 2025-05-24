import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CurrencyList, PaymentTypesObj } from "app/modules/shared/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { deleteLegalBond } from "../../../legalBonds.reducer";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import _ from "lodash";
import $ from 'jquery';
import DeleteRowPopup from "app/shared/components/deleteRowPopup.Component/deleteRowPopup.Component";
import AttachmentPopupComponent from "app/shared/components/attachmentPopup.Component/attachmentPopup.Component";

const RentTableComponent = (props) => {

  const [selectedCheques, setSelectedCheques] = useState([]);
  const [attachmentListRow, setAttachmentListRow] = useState<number | null>(null)
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [deleteID, setDeleteID] = useState<number | null>(null);
  const $lang = useAppSelector((state) => state.locale.currentLocale);
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
    props.setSelectedRowsFn(e.value.map(item => item.id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".action-column")) {
        $(".action-column .actionList").hide();
      }
      if (!(event.target as HTMLElement).closest(".action-column.NFBList")) {
        $(".action-column.NFBList .actionList._leaseNoOfPayments").hide();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalAmountBody = () => {
    return (
      <div className="totalAmountBody">
        <span>{props.rentContractList?.totalAmount}</span>
        <span>{_.find(CurrencyList, (item) => item.code === props.rentContractList?.currency)?.name[$lang]}</span>
      </div>
    )
  }

  const totalCollectedAmountBody = () => {
    return (
      <div className="totalAmountBody">
        <span>{props.rentContractList?.requiredCollectionAmount}</span>
        <span>{_.find(CurrencyList, (item) => item.code === props.rentContractList?.currency)?.name[$lang]}</span>
      </div>
    )
  }

  const rentStartDateBody = rowData => {
    return <span>{rowData.paymentSchedules[0]?.paymentDate}</span>
  }

  const paymentMethodBody = rowData => {
    return <span>{PaymentTypesObj[rowData.paymentPeriod].name[$lang]}</span>
  }

  const renderPayments = (rowData) => {
    const numberOfPayments = rowData.paymentSchedules?.length;
    const totalAmount = rowData.paymentSchedules.reduce((sum, payment) => sum + payment.amount, 0);
    return (
      <div className="action-column NFBList"
        onClick={(e) => {
          e.stopPropagation();
          $('.action-column').find('.actionList').hide();
          $(e.currentTarget).find('.actionList._leaseNoOfPayments').css("display", "flex");
        }}
      >
        <div className="tdinnerDiv">
          <span />
          <p>{numberOfPayments}</p>
        </div>

        <div className="actionList _beneficiary _leaseNoOfPayments" onClick={(e) => e.stopPropagation()}>
          <div>
            <p><label>عدد الدفعات</label>{numberOfPayments}</p>
            <p><label>المبلغ المراد تحصيلة</label>{totalAmount}</p>
          </div>
          {rowData.paymentSchedules.map((d) => (
            <div key={d.id}>
              <p><label>تاريخ الاستحقاق</label>{d.paymentDate}</p>
              <p><label>المبلغ المستحق</label>{d.amount}</p>
            </div>
          ))}
        </div>

      </div>
    )
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

  const actionBodyTemplate = (rowData: any) => {
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
        <div className="actionList" onClick={(e) => e.stopPropagation()}>
          <span
            onClick={() => {
              props.editRecordDataFN('RC', rowData);
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
      type: "RENT_CONTRACT",
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
          value={props.rentContractList?.rentContracts}
          selectionMode="multiple"
          selection={selectedCheques}
          onSelectionChange={onChangeSelection}
          dataKey="id"
          className="custom-table"
          paginator
          rows={10}
        >
          <Column selectionMode="multiple" header="" style={{ width: "30px" }} className="checkBoxCol" />

          <Column field="startDate" header="تاريخ بدء الإيجار" className="columnStyle" body={rentStartDateBody} />

          <Column field="totalAmount" header="اصل الدين" className="columnStyle" body={totalAmountBody} />

          <Column field="paymentPeriod" header="طريقة السداد" className="columnStyle" body={paymentMethodBody} />

          <Column field="requiredCollectionAmount" header="المبلغ المراد تحصيله" className="columnStyle" body={totalCollectedAmountBody} />

          <Column body={renderPayments} header="عدد الدفعات" className="columnStyle numberOfPayments" />

          <Column body={attachmentTemplate}
            header="المرفقات"
            className="columnStyle attachmentCol"
          />

          <Column body={actionBodyTemplate} className="columnStyle actionCol" />
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

export default RentTableComponent;