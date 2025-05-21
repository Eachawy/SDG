import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ButtonComponent } from "@eachawy/frontend-library";
import { getFileSize, getFileType } from "app/shared/util/utils";
import { PaymentTypesObj } from "app/modules/shared/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { deleteLegalBond } from "../../../legalBonds.reducer";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";

const RentTableComponent = (props) => {

  const [selectedCheques, setSelectedCheques] = useState([]);
  const [actionRowId, setActionRowId] = useState<number | null>(null);
  const [isActionList, setIsActionList] = useState(false);
  const [isDebtorInfoList, setIsDebtorInfoList] = useState(false);
  const [debtorNameInfoListRowId, setDebtorNameInfoListRowId] = useState<number | null>(null);
  const [attachmentTamplateListRowId, setAttachmentTamplateListRowId] = useState<number | null>(null)
  const [isAttachmentTamplateList, setIsAttachmentTamplateList] = useState(false)
  const [selectedAttachmentCard, setSelectedAttachmentCard] = useState(0)
  const [selectedAttachmentFilePath, setSelectedAttachmentFilePath] = useState('')
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
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".action-column")) {
        setIsActionList(false);
        setIsDebtorInfoList(false)
        setActionRowId(null);
        setDebtorNameInfoListRowId(null)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalAmountBody = () => {
    return <span>{props.rentContractList?.totalAmount}</span>
  }

  const totalCollectedAmountBody = () => {
    return <span>{props.rentContractList?.requiredCollectionAmount}</span>
  }

  const rentStartDateBody = rowData => {
    return <span>{rowData.paymentSchedules[0]?.paymentDate}</span>
  }

  const paymentMethodBody = rowData => {
    return <span>{PaymentTypesObj[rowData.paymentPeriod].name[$lang]}</span>
  }

  const renderPayments = (rowData) => {
    const numberOfPayments = rowData.paymentSchedules.length;
    const totalAmount = rowData.paymentSchedules.reduce((sum, payment) => sum + payment.amount, 0);
    return (
      <div className="action-column NFBList"
        onClick={(e) => {
          e.stopPropagation();
          setDebtorNameInfoListRowId(rowData.id);
          setIsDebtorInfoList(true)
          setIsActionList(false);
        }}
      >
        <div className="tdinnerDiv">
          <span />
          <p>{numberOfPayments}</p>
        </div>
        {debtorNameInfoListRowId === rowData.id && isDebtorInfoList && (
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
        )}
      </div>
    )
  }

  const attachmentTemplate = (rowData: any) => {
    return (
      <div className="action-column attachmentTemplateDiv"
        onClick={(e) => {
          e.stopPropagation();
          if (attachmentTamplateListRowId !== rowData.id || !isAttachmentTamplateList) {
            setAttachmentTamplateListRowId(rowData.id);
            setIsAttachmentTamplateList(true);
            setIsDebtorInfoList(false);
            setIsActionList(false);
            setSelectedAttachmentCard(0)
            setSelectedAttachmentFilePath(rowData.attachments[0].content)

          }
        }}
      >
        <div className="attachmentTdinnerDiv">
          <p>عرض</p>
        </div>

        {(
          attachmentTamplateListRowId === rowData.id &&
          isAttachmentTamplateList) && (
            <div className="popupView">
              <div className="content">
                <div>
                  <div className="fileCardList">

                    {rowData.attachments.length > 0 && rowData.attachments.map((i, index) => (
                      <div key={index} onClick={() => {
                        setSelectedAttachmentCard(index)
                        setSelectedAttachmentFilePath(i.content)
                      }} className={`${selectedAttachmentCard === index && 'active'}`}>
                        <p>
                          <label>اسم الملف</label>
                          {i.name}
                        </p>
                        <div>
                          <p>
                            <label>نوع الملف</label>
                            {getFileType(i.content)}
                          </p>
                          <p>
                            <label>حجم الملف</label>
                            {getFileSize(i.content)}
                          </p>
                        </div>
                      </div>
                    ))
                    }
                  </div>
                  <div className="fileViewSpace">
                    <object width={"100%"} height={"100%"}
                      data={`${selectedAttachmentFilePath}`}
                    // type={selectedAttachmentFilePath.toLowerCase().endsWith('.pdf') ? "application/pdf" : "image/jpeg"}
                    />
                  </div>
                </div>
                <ButtonComponent Class={'BtnCancel'} onClick={closeAttachmentPopupFn}>إغلاق</ButtonComponent>
              </div>
            </div>
          )}
      </div>
    )
  }

  const closeAttachmentPopupFn = () => {
    setIsAttachmentTamplateList((prev) => {
      console.log("Closing popup, previous state:", prev);
      return false;
    });
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div
        className="action-column"
        onClick={(e) => {
          e.stopPropagation();
          setActionRowId(rowData.id);
          setIsActionList(true);
          setIsDebtorInfoList(false)
        }}
      >
        <span className="dots-menu" />
        {actionRowId === rowData.id && isActionList && (
          <div className="actionList" onClick={(e) => e.stopPropagation()}>
            <span
              onClick={() => {
                setIsActionList(false);
                props.editRecordDataFN('RC',rowData);
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
        )}
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
          rows={5}
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
          <div className='deletePopupContainer'>
            <div className='dialogBoxContent'>
              <h4>هل أنت متأكد أنك تريد حذف بيانات عقد الإيجار</h4>
              <p>في حاله تاكيد الحذف سوف يتم حذف جميع بيانات عقد الإيجار ولا يمكن التراجع عن هذا الإجراء.</p>
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
      </div>
    </>
  );
};

export default RentTableComponent;