import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ButtonComponent } from "@eachawy/frontend-library";
import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames } from "primereact/utils";


const ChequeTableComponent = () => {
  const [selectedCheques, setSelectedCheques] = useState([]);
  const [actionRowId, setActionRowId] = useState<number | null>(null);
  const [isActionList, setIsActionList] = useState(false);
  const [isBeneficiaryInfoList, setIsBeneficiaryInfoList] = useState(false);
  const [beneficiaryInfoListRowId, setBeneficiaryInfoListRowId] = useState<number | null>(null);
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
      bankName: "بنك المشرق",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "خالد العتيبي فهد",
      bfList: [
        { id: 300, name: "أحمد يوسف", isBF: false },
        { id: 301, name: "خالد العتيبي", isBF: false },
        { id: 302, name: "سامي السعد", isBF: true }
      ],
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        }
      ]
    },
    {
      id: 2,
      bankName: "بنك العربي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "خالد العتيبي فهد",
      bfList: [
        { id: 303, name: "عمر فهد", isBF: true },
        { id: 304, name: "عبد الرحمن ناصر", isBF: false },
        { id: 305, name: "فيصل الشمري", isBF: false }
      ],
      attachmentFileData: [
        {
          fileName: "شيك حال الأداء",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
        },
      ]
    },
    {
      id: 3,
      bankName: "بنك العربي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "خالد العتيبي فهد",
      bfList: [
        { id: 306, name: "ياسر الحربي", isBF: true },
        { id: 307, name: "محمد السالم", isBF: false },
        { id: 308, name: "عبدالله الدوسري", isBF: false }
      ],
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        }

      ]
    },
    {
      id: 4,
      bankName: "بنك الإمارات الإسلامي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "أحمد يوسف علي",
      bfList: [
        { id: 309, name: "سعد الغامدي", isBF: true },
        { id: 310, name: "ناصر الشهري", isBF: false },
        { id: 311, name: "فهد المطيري", isBF: false }
      ],
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
        },
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
      ]
    },
    {
      id: 5,
      bankName: "بنك أبوظبي الأول",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      bfList: [
        { id: 312, name: "خالد الزهراني", isBF: false },
        { id: 313, name: "عبد المجيد العمري", isBF: false },
        { id: 314, name: "مبارك القحطاني", isBF: true }
      ],
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
        },

      ]
    },
    {
      id: 6,
      bankName: "بنك الإمارات الإسلامي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "سامي السعد ناصر",
      bfList: [
        { id: 315, name: "طارق الجهني", isBF: false },
        { id: 316, name: "عبد الله الحربي", isBF: false },
        { id: 317, name: "محمد النعيمي", isBF: true }
      ],
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
        },

      ]
    },
    {
      id: 7,
      bankName: "بنك العربي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      bfList: [
        { id: 318, name: "سامي البلوشي", isBF: false },
        { id: 319, name: "سعود الرشيد", isBF: true },
        { id: 320, name: "ماجد العنزي", isBF: false }
      ],
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
        },

      ]
    },
    {
      id: 8,
      bankName: "بنك دبي الإسلامي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "سامي السعد ناصر",
      bfList: [
        { id: 321, name: "ناصر الفهيد", isBF: false },
        { id: 322, name: "عبد الرحمن العساف", isBF: true },
        { id: 323, name: "سالم العتيبي", isBF: false }
      ],
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
        },

      ]
    },
    {
      id: 9,
      bankName: "بنك دبي الإسلامي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "خالد العتيبي فهد",
      bfList: [
        { id: 324, name: "خالد العسيري", isBF: true },
        { id: 325, name: "عبد العزيز الشهراني", isBF: false },
        { id: 326, name: "ياسر الفيفي", isBF: false }
      ],
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
        },

      ]
    },
    {
      id: 10,
      bankName: "بنك أبوظبي الأول",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "خالد العتيبي فهد",
      bfList: [
        { id: 327, name: "عبد الكريم السعدي", isBF: true },
        { id: 328, name: "محمد المهيري", isBF: false },
        { id: 329, name: "بدر المطيري", isBF: false }
      ],
      attachmentFileData: [
        {
          fileName: "صورة الشيك",
          fileType: "شيك مصرفي",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/92871728/photo/close-up-of-blank-bank-check-sample-against-white-background.jpg?s=1024x1024&w=is&k=20&c=f2kFrTB91YH-kQsHO9_QSBjoArRl3fR7wDyJ_-RpZCc="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/142557946/photo/prepare-writing-check.jpg?s=1024x1024&w=is&k=20&c=FQ832NUle8sysLoLAr0Mf2gj71lfq3Yxxy_45_4jp5E="
        },
        {
          fileName: "صورة الشيك المرتد",
          fileType: "شيك مقبول الدفع",
          fileSize: "250KB",
          filePath: "https://media.istockphoto.com/id/915451034/photo/businesswoman-giving-cheque-to-her-colleague.jpg?s=1024x1024&w=is&k=20&c=TtQB9NSARdiK2pNGIAfx0ZohugmOI11tQ4GQyqtsxbE="
        },

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
        setIsBeneficiaryInfoList(false)
        setActionRowId(null);
        setBeneficiaryInfoListRowId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            setIsBeneficiaryInfoList(false);
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

  const beneficiaryInfoTemplateList = (rowData: any) => {
    return (
      <div className="action-column NFBList"
        onClick={(e) => {
          e.stopPropagation();
          setBeneficiaryInfoListRowId(rowData.id);
          setIsBeneficiaryInfoList(true)
          setIsActionList(false);
        }}
      >
        <div className="tdinnerDiv">
          <span />
          <p>{rowData.drawer}</p>
        </div>
        {beneficiaryInfoListRowId === rowData.id && isBeneficiaryInfoList && (
          <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>

            {rowData.bfList.map((b) => (
              <div key={b.id} className={b.isBF && 'fb'}>
                <p><label>{b.isBF ? 'اسم المستفيد' : 'اسم الساحب'}</label>{b.name}</p>
                {b.isBF && <span>مستفيد أول</span>}
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
          setIsBeneficiaryInfoList(false)
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

  const cancelActionFn = ()=>{
    setShowDeletePopup(false)
  }
  const deleteFN = ()=>{}

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
        <Column selectionMode="multiple" header="" className="checkBoxCol" />
        <Column field="bankName" header="اسم البنك" className="columnStyle" />
        <Column field="branch" header="الفرع" className="columnStyle" />
        <Column
          field="chequeNumber"
          header="رقم الشيك"
          className="columnStyle"
        />
        <Column
          field="chequeValue"
          header="قيمة الشيك"
          className="columnStyle"
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
        <Column field="beneficiary" header="المستفيد" className="columnStyle" />

        <Column
          field="drawer"
          header="اسم المستفيد / الحساب / مصدر له"
          className="columnStyle"
          body={beneficiaryInfoTemplateList}
        />

        <Column body={attachmentTemplate}
          header="الملاحظات"
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

export default ChequeTableComponent;