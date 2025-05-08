export const FileTypes = [
    {
        name: { en: 'Urgent Request', ar: 'طلب مستعجل' },
        code: 'URGENT_REQUEST'
    },
    {
        name: { en: 'Law Suits', ar: 'قضايا' },
        code: 'COURT_CASE'
    },
    {
        name: { en: 'Collection', ar: 'تحصيل' },
        code: 'COLLECTION'
    }
]

export const OpponentCategories = [
    {
        name: { en: 'Respondent', ar: 'المدعى عليه' },
        code: 'RESPONDENT'
    },
    {
        name: { en: 'Accused', ar: 'المشتكي عليه' },
        code: 'ACCUSED'
    },
]

export const CurrencyList = [
    { name: { ar: "دينار اردني", en: "Jordanian Dinar" }, code: "JOD" },
    { name: { ar: "دولار امريكي", en: "US Dollar" }, code: "USD" },
    { name: { ar: "درهم امراتي", en: "UAE Dirham" }, code: "AED" },
]

export const BondTypes = [
    { name: { ar: "شيك", en: "Cheque" }, code: "CHQ" },
    { name: { ar: "كمبيالة", en: "Draft" }, code: "PN" },
    // {
    //     name: {
    //         ar: "اقرار خطي/ سند امانة",
    //         en: "Written Acknowledgment / Trust Bond",
    //     },
    //     code: "WTB",
    // },
    { name: { ar: "سند رهن", en: "Mortgage Bond" }, code: "MB" },
    { name: { ar: "كشف حساب", en: "Account Statement" }, code: "AS" },
    // { name: { ar: "عقد ايجار", en: "Rent Contract" }, code: "LC" },
    { name: { ar: "فاتوره", en: "Invoice" }, code: "INV" },
];

export const ChequeBeneficiaryList = [
    { name: { ar: "مستفيد اول", en: "First Beneficiary" }, code: "FB" },
    { name: { ar: "مجير له", en: "Authorized Party" }, code: "AP" },
];