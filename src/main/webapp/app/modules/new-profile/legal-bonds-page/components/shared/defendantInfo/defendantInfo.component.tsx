/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import ChequeTableComponent from './shared/chequeTable.component';
import DraftTableComponent from './shared/draftTable.component';
import MortgageTableComponent from './shared/mortgageTable.component';
import StatementTableComponent from './shared/statementTable.component';
import RentTableComponent from './shared/rentTable.component';
import InvoiceTableComponent from './shared/invoiceTable.component';
import WrittenTrustBondTableComponent from './shared/writtenTrustBonds.component';
import { deleteLegalBond } from '../../legalBonds.reducer';
import LoaderComponent from 'app/shared/components/loaderComponent/loaderComponent';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ButtonComponent } from '@eachawy/frontend-library';
const DefendantInfoComponent = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [collectionFile, setCollectionFile] = useState(null);
  const [writtenTrustBonds, setWrittenTrustBonds] = useState([]);

  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useAppDispatch();
  const $deleteLegalBondResponse = useAppSelector(state => state.legalBonds.deleteLegalBondResponse);


  useEffect(() => {
    setCollectionFile(props.fileResponse?.collectionFile);
    if (props.fileResponse?.collectionFile?.bonds.length > 0) {
      const writtenTrustBondsList = props.fileResponse?.collectionFile?.bonds.filter(item => {
        return (item.bondType === 'WRITTEN_CONSENT' || item.bondType === 'TRUST_BOND')
      })
      setWrittenTrustBonds(writtenTrustBondsList);
    } else {
      setWrittenTrustBonds([]);
    }
    if (collectionFile?.cheques?.length > 0) {
      setActiveTab("cheques");
    }
    else if (collectionFile?.drafts?.length > 0) {
      setActiveTab("drafts");
    }
    else if (writtenTrustBonds.length > 0) {
      setActiveTab("writtenTrustBonds");
    }
    else if (collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').length > 0) {
      setActiveTab("mortgage");
    }
    else if (collectionFile?.accountStatements?.length > 0) {
      setActiveTab("statement");
    }
    else if (collectionFile?.rentContracts?.length > 0) {
      setActiveTab("rentContract");
    }
    else if (collectionFile?.invoices?.length > 0) {
      setActiveTab("invoice");
    }

  }, [props.fileResponse, collectionFile]);

  useEffect(() => {
    if ($deleteLegalBondResponse?.status === 204) {
      setShowDeletePopup(false);
      props.deleteIsDone();
    }

  }, [$deleteLegalBondResponse])

  const deleteAllRows = async () => {
    setShowLoader(true);
    let obj: any = {}
    switch (activeTab) {
      case 'cheques':
        if (collectionFile?.cheques.length > 0) {
          obj = {
            type: "CHEQUE",
            ids: collectionFile?.cheques.map(item => item.id)
          }
        }
        break;
      case 'drafts':
        if (collectionFile?.drafts.length > 0) {
          obj = {
            type: "DRAFT",
            ids: collectionFile?.drafts.map(item => item.id)
          }
        }
        break;
      case 'invoice':
        if (collectionFile?.invoices.length > 0) {
          obj = {
            type: "INVOICE",
            ids: collectionFile?.invoices.map(item => item.id)
          }
        }
        break;
      case 'statement':
        if (collectionFile?.accountStatements.length > 0) {
          obj = {
            type: "ACCOUNT_STATEMENT",
            ids: collectionFile?.accountStatements.map(item => item.id)
          }
        }
        break;
      case 'rentContract':
        if (collectionFile?.rentContracts.length > 0) {
          obj = {
            type: "RENT_CONTRACT",
            ids: collectionFile?.rentContracts.map(item => item.id)
          }
        }
        break;
      case 'mortgage':
        if (collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').length > 0) {
          obj = {
            type: "MORTGAGE_BOND",
            ids: collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').map(item => item.id)
          }
        }
        break;
      case 'writtenTrustBonds':
        deleteAllWrittenTrustBonds();
        return
      default:
        break;
    }

    await dispatch(deleteLegalBond(obj));
    setShowLoader(false);
  }

  const deleteAllWrittenTrustBonds = async () => {
    setShowLoader(true);
    const trustBondsList = collectionFile?.bonds.filter(item => item.bondType === 'TRUST_BOND');
    const writtenConsentList = collectionFile?.bonds.filter(item => item.bondType === 'WRITTEN_CONSENT');

    if (trustBondsList.length > 0) {
      const obj = {
        type: "TRUST_BOND",
        ids: trustBondsList.map(item => item.id)
      }
      await dispatch(deleteLegalBond(obj));
    }

    if (writtenConsentList.length > 0) {
      const obj = {
        type: "WRITTEN_CONSENT",
        ids: writtenConsentList.map(item => item.id)
      }
      setTimeout(async () => {
        await dispatch(deleteLegalBond(obj));
      }, 100);
    }

    setShowLoader(false);
  }

  return (
    <div className="defendantInfo">
      {collectionFile &&
        Object.values(collectionFile).some(value => Array.isArray(value) && value.length > 0) && (
          <>
            <h4>بيانات المدعي عليه التى تم إدخالها</h4>
            <div className="tabsRowAndActionBtnsDiv">
              <div className="actionTableBtnsDiv">
                <span>حذف الإختيارات</span>
                <span onClick={() => setShowDeletePopup(true)}>حذف الكل</span>
              </div>
              <div className="tabsRowDiv">
                {collectionFile?.cheques?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "cheques" ? "_active" : ""}`}
                    onClick={() => setActiveTab("cheques")}
                  >
                    شيك ({collectionFile?.cheques?.length})
                  </div>
                )}
                {collectionFile?.drafts?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "drafts" ? "_active" : ""}`}
                    onClick={() => setActiveTab("drafts")}
                  >
                    كمبيالة ({collectionFile?.drafts?.length})
                  </div>
                )}
                {writtenTrustBonds?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "writtenTrustBonds" ? "_active" : ""}`}
                    onClick={() => setActiveTab("writtenTrustBonds")}
                  >
                    اقرار خطي/ سند امانة ({writtenTrustBonds?.length})
                  </div>
                )}

                {collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').length > 0 && (
                  <div
                    className={`tab ${activeTab === "mortgage" ? "_active" : ""}`}
                    onClick={() => setActiveTab("mortgage")}
                  >
                    سند رهن ({collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').length})
                  </div>
                )}
                {collectionFile?.accountStatements?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "statement" ? "_active" : ""}`}
                    onClick={() => setActiveTab("statement")}
                  >
                    كشف حساب ({collectionFile?.accountStatements?.length})
                  </div>
                )}
                {collectionFile?.rentContracts?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "rentContract" ? "_active" : ""}`}
                    onClick={() => setActiveTab("rentContract")}
                  >
                    عقد ايجار ({collectionFile?.rentContracts?.length})
                  </div>
                )}
                {collectionFile?.invoices?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "invoice" ? "_active" : ""}`}
                    onClick={() => setActiveTab("invoice")}
                  >
                    فاتوره ({collectionFile?.invoices?.length})
                  </div>
                )}
              </div>
            </div>
          </>
        )}

      {activeTab === "cheques" ? collectionFile?.cheques.length > 0 &&
        <ChequeTableComponent
          chequesList={collectionFile?.cheques}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
        />
        : null}

      {activeTab === "drafts" ? collectionFile?.drafts.length > 0 &&
        <DraftTableComponent
          draftsList={collectionFile?.drafts}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
        />
        : null}

      {activeTab === "writtenTrustBonds" ?
        (collectionFile?.bonds.filter(item => item.bondType === 'WRITTEN_CONSENT').length > 0 || collectionFile?.bonds.filter(item => item.bondType === 'TRUST_BOND').length > 0)
        && <WrittenTrustBondTableComponent 
              writtenTrustBondsList={writtenTrustBonds} 
              deleteIdDoneFn={() => props.deleteIsDone()} 
              editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
            /> 
        : null}

      {activeTab === "mortgage" ?
        collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').length > 0
        && <MortgageTableComponent
          mortageBondsList={collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND')}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
        />
        : null}

      {activeTab === "rentContract" ? collectionFile?.rentContracts.length > 0 &&
        <RentTableComponent
          rentContractList={collectionFile}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
        />
        : null}

      {activeTab === "statement" ? collectionFile?.accountStatements.length > 0 &&
        <StatementTableComponent
          accountStatementsList={collectionFile?.accountStatements}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)} /> :
        null}

      {activeTab === "invoice" ? collectionFile?.invoices.length > 0 &&
        <InvoiceTableComponent
          invoicesList={collectionFile?.invoices}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)} />
        : null}

      <LoaderComponent show={showLoader} />
      {showDeletePopup && (
        <div className='deletePopupContainer'>
          <div className='dialogBoxContent'>
            <h4>هل أنت متأكد أنك تريد حذف البيانات الموجودة</h4>
            <p>في حاله تاكيد الحذف سوف يتم حذف جميع البيانات ولا يمكن التراجع عن هذا الإجراء.</p>
            <div className="actionRowBtns">
              <ButtonComponent Class={'BtnStyle '} onClick={() => setShowDeletePopup(false)}>
                لا اريد الحذف
              </ButtonComponent>
              <ButtonComponent onClick={deleteAllRows} Class={'BtnStyle BtnCancel'}>
                نعم اريد الحذف
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefendantInfoComponent;
