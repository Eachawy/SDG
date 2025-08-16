export const CURRENT_MONTH = new Date().toLocaleString('en-US', { month: 'long' });
export const previousMonthDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
export const PREV_MONTH = previousMonthDate.toLocaleString('en-US', { month: 'long' });

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

export const FileStatues = [
    {
        name: { en: 'Completed', ar: 'مكتمل' },
        code: 'COMPLETED'
    },
    {
        name: { en: 'In Complete', ar: 'غير مكتمل' },
        code: 'INCOMPLETE'
    },
    {
        name: { en: 'Closed', ar: 'مغلق' },
        code: 'CLOSED'
    },
    {
        name: { en: 'Active', ar: 'فعال' },
        code: 'ACTIVE'
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
    { name: { ar: "كمبيالة", en: "Draft" }, code: "DR" },
    { name: { ar: "اقرار خطي/ سند امانة", en: "Written Consent / Trust Bond" }, code: "WTB" },
    { name: { ar: "سند رهن", en: "Mortgage Bond" }, code: "MB" },
    { name: { ar: "كشف حساب", en: "Account Statement" }, code: "AS" },
    { name: { ar: "عقد ايجار", en: "Rent Contract" }, code: "RC" },
    { name: { ar: "فاتوره", en: "Invoice" }, code: "INV" },
];

export const ChequeBeneficiaryList = [
    { name: { ar: "مستفيد اول", en: "First Beneficiary" }, code: "FB" },
    { name: { ar: "مجير له", en: "Authorized Party" }, code: "AP" },
];

export const TrustWrittenList = [
    { name: { ar: "سند أمانة", en: "Trust Bond" }, code: "TRUST_BOND" },
    { name: { ar: "اقرار خطي", en: "Written Consent" }, code: "WRITTEN_CONSENT" }
];

export const TrustWrittenObj = {
    WRITTEN_CONSENT: {
        name: { en: 'Written Consent', ar: 'اقرار خطي' }
    },
    TRUST_BOND: {
        name: { en: 'Trust Bond', ar: 'سند أمانة' }
    }
}

export const PaymentTypesObj = {
    MONTHLY: {
        name: { en: 'Monthly', ar: 'شهري' }
    },
    QUARTERLY: {
        name: { en: 'Quarterly', ar: 'ربع سنوي' }
    },
    HALF_YEARLY: {
        name: { en: 'Half Yearly', ar: 'نص سنوي' }
    },
    YEARLY: {
        name: { en: 'Yearly', ar: 'سنوي' }
    }
}