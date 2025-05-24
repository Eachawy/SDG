import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { deleteLegalBond } from "../../../legalBonds.reducer";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import { CurrencyList } from "app/modules/shared/constants";
import _ from "lodash";
import $ from 'jquery';
import DeleteRowPopup from "app/shared/components/deleteRowPopup.Component/deleteRowPopup.Component";
import AttachmentPopupComponent from "app/shared/components/attachmentPopup.Component/attachmentPopup.Component";


const StatementTableComponent = (props) => {

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
    props.setSelectedRowsFn(e.value.map(item => item.id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".action-column")) {
        $(".action-column .actionList").hide();
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
              props.editRecordDataFN('AS', rowData);
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
      type: "ACCOUNT_STATEMENT",
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
          value={props.accountStatementsList}
          selectionMode="multiple"
          selection={selectedCheques}
          onSelectionChange={onChangeSelection}
          dataKey="id"
          className="custom-table"
          paginator
          rows={10}
        >
          <Column selectionMode="multiple" header="" style={{ width: "30px" }} className="checkBoxCol" />

          <Column
            field="accountNumber"
            header="رقم كشف الحساب"
            className="columnStyle" />

          <Column
            field="totalAmount"
            header="اجمالي المبلغ"
            className="columnStyle"
            body={totalAmountBody}
          />

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

export default StatementTableComponent;