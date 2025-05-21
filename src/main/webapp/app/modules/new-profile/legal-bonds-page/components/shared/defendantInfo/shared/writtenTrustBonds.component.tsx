import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ButtonComponent } from "@eachawy/frontend-library";
import { TrustWrittenObj } from "app/modules/shared/constants";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { getFileSize, getFileType } from "app/shared/util/utils";
import LoaderComponent from "app/shared/components/loaderComponent/loaderComponent";
import { deleteLegalBond } from "../../../legalBonds.reducer";

const WrittenTrustBondTableComponent = (props) => {

  const [selectedCheques, setSelectedCheques] = useState([]);
  const [actionRowId, setActionRowId] = useState<number | null>(null);
  const [isActionList, setIsActionList] = useState(false);
  const [isGuarantorInfoList, setIsGuarantorInfoList] = useState(false);
  const [guarantorNameInfoListRowId, setguarantorNameInfoListRowId] = useState<number | null>(null);
  const [attachmentTamplateListRowId, setAttachmentTamplateListRowId] = useState<number | null>(null)
  const [isAttachmentTamplateList, setIsAttachmentTamplateList] = useState(false)
  const [selectedAttachmentCard, setSelectedAttachmentCard] = useState(0)
  const [selectedAttachmentFilePath, setSelectedAttachmentFilePath] = useState('')
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const $lang = useAppSelector((state) => state.locale.currentLocale);
  const [deleteID, setDeleteID] = useState(null);
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
        setIsGuarantorInfoList(false)
        setActionRowId(null);
        setguarantorNameInfoListRowId(null)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const requestTypeBody = rowData => {
    return <span>{TrustWrittenObj[rowData.bondType]?.name[$lang]}</span>
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

  const witnessTemplateList = (rowData: any) => {
    return (
      <div className="action-column NFBList debtorNameList"
        onClick={(e) => {
          e.stopPropagation();
          setguarantorNameInfoListRowId(rowData.id);
          if (rowData.witnesses.length > 0) {
            setIsGuarantorInfoList(true);
          }
          setIsActionList(false);
        }}
      >
        <div className="tdinnerDiv">
          <span className={`${!(rowData.witnesses.length > 0) && "hideIcon"}`} />
          <p>{rowData.witnesses.length > 0 ? rowData.witnesses[0].name + (rowData.witnesses.length > 1 ? "/" + rowData.witnesses[1].name : '') : "لا يوجد شاهد"}</p>
        </div>
        {guarantorNameInfoListRowId === rowData.id && isGuarantorInfoList && (
          <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>
            {rowData.witnesses.length > 0 && rowData.witnesses?.map((d) => (
              <div key={d?.id}>
                <p><label>اسم الشاهد</label>{d?.name}</p>
                <p><label>الرقم الوطني</label>{d?.ssn}</p>
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
        }}
      >
        <span className="dots-menu" />
        {actionRowId === rowData.id && isActionList && (
          <div className="actionList" onClick={(e) => e.stopPropagation()}>
            <span
              onClick={() => {
                setIsActionList(false);
                props.editRecordDataFN('WTB',rowData);
              }}
            >
              تعديل
            </span>
            <span
              onClick={() => {
                setIsActionList(false);
                setShowDeletePopup(true);
                setDeleteID(rowData);
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
      type: deleteID?.bondType,
      ids: [deleteID?.id]
    }
    await dispatch(deleteLegalBond(obj));
    setShowLoader(false);
  }

  return (
    <>
      <LoaderComponent show={showLoader} />
      <div className="table-container">
        <DataTable
          value={props.writtenTrustBondsList}
          selectionMode="multiple"
          selection={selectedCheques}
          onSelectionChange={onChangeSelection}
          dataKey="id"
          className="custom-table"
          paginator
          rows={5}
        >
          <Column selectionMode="multiple" header="" style={{ width: "30px" }} className="checkBoxCol" />

          <Column
            // body={debtorNameTemplate}
            field="deborName"
            header="اسم المدين"
            className="columnStyle debtorNameList" />

          <Column
            field="deborSsn"
            header="الرقم الوطني"
            className="columnStyle" />

          <Column
            field="issueDate"
            header="تاريخ التحرير"
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
          />

          <Column
            field="type"
            header="النوع"
            className="columnStyle"
            body={requestTypeBody}
          />

          <Column
            field="witness"
            header="اسم الشاهد"
            className="columnStyle debtorNameList"
            body={witnessTemplateList}
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
              <h4>هل أنت متأكد أنك تريد حذف بيانات اقرار خطي / سند امانة</h4>
              <p>في حاله تاكيد الحذف سوف يتم حذف جميع بيانات اقرار خطي / سند امانة ولا يمكن التراجع عن هذا الإجراء.</p>
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

export default WrittenTrustBondTableComponent;