import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ButtonComponent } from "@eachawy/frontend-library";
import { getFileSize, getFileType } from "app/shared/util/utils";
import { deleteLegalBond } from "../../../legalBonds.reducer";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { CurrencyList } from "app/modules/shared/constants";
import _ from "lodash";
import AttachmentPopupComponent from "app/shared/components/attachmentPopup.Component/attachmentPopup.Component";

const InvoiceTableComponent = (props) => {

  const [selectedCheques, setSelectedCheques] = useState([]);
  const [actionRowId, setActionRowId] = useState<number | null>(null);
  const [isActionList, setIsActionList] = useState(false);
  const [attachmentListRow, setAttachmentListRow] = useState<number | null>(null);
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
        setIsActionList(false);
        setActionRowId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalAmountBody = (rowData) => {
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
          setIsActionList(false);
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
          setActionRowId(rowData.id);
          setIsActionList(true);
        }}
      >
        <span className="dots-menu" />
        {actionRowId === rowData.id && isActionList && (
          <div className="actionList" onClick={(e) => e.stopPropagation()}>
            <span
              onClick={() => {
                setIsActionList(false);
                props.editRecordDataFN('INV', rowData);
              }}
            >
              تعديل
            </span>
            <span
              onClick={() => {
                setIsActionList(false);
                setShowDeletePopup(true);
                setDeleteID(rowData.id)
              }}
            >
              حذف
            </span>
          </div>
        )}
      </div>
    );
  };

  const deleteFN = async () => {
    setShowLoader(true);
    const obj = {
      type: "INVOICE",
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
          value={props.invoicesList}
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
            field="invoiceNumber"
            header="رقم الفاتورة"
            className="columnStyle" />

          <Column
            field="invoiceDate"
            header="تاريخ الفاتورة"
            className="columnStyle" />

          <Column
            field="totalAmount"
            header="قيمة الفاتورة"
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
          <div className='deletePopupContainer'>
            <div className='dialogBoxContent'>
              <h4>هل أنت متأكد أنك تريد حذف بيانات الفاتورة</h4>
              <p>في حاله تاكيد الحذف سوف يتم حذف جميع بيانات الفاتورة ولا يمكن التراجع عن هذا الإجراء.</p>
              <div className="actionRowBtns">
                <ButtonComponent Class={'BtnStyle '} onClick={() => setShowDeletePopup(false)}>
                  لا اريد الحذف
                </ButtonComponent>
                <ButtonComponent onClick={deleteFN} Class={'BtnStyle BtnCancel'}>
                  نعم اريد الحذف
                </ButtonComponent>
              </div>
            </div>
          </div>
        )}

        {attachmentListRow &&
          <AttachmentPopupComponent attachList={attachmentListRow} closeAttachmentPopupFn={() => setAttachmentListRow(null)} />
        }

      </div>
    </>
  );
};

export default InvoiceTableComponent;
