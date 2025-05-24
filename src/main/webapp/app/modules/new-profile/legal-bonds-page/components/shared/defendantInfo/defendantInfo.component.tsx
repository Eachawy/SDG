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
import DeleteRowPopup from 'app/shared/components/deleteRowPopup.Component/deleteRowPopup.Component';
import { Storage } from "react-jhipster";

const DefendantInfoComponent = (props) => {
  const [activeTab, setActiveTab] = useState(Storage.session.get('SDC') !== undefined ? Storage.session.get('SDC')['type'] : '');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [collectionFile, setCollectionFile] = useState(null);
  const [writtenTrustBonds, setWrittenTrustBonds] = useState([]);
  const [deleteType, setDeleteType] = useState('');
  const [selectedRowsDelete, setSelectedRowsDelete] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useAppDispatch();
  const $deleteLegalBondResponse = useAppSelector(state => state.legalBonds.deleteLegalBondResponse);


  useEffect(() => {
    setCollectionFile(props.fileResponse?.collectionFile);
    if (props.fileResponse?.collectionFile?.bonds?.length > 0) {
      const writtenTrustBondsList = props.fileResponse?.collectionFile?.bonds.filter(item => {
        return (item.bondType === 'WRITTEN_CONSENT' || item.bondType === 'TRUST_BOND')
      })
      setWrittenTrustBonds(writtenTrustBondsList);
    } else {
      setWrittenTrustBonds([]);
    }

    if (activeTab === '') {
      if (collectionFile?.cheques?.length > 0) {
        setActiveTabFn("cheques");
      }
      else if (collectionFile?.drafts?.length > 0) {
        setActiveTabFn("drafts");
      }
      else if (writtenTrustBonds.length > 0) {
        setActiveTabFn("writtenTrustBonds");
      }
      else if (collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').length > 0) {
        setActiveTabFn("mortgage");
      }
      else if (collectionFile?.accountStatements?.length > 0) {
        setActiveTabFn("statement");
      }
      else if (collectionFile?.rentContracts?.length > 0) {
        setActiveTabFn("rentContract");
      }
      else if (collectionFile?.invoices?.length > 0) {
        setActiveTabFn("invoice");
      }
    }
  }, [props.fileResponse, collectionFile]);

  useEffect(() => {
    if ($deleteLegalBondResponse?.status === 204) {
      setShowDeletePopup(false);
      setSelectedRowsDelete([]);
      setDeleteType('');
      props.deleteIsDone();
    }

  }, [$deleteLegalBondResponse]);

  const setActiveTabFn = (tab) => {
    setSelectedRowsDelete([]);
    setDeleteType('');
    setActiveTab(tab);
    Storage.session.set("SDC", {
      "type": tab
    });
  }

  const deleteRows = async () => {
    setShowLoader(true);
    let obj: any = {}
    switch (activeTab) {
      case 'cheques':
        if (collectionFile?.cheques?.length > 0) {
          obj = {
            type: "CHEQUE",
            ids: deleteType === 'SELECTED' ? selectedRowsDelete : deleteType === 'ALL' ? collectionFile?.cheques.map(item => item.id) : []
          }
        }
        break;
      case 'drafts':
        if (collectionFile?.drafts?.length > 0) {
          obj = {
            type: "DRAFT",
            ids: deleteType === 'SELECTED' ? selectedRowsDelete : deleteType === 'ALL' ? collectionFile?.drafts.map(item => item.id) : []
          }
        }
        break;
      case 'invoice':
        if (collectionFile?.invoices?.length > 0) {
          obj = {
            type: "INVOICE",
            ids: deleteType === 'SELECTED' ? selectedRowsDelete : deleteType === 'ALL' ? collectionFile?.invoices.map(item => item.id) : []
          }
        }
        break;
      case 'statement':
        if (collectionFile?.accountStatements?.length > 0) {
          obj = {
            type: "ACCOUNT_STATEMENT",
            ids: deleteType === 'SELECTED' ? selectedRowsDelete : deleteType === 'ALL' ? collectionFile?.accountStatements.map(item => item.id) : []
          }
        }
        break;
      case 'rentContract':
        if (collectionFile?.rentContracts?.length > 0) {
          obj = {
            type: "RENT_CONTRACT",
            ids: deleteType === 'SELECTED' ? selectedRowsDelete : deleteType === 'ALL' ? collectionFile?.rentContracts.map(item => item.id) : []
          }
        }
        break;
      case 'mortgage':
        if (collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND')?.length > 0) {
          obj = {
            type: "MORTGAGE_BOND",
            ids: deleteType === 'SELECTED' ? selectedRowsDelete : deleteType === 'ALL' ? collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').map(item => item.id) : []
          }
        }
        break;
      case 'writtenTrustBonds':
        deleteWrittenTrustBonds();
        return
      default:
        break;
    }
    await dispatch(deleteLegalBond(obj));
    setShowLoader(false);
  }

  const deleteWrittenTrustBonds = async () => {
    setShowLoader(true);
    const trustBondsList = collectionFile?.bonds.filter(item => item.bondType === 'TRUST_BOND');
    const writtenConsentList = collectionFile?.bonds.filter(item => item.bondType === 'WRITTEN_CONSENT');
    const selectedTrustBondsIds = selectedRowsDelete.filter(item => item.bondType === 'TRUST_BOND');
    const selectedWrittenConsentIds = selectedRowsDelete.filter(item => item.bondType === 'WRITTEN_CONSENT');

    if (trustBondsList?.length > 0) {
      const obj = {
        type: "TRUST_BOND",
        ids: deleteType === 'SELECTED' ? selectedTrustBondsIds.map(item => item.id) : deleteType === 'ALL' ? trustBondsList.map(item => item.id) : []
      }
      if ((deleteType === 'ALL' && trustBondsList?.length > 0) ||
        (deleteType === 'SELECTED' && selectedTrustBondsIds.length > 0)) {
        await dispatch(deleteLegalBond(obj));
      }
    }

    if (writtenConsentList?.length > 0) {
      const obj = {
        type: "WRITTEN_CONSENT",
        ids: deleteType === 'SELECTED' ? selectedWrittenConsentIds.map(item => item.id) : deleteType === 'ALL' ? writtenConsentList.map(item => item.id) : []
      }
      setTimeout(async () => {
        if ((deleteType === 'ALL' && writtenConsentList?.length > 0) ||
          (deleteType === 'SELECTED' && selectedWrittenConsentIds.length > 0)) {
          await dispatch(deleteLegalBond(obj));
        }
      }, 500);
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
                {selectedRowsDelete?.length > 0 && (
                  <span onClick={() => {
                    setDeleteType('SELECTED');
                    setShowDeletePopup(true);
                  }}>حذف الإختيارات</span>
                )}
                <span onClick={() => {
                  setDeleteType('ALL');
                  setSelectedRowsDelete([]);
                  setShowDeletePopup(true);
                }}>حذف الكل</span>
              </div>
              <div className="tabsRowDiv">
                {collectionFile?.cheques?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "cheques" ? "_active" : ""}`}
                    onClick={() => { setActiveTabFn("cheques") }}
                  >
                    شيك ({collectionFile?.cheques?.length})
                  </div>
                )}
                {collectionFile?.drafts?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "drafts" ? "_active" : ""}`}
                    onClick={() => setActiveTabFn("drafts")}
                  >
                    كمبيالة ({collectionFile?.drafts?.length})
                  </div>
                )}
                {writtenTrustBonds?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "writtenTrustBonds" ? "_active" : ""}`}
                    onClick={() => setActiveTabFn("writtenTrustBonds")}
                  >
                    اقرار خطي/ سند امانة ({writtenTrustBonds?.length})
                  </div>
                )}

                {collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').length > 0 && (
                  <div
                    className={`tab ${activeTab === "mortgage" ? "_active" : ""}`}
                    onClick={() => setActiveTabFn("mortgage")}
                  >
                    سند رهن ({collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').length})
                  </div>
                )}
                {collectionFile?.accountStatements?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "statement" ? "_active" : ""}`}
                    onClick={() => setActiveTabFn("statement")}
                  >
                    كشف حساب ({collectionFile?.accountStatements?.length})
                  </div>
                )}
                {collectionFile?.rentContracts?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "rentContract" ? "_active" : ""}`}
                    onClick={() => setActiveTabFn("rentContract")}
                  >
                    عقد ايجار ({collectionFile?.rentContracts?.length})
                  </div>
                )}
                {collectionFile?.invoices?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "invoice" ? "_active" : ""}`}
                    onClick={() => setActiveTabFn("invoice")}
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
          setSelectedRowsFn={(ids) => setSelectedRowsDelete(ids)}
        />
        : null}

      {activeTab === "drafts" ? collectionFile?.drafts.length > 0 &&
        <DraftTableComponent
          draftsList={collectionFile?.drafts}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
          setSelectedRowsFn={(ids) => setSelectedRowsDelete(ids)}
        />
        : null}

      {activeTab === "writtenTrustBonds" ?
        (props.fileResponse?.collectionFile?.bonds.filter(item => item.bondType === 'WRITTEN_CONSENT').length > 0 || props.fileResponse?.collectionFile?.bonds.filter(item => item.bondType === 'TRUST_BOND').length > 0)
        && <WrittenTrustBondTableComponent
          writtenTrustBondsList={writtenTrustBonds}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
          setSelectedRowsFn={(rows) => setSelectedRowsDelete(rows)}
        />
        : null}

      {activeTab === "mortgage" ?
        collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND').length > 0
        && <MortgageTableComponent
          mortageBondsList={collectionFile?.bonds.filter(item => item.bondType === 'MORTGAGE_BOND')}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
          setSelectedRowsFn={(ids) => setSelectedRowsDelete(ids)}
        />
        : null}

      {activeTab === "rentContract" ? collectionFile?.rentContracts.length > 0 &&
        <RentTableComponent
          rentContractList={collectionFile}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
          setSelectedRowsFn={(ids) => setSelectedRowsDelete(ids)}
        />
        : null}

      {activeTab === "statement" ? collectionFile?.accountStatements.length > 0 &&
        <StatementTableComponent
          accountStatementsList={collectionFile?.accountStatements}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
          setSelectedRowsFn={(ids) => setSelectedRowsDelete(ids)}
        />
        : null}

      {activeTab === "invoice" ? collectionFile?.invoices.length > 0 &&
        <InvoiceTableComponent
          invoicesList={collectionFile?.invoices}
          deleteIdDoneFn={() => props.deleteIsDone()}
          editRecordDataFN={(type, obj) => props.editRecordData(type, obj)}
          setSelectedRowsFn={(ids) => setSelectedRowsDelete(ids)}
        />
        : null}

      <LoaderComponent show={showLoader} />

      {showDeletePopup && (
        <DeleteRowPopup cancelPopup={() => setShowDeletePopup(false)} deleteFN={deleteRows} />
      )}

    </div>
  );
};

export default DefendantInfoComponent;
