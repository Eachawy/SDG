import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ButtonComponent } from "@eachawy/frontend-library";
import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames } from "primereact/utils";

const DeclarationTableComponent = () => {

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
      nationalNumber: 123456789,
      dateOfIssue: "29-9-2025",
      dueDate: "29-9-2025",
      totalAmount: "35,000",
      type: "سند امانة",
      witness: [
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
    {
      id: 2,
      debtorNameList: [
        { id: 403, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 404, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 405, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      nationalNumber: 123456789,
      dateOfIssue: "30-9-2025",
      dueDate: "30-9-2025",
      totalAmount: "35,000",
      type: "اقرار خطي",
      witness: [],
      attachmentFileData: [
        {
          id: 502,
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        }
      ]
    },
    {
      id: 3,
      debtorNameList: [
        { id: 406, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 407, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 408, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      nationalNumber: 123456789,
      dateOfIssue: "01-10-2025",
      dueDate: "01-10-2025",
      totalAmount: "35,000",
      type: "سند امانة",
      witness: [
        { id: 456, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 457, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 458, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      attachmentFileData: [{
        id: 503,
        fileName: "شيك حال الأداء",
        fileType: "شيك مصرفي",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
      },
      {
        id: 504,
        fileName: "صورة الشيك المرتد",
        fileType: "شيك مقبول الدفع",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
      },
      {
        id: 505,
        fileName: "صورة الشيك المرتد",
        fileType: "شيك مقبول الدفع",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
      },]
    },
    {
      id: 4,
      debtorNameList: [
        { id: 409, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 410, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 411, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      nationalNumber: 123456789,
      dateOfIssue: "02-10-2025",
      dueDate: "02-10-2025",
      totalAmount: "35,000",
      type: "سند امانة",
      witness: [
        { id: 459, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 460, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 461, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      attachmentFileData: [{
        id: 506,
        fileName: "شيك حال الأداء",
        fileType: "شيك مصرفي",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
      },
      {
        id: 507,
        fileName: "صورة الشيك المرتد",
        fileType: "شيك مقبول الدفع",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
      },
      {
        id: 508,
        fileName: "صورة الشيك المرتد",
        fileType: "شيك مقبول الدفع",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
      },]
    },
    {
      id: 5,
      debtorNameList: [
        { id: 412, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 413, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 414, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      nationalNumber: 123456789,
      dateOfIssue: "03-10-2025",
      dueDate: "03-10-2025",
      totalAmount: "35,000",
      type: "سند امانة",
      witness: [
        { id: 462, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 463, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 464, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      attachmentFileData: [{
        id: 509,
        fileName: "شيك حال الأداء",
        fileType: "شيك مصرفي",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
      },
      {
        id: 510,
        fileName: "صورة الشيك المرتد",
        fileType: "شيك مقبول الدفع",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
      },
      {
        id: 511,
        fileName: "صورة الشيك المرتد",
        fileType: "شيك مقبول الدفع",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
      },]
    },
    {
      id: 6,
      debtorNameList: [
        { id: 415, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 416, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 417, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      nationalNumber: 123456789,
      dateOfIssue: "04-10-2025",
      dueDate: "04-10-2025",
      totalAmount: "35,000",
      type: "سند امانة",
      witness: [
        { id: 465, name: "محمد عبد الله رشوان", phoneNo: "123456789" },
        { id: 466, name: "اسماعيل العقاد عبد الله", phoneNo: "123456789" },
        { id: 467, name: "محمد رائد العقاد", phoneNo: "123456789" }
      ],
      attachmentFileData: [{
        id: 512,
        fileName: "شيك حال الأداء",
        fileType: "شيك مصرفي",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
      },
      {
        id: 513,
        fileName: "صورة الشيك المرتد",
        fileType: "شيك مقبول الدفع",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
      },
      {
        id: 514,
        fileName: "صورة الشيك المرتد",
        fileType: "شيك مقبول الدفع",
        fileSize: "250KB",
        filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
      },]
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

  const debtorNameTemplate = (rowData: any) => {
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
          <p>{rowData.debtorNameList[0].name + "/" + rowData.debtorNameList[1].name}</p>
        </div>
        {debtorNameInfoListRowId === rowData.id && isDebtorInfoList && (
          <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>
            {rowData.debtorNameList.map((d) => (
              <div key={d.id}>
                <p><label>اسم المدين</label>{d.name}</p>
                <p><label>رقم الهاتف</label>{d.phoneNo}</p>
              </div>
            ))}
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
          if (rowData.witness.length > 0) {
            setIsGuarantorInfoList(true);
          }
          setIsDebtorInfoList(false)
          setIsActionList(false);
        }}
      >
        <div className="tdinnerDiv">
          <span className={`${!(rowData.witness.length > 0) && "hideIcon"}`} />
          <p>{rowData.witness.length > 0 ? rowData.witness[0].name + "/" + rowData.witness[1].name : "لا يوجد كفيل"}</p>
        </div>
        {guarantorNameInfoListRowId === rowData.id && isGuarantorInfoList && (
          <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>
            {rowData.witness.length > 0 && rowData.witness?.map((d) => (
              <div key={d?.id}>
                <p><label>اسم الشاهد</label>{d?.name}</p>
                <p><label>رقم الهاتف</label>{d?.phoneNo}</p>
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
        value={customChequeData}
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
          field="nationalNumber"
          header="الرقم الوطني"
          className="columnStyle" />

        <Column
          field="dateOfIssue"
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
          field="type"
          header="النوع"
          className="columnStyle"
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

export default DeclarationTableComponent;