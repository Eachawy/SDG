import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { set } from "lodash";

const ChequeTableComponent = () => {
  const [selectedCheques, setSelectedCheques] = useState([]);
  const [actionRowId, setActionRowId] = useState<number | null>(null);
  const [isActionList, setIsActionList] = useState(false);

  const chequeData = [
    {
      id: 1,
      bankName: "البنك العربي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
    {
      id: 2,
      bankName: "بنك أبوظبي عمان",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
    {
      id: 3,
      bankName: "بنك المشرق",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
    {
      id: 4,
      bankName: "بنك دبي الإسلامي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
    {
      id: 5,
      bankName: "بنك الشارقة",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
    {
      id: 6,
      bankName: "بنك الاتحاد الوطني",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
    {
      id: 7,
      bankName: "بنك رأس الخيمة",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
    {
      id: 8,
      bankName: "بنك أبوظبي الأول",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
    {
      id: 9,
      bankName: "بنك الإمارات الإسلامي",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
    {
      id: 10,
      bankName: "بنك أبوظبي التجاري",
      branch: "الشارقة",
      chequeNumber: "12345678912345",
      chequeValue: "35,000",
      dueDate: "29-09-2025",
      returnDate: "29-09-2025",
      beneficiary: "مستفيد أول",
      drawer: "محمد عبدالله رشاد",
      remarks: "عرض",
    },
  ];

  const onChangeSelection = (e) => {
    setSelectedCheques(e.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".action-column")) {
        setIsActionList(false);
        setActionRowId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="action-column"
        onClick={
          (e) => {
            e.stopPropagation()
            setActionRowId(rowData.id);
            setIsActionList(true);
          }}
      >
        <span
          className="dots-menu"
        >
        </span>
        {actionRowId === rowData.id && isActionList && (
          <div className="actionList" onClick={(e) => e.stopPropagation()}>
            <span onClick={() => {setIsActionList(false)}}>تعديل</span>
            <span onClick={() => {setIsActionList(false)}}>حذف</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="cheque-table-container">
      <DataTable
        value={chequeData}
        selectionMode="multiple"
        selection={selectedCheques}
        onSelectionChange={onChangeSelection}
        dataKey="id"
        paginator
        rows={5}
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
        />
        <Column field="remarks" header="الملاحظات" className="columnStyle" />
        <Column body={actionBodyTemplate} className="columnStyle" />
      </DataTable>
    </div>
  );
};

export default ChequeTableComponent;
