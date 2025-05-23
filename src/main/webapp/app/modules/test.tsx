import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";


const TestPage = () => {

    const [actionRowId, setActionRowId] = React.useState<number | null>(null);
    const [isActionList, setIsActionList] = React.useState(false);
    const [table, setTable]: any = React.useState(
        {
            "id": 76,
            "fileNumber": 1075,
            "issueDate": "2025-05-24",
            "arabicName": null,
            "englishName": null,
            "fileType": "COLLECTION",
            "status": "COMPLETED",
            "vip": false,
            "collectionFile": {
                "id": 48,
                "totalAmount": 20000,
                "currency": "JOD",
                "requiredCollectionAmount": 15000,
                "cheques": [],
                "drafts": [],
                "bonds": [],
                "accountStatements": [],
                "rentContracts": [],
                "invoices": [
                    {
                        "id": 27,
                        "totalAmount": 15000,
                        "currency": "JOD",
                        "invoiceDate": "2025-05-30",
                        "invoiceNumber": "2342342423",
                        "collectionFile": null,
                        "attachments": [
                            {
                                "id": 641,
                                "attachmentType": "INVOICE",
                                "name": "dropdown_arrow.svg",
                                "content": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDExIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNMTAgMS43NUw1LjUgNi4yNUwxIDEuNzUiIHN0cm9rZT0iIzUyNTI1QiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjwvc3ZnPg0K",
                                "mimeType": "PDF",
                                "masterFile": null,
                                "cheque": null,
                                "draft": null,
                                "bond": null,
                                "accountStatement": null,
                                "invoice": null,
                                "rentContract": null,
                                "courtCaseFile": null
                            }
                        ]
                    }
                ]
            },
            "courtCaseFile": {
                "id": null,
                "requiredAmount": null,
                "currency": null,
                "opponentCategory": null,
                "caseNumber": null,
                "registrationDate": null,
                "attachments": null,
                "court": null,
                "judge": null,
                "caseType": null
            },
            "person": {
                "id": 3,
                "nameArabic": null,
                "nameEnglish": null,
                "nationalId": null,
                "addressOne": null,
                "addressTwo": null,
                "mobileOne": null,
                "mobileTwo": null,
                "mobileThree": null,
                "email": null
            },
            "masterFile": {
                "id": 107,
                "fileNumber": null,
                "company": null,
                "arabicName": null,
                "englishName": null,
                "ssn": null,
                "address": null,
                "email": null,
                "mobileNumber": null,
                "status": null,
                "attachments": null
            }
        }
    );
    const [selectedCheques, setSelectedCheques] = React.useState([]);

    const onChangeSelection = (e) => {
        console.log(e);
        setSelectedCheques(e.value);
    };


    const actionBodyTemplate = (rowData: any) => {
        return (
            <div
                className="action-column"
                onClick={(e) => {
                    e.stopPropagation();
                    setActionRowId(rowData.id);
                    setIsActionList(true);
                }}
            >
                list
                {actionRowId === rowData.id && isActionList && (
                    <div className="actionList" onClick={(e) => e.stopPropagation()}>
                        <span
                            onClick={() => console.log('تعديل')}
                        >
                            تعديل
                        </span>
                        <span
                            onClick={() => console.log('حذف')}
                        >
                            حذف
                        </span>
                    </div>
                )}
            </div>
        );
    };


    return (
        <>

            <DataTable
                value={table?.collectionFile?.invoices}
                selectionMode="multiple"
                selection={selectedCheques}
                onSelectionChange={onChangeSelection}
                dataKey="id"
                className="custom-table"
                paginator
                rows={10}
            >
                <Column selectionMode="multiple" header="" style={{ width: "30px" }} className="checkBoxCol" />

                <Column
                    field="invoiceNumber"
                    header="رقم الفاتورة"
                    className="columnStyle" />

                <Column
                    field="invoiceDate"
                    header="تاريخ الفاتورة"
                    className="columnStyle" />

                <Column
                    field="totalAmount"
                    header="قيمة الفاتورة"
                    className="columnStyle"
                // body={totalAmountBody}
                />

                <Column
                    // body={attachmentTemplate}
                    header="المرفقات"
                    className="columnStyle attachmentCol"
                />

                <Column body={actionBodyTemplate} className="columnStyle actionCol" />
            </DataTable>
        </>
    );
}

export default TestPage;