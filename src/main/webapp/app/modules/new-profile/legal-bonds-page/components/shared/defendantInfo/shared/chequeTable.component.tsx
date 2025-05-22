import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ButtonComponent } from '@eachawy/frontend-library';
import { getFileSize, getFileType } from 'app/shared/util/utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import { deleteLegalBond } from '../../../legalBonds.reducer';


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

  const beneficiaryBody = (rowData: any) => {
    if (rowData?.legalBondParticipant?.length > 0) {
      return <span>مستفيد أول</span>
    } else {
      return <span>مجير له</span>
    }
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

  const beneficiaryInfoTemplateList = (rowData: any) => {
    if (rowData?.legalBondParticipant?.length > 0) {
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
            <p>{rowData?.chequeBeneficiaries[0]?.name + "/" + rowData?.legalBondParticipant[0]?.name}</p>
          </div>
          {beneficiaryInfoListRowId === rowData.id && isBeneficiaryInfoList && (
            <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>
              <div className={'fb'}>
                <p><label>اسم المستفيد</label>{rowData?.chequeBeneficiaries[0]?.name}</p>
                <span>مستفيد أول</span>
              </div>
              {rowData?.legalBondParticipant.map((b) => (

                <div key={b.id}>
                  <p><label>اسم الساحب</label>{b.name}</p>
                </div>
              ))}

            </div>
          )}
        </div>
      )
    } else {
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
            <p>{rowData?.chequeBeneficiaries[0]?.name + (rowData?.chequeBeneficiaries.length > 1 ? "/" + rowData?.chequeBeneficiaries[1].name : '')}</p>
          </div>
          {beneficiaryInfoListRowId === rowData.id && isBeneficiaryInfoList && (
            <div className="actionList _beneficiary" onClick={(e) => e.stopPropagation()}>
              <div className={'fb'}>
                <p><label>اسم المجير له</label>{rowData?.chequeBeneficiaries[0]?.name}</p>
                <span>مستفيد أول</span>
              </div>
              {rowData?.chequeBeneficiaries.map((b, index) => (
                <>
                  {index !== 0 && (
                    <div key={b.id}>
                      <p><label>اسم المجير له</label>{b.name}</p>
                    </div>
                  )}
                </>
              ))}

            </div>
          )}
        </div>
      )
    }
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
                props.editRecordDataFN('CHQ',rowData);
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
      type: "CHEQUE",
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
          <Column field={`bank.${$lang === 'en' ? 'arabicName' : 'englishName'}`} header="اسم البنك" className="columnStyle" />
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
          <Column field="beneficiary" header="المستفيد" className="columnStyle" body={beneficiaryBody} />

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

export default ChequeTableComponent;