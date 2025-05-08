/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { translate } from 'react-jhipster';
import ChequeTableComponent from './shared/chequeTable.component';
import DraftTableComponent from './shared/draftTable.component';
import DeclarationTableComponent from './shared/declarationTable.component';
import MortgageTableComponent from './shared/mortgageTable.component';
import StatementTableComponent from './shared/statementTable.component';
import RentTableComponent from './shared/rentTable.component';
import InvoiceTableComponent from './shared/invoiceTable.component';
const DefendantInfoComponent = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const [collectionFile, setCollectionFile] = useState(null);
  useEffect(() => {
    setCollectionFile(props.fileResponse?.collectionFile);
    if (collectionFile?.cheques?.length > 0) {
      setActiveTab("cheques");
    } 
    else if (collectionFile?.drafts?.length > 0) {
      setActiveTab("drafts");
    }
    else if (collectionFile?.invoices?.length > 0) {
      setActiveTab("invoice");
    }
    else if (collectionFile?.accountStatements?.length > 0) {
      setActiveTab("statement");
    }
    else if (collectionFile?.bonds.filter(item => item.category === 'NON_SCHEDULED').length > 0) {
      setActiveTab("mortgage");
    }
  }, [props.fileResponse, collectionFile]);

  return (
    <div className="defendantInfo">
      {collectionFile &&
        Object.values(collectionFile).some(value => Array.isArray(value) && value.length > 0) && (
          <>
            <h4>بيانات المدعي عليه التى تم إدخالها</h4>
            <div className="tabsRowAndActionBtnsDiv">
              <div className="actionTableBtnsDiv">
                <span>حذف الإختيارات</span>
                <span>حذف الكل</span>
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
                {collectionFile?.bonds.filter(item => item.category === 'NON_SCHEDULED').length > 0 && (
                  <div
                    className={`tab ${activeTab === "mortgage" ? "_active" : ""}`}
                    onClick={() => setActiveTab("mortgage")}
                  >
                    سند رهن ({collectionFile?.bonds.filter(item => item.category === 'NON_SCHEDULED').length})
                  </div>
                )}
                {/* <div
            className={`tab ${activeTab === "declaration" ? "_active" : ""}`}
            onClick={() => setActiveTab("declaration")}
          >
            اقرار خطي/ سند امانة (20)
          </div>
          
          
          <div
            className={`tab ${activeTab === "lease" ? "_active" : ""}`}
            onClick={() => setActiveTab("lease")}
          >
            عقد ايجار (20)
          </div>*/}
                {collectionFile?.accountStatements?.length > 0 && (
                  <div
                    className={`tab ${activeTab === "statement" ? "_active" : ""}`}
                    onClick={() => setActiveTab("statement")}
                  >
                    كشف حساب ({collectionFile?.accountStatements?.length})
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

      {activeTab === "cheques" ? <ChequeTableComponent chequesList={collectionFile?.cheques} /> : null}
      {activeTab === "drafts" ? <DraftTableComponent draftsList={collectionFile?.drafts} /> : null}
      {/* {activeTab === "declaration" ? <DeclarationTableComponent /> : null} */}
      {activeTab === "mortgage" ? <MortgageTableComponent mortageBondsList={collectionFile?.bonds.filter(item => item.category === 'NON_SCHEDULED')} /> : null}
      {/* {activeTab === "lease" ? <RentTableComponent /> : null}*/}
      {activeTab === "statement" ? <StatementTableComponent accountStatementsList={collectionFile?.accountStatements} /> : null}
      {activeTab === "invoice" ? <InvoiceTableComponent invoicesList={collectionFile?.invoices} /> : null}

    </div>
  );
};

export default DefendantInfoComponent;
