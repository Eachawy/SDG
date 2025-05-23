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

const DraftTableComponent = (props) => {

  const [selectedCheques, setSelectedCheques] = useState([]);
  const [actionRowId, setActionRowId] = useState<number | null>(null);
  const [isActionList, setIsActionList] = useState(false);
  const [isDebtorInfoList, setIsDebtorInfoList] = useState(false);
  const [debtorNameInfoListRowId, setDebtorNameInfoListRowId] = useState<number | null>(null);
  const [isGuarantorInfoList, setIsGuarantorInfoList] = useState(false);
  const [guarantorNameInfoListRowId, setguarantorNameInfoListRowId] = useState<number | null>(null);
  const [attachmentTamplateListRowId, setAttachmentTamplateListRowId] = useState<number | null>(null)
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
    props.setSelectedRowsFn(e.value.map(item => item.id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".action-column")) {
        setIsActionList(false);
        setIsDebtorInfoList(false)
        setIsGuarantorInfoList(false)
        setActionRowId(null);
        setDebtorNameInfoListRowId(null)
        setguarantorNameInfoListRowId(null)
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

  const closeAttachmentPopupFn = () => {
    setIsAttachmentTamplateList((prev) => {
      return false;
    });
  };

  const attachmentTemplate = (rowData: any) => {
    return (
      <div className="action-column attachmentTemplateDiv"
        onClick={(e) => {
          e.stopPropagation();
          if (attachmentTamplateListRowId !== rowData.id || !isAttachmentTamplateList) {
            setAttachmentTamplateListRowId(rowData.id);
            setIsAttachmentTamplateList(true);
            setIsDebtorInfoList(false);
            setIsGuarantorInfoList(false);
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

                    {rowData.attachments?.length > 0 && rowData.attachments.map((i, index) => (
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

  const debtorNameTemplate = (rowData: any) => {
    const debtorsList = rowData.legalBondParticipant.filter((item: any) => item.type === "DEBTOR_NAME");
    return (
      <div className="action-column NFBList debtorNameList"
        onClick={(e) => {
          e.stopPropagation();
          setDebtorNameInfoListRowId(rowData.id);
          setIsDebtorInfoList(true)
          setIsGuarantorInfoList(false)
          setIsActionList(false);
        }}
      >
        <div className="tdinnerDiv">
          <span />
          <p>{debtorsList[0].name + (debtorsList.length > 1 ? "/" + debtorsList[1].name : '')}</p>
        </div>
        {debtorNameInfoListRowId === rowData.id && isDebtorInfoList && (
          <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>
            {debtorsList.map((d) => (
              <div key={d.id}>
                <p><label>اسم المدين</label>{d.name}</p>
                <p><label>رقم الهاتف</label>{d.mobileNumber}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const guarantorsTemplateList = (rowData: any) => {
    const guarantorsList = rowData.legalBondParticipant.filter((item: any) => item.type === "DRAFT_GUARANTOR");
    return (
      <div className="action-column NFBList debtorNameList"
        onClick={(e) => {
          e.stopPropagation();
          setguarantorNameInfoListRowId(rowData.id);
          if (guarantorsList.length > 0) {
            setIsGuarantorInfoList(true);
          }
          setIsDebtorInfoList(false)
          setIsActionList(false);
        }}
      >
        <div className="tdinnerDiv">
          <span className={`${!(guarantorsList.length > 0) && "hideIcon"}`} />
          <p>{guarantorsList.length > 0 ? guarantorsList[0].name + (guarantorsList.length > 1 ? "/" + guarantorsList[1].name : '') : "لا يوجد كفيل"}</p>
        </div>
        {guarantorNameInfoListRowId === rowData.id && isGuarantorInfoList && (
          <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>
            {guarantorsList.length > 0 && guarantorsList?.map((d) => (
              <div key={d?.id}>
                <p><label>اسم الكفيل</label>{d?.name}</p>
                <p><label>رقم الهاتف</label>{d?.mobileNumber}</p>
              </div>
            ))}
          </div>
        )}
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
          setIsGuarantorInfoList(false)
          setIsDebtorInfoList(false)
        }}
      >
        <span className="dots-menu" />
        {actionRowId === rowData.id && isActionList && (
          <div className="actionList" onClick={(e) => e.stopPropagation()}>
            <span
              onClick={() => {
                setIsActionList(false);
                props.editRecordDataFN('DR', rowData);
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
      type: "DRAFT",
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
          value={props.draftsList}
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
            body={debtorNameTemplate}
            header="اسم المدين"
            className="columnStyle debtorNameList" />

          <Column
            field="issueDate"
            header="تاريخ الإصدار"
            className="columnStyle"
          />

          <Column
            field="dueDate"
            header="تاريخ الاستحقاق"
            className="columnStyle"
          />

          <Column
            field="totalAmount"
            header="اجمالي المبلغ"
            className="columnStyle"
            body={totalAmountBody}
          />

          <Column
            field="guarantors"
            header="الكفلاء"
            className="columnStyle debtorNameList"
            body={guarantorsTemplateList}
          />

          <Column body={attachmentTemplate}
            header="المرفقات"
            className="columnStyle attachmentCol"
          />

          <Column body={actionBodyTemplate} className="columnStyle" />
        </DataTable>


        {showDeletePopup && (
          <div className='deletePopupContainer'>
            <div className='dialogBoxContent'>
              <h4>هل أنت متأكد أنك تريد حذف بيانات الكمبياة</h4>
              <p>في حاله تاكيد الحذف سوف يتم حذف جميع بيانات الكمبيالة ولا يمكن التراجع عن هذا الإجراء.</p>
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

export default DraftTableComponent;