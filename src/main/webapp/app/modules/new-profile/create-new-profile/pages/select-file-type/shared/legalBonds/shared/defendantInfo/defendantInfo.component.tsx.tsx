import React, { useEffect, useState } from "react";
import { translate } from "react-jhipster";
import ChequeTableComponent from "./shared/chequeTable.component";
import PromissoryTableComponent from "./shared/promissoryTable.component";
const DefendantInfoComponent = (props) => {
  const [activeTab, setActiveTab] = useState("cheque");
  return (
    <div className="defendantInfo">
      <h4>بيانات المدعي عليه التى تم إدخالها</h4>

      <div className="tabsRowAndActionBtnsDiv">
        <div className="actionTableBtnsDiv">
          <span>حذف الإختيارات</span>
          <span>حذف الكل</span>
        </div>
        <div className="tabsRowDiv">
          <div
            className={`tab ${activeTab === "cheque" ? "_active" : ""}`}
            onClick={() => setActiveTab("cheque")}
          >
            شيك (20)
          </div>
          <div
            className={`tab ${activeTab === "promissory" ? "_active" : ""}`}
            onClick={() => setActiveTab("promissory")}
          >
            كمبيالة (30)
          </div>
          <div
            className={`tab ${activeTab === "declaration" ? "_active" : ""}`}
            onClick={() => setActiveTab("declaration")}
          >
            اقرار خطي/ سند امانة (20)
          </div>
          <div
            className={`tab ${activeTab === "mortgage" ? "_active" : ""}`}
            onClick={() => setActiveTab("mortgage")}
          >
            سند رهن (30)
          </div>
          <div
            className={`tab ${activeTab === "statement" ? "_active" : ""}`}
            onClick={() => setActiveTab("statement")}
          >
            كشف حساب (30)
          </div>
          <div
            className={`tab ${activeTab === "lease" ? "_active" : ""}`}
            onClick={() => setActiveTab("lease")}
          >
            عقد ايجار (20)
          </div>
          <div
            className={`tab ${activeTab === "invoice" ? "_active" : ""}`}
            onClick={() => setActiveTab("invoice")}
          >
            فاتوره (20)
          </div>
        </div>
      </div>

      {activeTab === "cheque" ? <ChequeTableComponent /> : null}
      {activeTab === "promissory" ? <PromissoryTableComponent /> : null}
    </div>
  );
};

export default DefendantInfoComponent;
