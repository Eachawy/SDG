import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ButtonComponent } from "@eachawy/frontend-library";
import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames } from "primereact/utils";
import { getFileSize, getFileType } from "app/shared/util/utils";

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
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);
  const [customChequeData, setCustomChequeData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const chequeData = [
    {
      id: 1,
      debtorNameList: [
        { id: 400, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 401, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 402, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      phoneNumber: 123456789,
      dateOfIssue: "29-9-2025",
      dueDate: "29-9-2025",
      totalAmount: "35,000",
      guarantors: [
        { id: 450, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 451, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 452, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      attachmentFileData: [
        {
          id: 500,
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          id: 501,
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        }
      ]
    },
  ];

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCustomChequeData(chequeData.slice(event.first, event.first + event.rows));
  }

  useEffect(() => {
    setCustomChequeData(chequeData.slice(first, first + rows));
  }, [first, rows]);

  const onChangeSelection = (e) => {
    setSelectedCheques(e.value);
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

  const closeAttachmentPopupFn = () => {
    setIsAttachmentTamplateList((prev) => {
      console.log("Closing popup, previous state:", prev);
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
          <p>{guarantorsList.length > 0 ? guarantorsList[0].name +  (guarantorsList.length > 1 ? "/" + guarantorsList[1].name : '') : "لا يوجد كفيل"}</p>
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
              }}
            >
              تعديل
            </span>
            <span
              onClick={() => {
                setIsActionList(false);
                setShowDeletePopup(true)
              }}
            >
              حذف
            </span>
          </div>
        )}
      </div>
    );
  };

  const paginatorTemplate = {
    layout: "PrevPageLink PageLinks NextPageLink",
    PrevPageLink: (options) => (
      <button type="button" className={`${options.className} border-round`} onClick={options.onClick} disabled={options.disabled}>
        <span className="p-3">السابق</span>
        <Ripple />
      </button>
    ),

    PageLinks(options) {
      if ((options.view.startPage === options.page && options.view.startPage !== 0) ||
        (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
        return <span className={classNames(options.className, "p-disabled")} style={{ userSelect: "none" }}>...</span>;
      }
      return (
        <button type="button" className={options.className} onClick={options.onClick}>
          {options.page + 1}
          <Ripple />
        </button>
      );
    },

    NextPageLink: (options) => (
      <button type="button" className={`${options.className} border-round`} onClick={options.onClick} disabled={options.disabled}>
        <span className="p-3">التالي</span>
        <Ripple />
      </button>
    ),
  };

  const cancelActionFn = () => {
    setShowDeletePopup(false)
  }
  const deleteFN = () => { }


  return (
    <div className="table-container">
      <DataTable
        value={props.draftsList}
        selectionMode="multiple"
        selection={selectedCheques}
        onSelectionChange={onChangeSelection}
        dataKey="id"
        className="custom-table"
      >
        <Column selectionMode="multiple" header="" style={{ width: "30px" }} className="checkBoxCol" />

        <Column
          body={debtorNameTemplate}
          header="اسم المدين"
          className="columnStyle debtorNameList" />

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
          header="اجمالي الملغ"
          className="columnStyle"
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

      <Paginator template={paginatorTemplate} first={first} rows={rows} totalRecords={chequeData.length} onPageChange={onPageChange} />

      {showDeletePopup && (
        <div className='deletePopupContainer'>
          <div className='dialogBoxContent'>
            <h4>هل أنت متأكد أنك تريد حذف بيانات الشيك؟</h4>
            <p>في حاله تاكيد الحذف سوف يتم حذف جميع بيانات الشيك ولا يمكن التراجع عن هذا الإجراء.</p>
            <div className="actionRowBtns">
              <ButtonComponent Class={'BtnStyle '} onClick={cancelActionFn}>
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
  );
};

export default DraftTableComponent;