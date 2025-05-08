import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonComponent } from '@eachawy/frontend-library';
import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { getFileSize, getFileType } from 'app/shared/util/utils';


const ChequeTableComponent = (props) => {
  const [selectedCheques, setSelectedCheques] = useState([]);
  const [actionRowId, setActionRowId] = useState<number | null>(null);
  const [isActionList, setIsActionList] = useState(false);
  const [isBeneficiaryInfoList, setIsBeneficiaryInfoList] = useState(false);
  const [beneficiaryInfoListRowId, setBeneficiaryInfoListRowId] = useState<number | null>(null);
  const [attachmentTamplateListRowId, setAttachmentTamplateListRowId] = useState<number | null>(null)
  const [isAttachmentTamplateList, setIsAttachmentTamplateList] = useState(false)
  const [selectedAttachmentCard, setSelectedAttachmentCard] = useState(0)
  const [selectedAttachmentFilePath, setSelectedAttachmentFilePath] = useState('')
  const [showDeletePopup, setShowDeletePopup] = useState(false);


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
            setSelectedAttachmentFilePath(rowData.attachments[0].content);

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

  const cancelActionFn = () => {
    setShowDeletePopup(false)
  }

  const deleteFN = () => { }

  return (
    <div className="table-container">
      <DataTable
        value={props.chequesList}
        selectionMode="multiple"
        selection={selectedCheques}
        onSelectionChange={onChangeSelection}
        dataKey="id"
        className="custom-table"
        paginator
        rows={5}
      >
        <Column selectionMode="multiple" header="" className="checkBoxCol" />
        <Column field="bank" header="اسم البنك" className="columnStyle" />
        <Column
          field="chequeNumber"
          header="رقم الشيك"
          className="columnStyle"
        />
        <Column
          field="totalAmount"
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
          header="اسم المستفيد / الساحب / مجير له"
          className="columnStyle"
          body={beneficiaryInfoTemplateList}
        />

        <Column body={attachmentTemplate}
          header="الملاحظات"
          className="columnStyle attachmentCol"
        />

        <Column body={actionBodyTemplate} className="columnStyle" />
      </DataTable>

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