import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ButtonComponent } from "@eachawy/frontend-library";
import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames } from "primereact/utils";

const StatementTableComponent = () => {

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
      statementNo: 123456789,
      totalAmount: "35,000",
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        }
      ]
    },
    {
      id: 2,
      statementNo: 123456789,
      totalAmount: "35,000",
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        }
      ]
    },
    {
      id: 3,
      statementNo: 123456789,
      totalAmount: "35,000",
      attachmentFileData: [
        {
          fileName: "شيك حال الأداء",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        }
      ]
    },
    {
      id: 4,
      statementNo: 123456789,
      totalAmount: "35,000",
      attachmentFileData: [
        {
          fileName: "شيك حال الأداء",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        }
      ]
    },
    {
      id: 5,
      statementNo: 123456789,
      totalAmount: "35,000",
      attachmentFileData: [
        {
          fileName: "شيك حال الأداء",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        }
      ]
    },
    {
      id: 6,
      statementNo: 123456789,
      totalAmount: "35,000",
      attachmentFileData: [
        {
          fileName: "شيك حال الأداء",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        }
      ]
    }
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
            setIsActionList(false);
            setSelectedAttachmentCard(0)
            setSelectedAttachmentFilePath(rowData.attachmentFileData[0].filePath)

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

                    {rowData.attachmentFileData.length > 0 && rowData.attachmentFileData.map((i, index) => (
                      <div key={index} onClick={() => {
                        setSelectedAttachmentCard(index)
                        setSelectedAttachmentFilePath(i.filePath)
                      }} className={`${i.filePath.includes('bank') && 'pdfEx'} ${selectedAttachmentCard === index && 'active'}`}>
                        <p>
                          <label>اسم الملف</label>
                          {i.fileName}
                        </p>
                        <div>
                          <p>
                            <label>نوع الملف</label>
                            {i.fileType}
                          </p>
                          <p>
                            <label>حجم الملف</label>
                            {i.fileSize}
                          </p>
                        </div>
                      </div>
                    ))
                    }
                  </div>
                  <div className="fileViewSpace">
                    <object width={"100%"} height={"100%"}
                      data={`${selectedAttachmentFilePath}`}
                      type={selectedAttachmentFilePath.toLowerCase().endsWith('.pdf') ? "application/pdf" : "image/jpeg"}
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
        value={customChequeData}
        selectionMode="multiple"
        selection={selectedCheques}
        onSelectionChange={onChangeSelection}
        dataKey="id"
        className="custom-table"
      >
        <Column selectionMode="multiple" header="" style={{ width: "30px" }} className="checkBoxCol" />

        <Column
          field="statementNo"
          header="رقم كشف الحساب"
          className="columnStyle" />

        <Column
          field="totalAmount"
          header="اجمالي الملغ"
          className="columnStyle"
        />

        <Column body={attachmentTemplate}
          header="المرفقات"
          className="columnStyle attachmentCol"
        />

        <Column body={actionBodyTemplate} className="columnStyle actionCol" />
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

export default StatementTableComponent;