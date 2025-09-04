import { ButtonComponent, DropDownComponent, InputComponent } from '@eachawy/frontend-library';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React from 'react';
import { useForm } from 'react-hook-form';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { DailyFollowUpsFileSearch } from 'app/modules/dashboard/components/daily-follow-ups-file-search/daily-follow-ups-file-search';
import { DashboardCard } from 'app/modules/dashboard/components/dashboard-card/dashboard-card';
import { DailyFollowUpsFileTable } from 'app/modules/dashboard/components/daily-follow-ups-file-table/daily-follow-ups-file-table';
import { DailyFollowUpsGridView } from '../../components/daily-follow-ups-grid-view/daily-follow-ups-grid-view';

const DailyFollowUps = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [boxesData, setBoxesData] = React.useState<any>(null);
    const [selectedView, setSelectedView] = React.useState<"table" | "grid">("grid");
    const $lang = useAppSelector((state) => state.locale.currentLocale);

    const { register, formState: { errors }, watch, setValue, getValues } = useForm({ mode: "onTouched" });
    const followUpTypeList = [
        { name: { en: 'Collection', ar: 'تحصيل', code: 'CT' } },
        { name: { en: 'Follow up Type', ar: 'نوع المتابعة', code: 'CT1' } },
    ]

    const fileTypeList = [
        { name: { en: 'Accounts Department', ar: 'قسم الحسابات', code: 'AD' } },
        { name: { en: 'File Type', ar: 'نوع الملف', code: 'AD1' } },
    ]

    const dataList = [
        {
            "id": 1,
            "lawsuitNo": "FILE-2024-001",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "منى مصطفى",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": " 6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 2,
            "lawsuitNo": "FILE-2024-002",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "أحمد علي",
            "followUpStatus": {
                "fileStatus": "completed",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 3,
            "lawsuitNo": "FILE-2024-003",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "سارة حسن",
            "followUpStatus": {
                "fileStatus": "notProceeded",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 4,
            "lawsuitNo": "FILE-2024-004",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "حسن عبد الله",
            "followUpStatus": {
                "fileStatus": "completed",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 5,
            "lawsuitNo": "FILE-2024-005",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "محمود السعيد",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 6,
            "lawsuitNo": "FILE-2024-006",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "رنا سامي",
            "followUpStatus": {
                "fileStatus": "notProceeded",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 7,
            "lawsuitNo": "FILE-2024-007",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "إيمان فوزي",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 8,
            "lawsuitNo": "FILE-2024-008",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "عادل طه",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 9,
            "lawsuitNo": "FILE-2024-009",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "شريف نبيل",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 10,
            "lawsuitNo": "FILE-2024-010",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "هدى فوزي",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 11,
            "lawsuitNo": "FILE-2024-011",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "طارق كريم",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 12,
            "lawsuitNo": "FILE-2024-012",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "زينب سعيد",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 13,
            "lawsuitNo": "FILE-2024-013",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "كريم عادل",
            "followUpStatus": {
                "fileStatus": "notProceeded",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 14,
            "lawsuitNo": "FILE-2024-014",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "ليلى مصطفى",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 15,
            "lawsuitNo": "FILE-2024-015",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "سامي عبد الرؤوف",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 16,
            "lawsuitNo": "FILE-2024-016",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "منى عادل",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 17,
            "lawsuitNo": "FILE-2024-017",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "مروة حسين",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 18,
            "lawsuitNo": "FILE-2024-015",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "سامي عبد الرؤوف",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 19,
            "lawsuitNo": "FILE-2024-016",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "منى عادل",
            "followUpStatus": {
                "fileStatus": "completed",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        },
        {
            "id": 20,
            "lawsuitNo": "FILE-2024-017",
            "fileType": "تحصيل",
            "clientName": "ورثة المرحوم كمال عبد الله",
            "defendant": "شركة النور",
            "followUpAddDate": "20-12-2025",
            "amountToBeCollected": 15000,
            "notes": "بموجب الاتفاق المبرم بين الطرفين، يُعد العميل ملزمًا بسداد المبالغ المستحقة وفقًا للجدول الزمني المتفق عليه. وفي حال تأخر العميل في سداد المبلغ المستحق، يحق للطرف الآخر اتخاذ كافة الإجراءات القانونية المتاحة لتحصيل المبلغ المتأخر، بما في ذلك فرض غرامات تأخير",
            "followUpBy": "مروة حسين",
            "followUpStatus": {
                "fileStatus": "inProgress",
                "reminder": 7,
                "phone": "6785 1543 6445"
            },
            "fileNumber": 123456,
            "imgURL": "https://i.pravatar.cc/150?img=4"
        }
    ];

    return (
        <>
            <BreadcrumbComponent
                links={[
                    {
                        id: 'PAGE1',
                        name: {
                            en: 'Dashboard',
                            ar: 'لوحة التحكم',
                        },
                    },
                    {
                        id: 'PAGE2',
                        name: {
                            en: 'View files',
                            ar: 'عرض الملفات',
                        },
                    }
                ]}
            />
            <div className='sdg_page'>
                <div className='mainDashboardPage dailyFolloUpsPage'>
                    <div className='titlePageDashboard'>
                        <div>
                            <h2>{translate('dailyFollowUps.title')}</h2>
                            <p><label>{translate('dailyFollowUps.UpdatedOn')}</label>29-9-2025</p>
                        </div>
                        <ButtonComponent Class={''} onClick={() => navigate('/create-file/create-new-profile')}>
                            {translate('mainDashboard.createNewFileButton')}
                        </ButtonComponent>
                    </div>

                    <DailyFollowUpsFileSearch />

                    <div className='weekDays'>
                        <div>
                            {translate('dailyFollowUps.saturday')}
                            <span>04 يناير</span>
                        </div>
                        <div>
                            {translate('dailyFollowUps.sunday')}
                            <span>05 يناير</span>
                        </div>
                        <div className='active'>
                            {translate('dailyFollowUps.monday')}
                            <span>06 يناير</span>
                        </div>
                        <div>
                            {translate('dailyFollowUps.tuesday')}
                            <span>07 يناير</span>
                        </div>
                        <div>
                            {translate('dailyFollowUps.wednesday')}
                            <span>08 يناير</span>
                        </div>
                        <div>
                            {translate('dailyFollowUps.thursday')}
                            <span>09 يناير</span>
                        </div>
                    </div>

                    <div className='divCardsRow'>
                        <DashboardCard
                            mode={'_card_4'}
                            label={translate('dailyFollowUps.totalFollowUps')}
                            count={1500}
                        />

                        <DashboardCard
                            mode={'_card_5'}
                            label={translate('dailyFollowUps.completedFollowUps')}
                            count={600}
                        />

                        <DashboardCard
                            mode={'_card_6'}
                            label={translate('dailyFollowUps.requiredFollowUps')}
                            count={700}
                        />

                        <DashboardCard
                            mode={'_card_7'}
                            label={translate('dailyFollowUps.unansweredFollowUps')}
                            count={200}
                        />
                    </div>

                    <div className='filterDivRow'>
                        <div>
                            <h4>{translate('dailyFollowUps.filterBy')}</h4>
                            <DropDownComponent
                                id="followUpType_id"
                                name="followUpType"
                                label=""
                                register={register}
                                watch={watch}
                                setValueMethod={setValue}
                                options={followUpTypeList}
                                optionLabel={`name.${$lang}`}
                                onChange={(e) => setValue("followUpType", e.value as object)}
                                placeholder={translate('dailyFollowUps.followUpType')}
                                errors={errors}
                            />

                            <DropDownComponent
                                id="fileType_id"
                                name="fileType"
                                label=""
                                register={register}
                                watch={watch}
                                setValueMethod={setValue}
                                options={fileTypeList}
                                optionLabel={`name.${$lang}`}
                                onChange={(e) => setValue("fileType", e.value as object)}
                                placeholder={translate('dailyFollowUps.fileType')}
                                errors={errors}
                            />

                            <div className="searchDiv">
                                <InputComponent
                                    id="followUpSearch_id"
                                    type="text"
                                    name="followUpSearch"
                                    label=''
                                    placeholder={translate("dailyFollowUps.enterFileNumber")}
                                    register={register}
                                    errors={errors}
                                    setValueMethod={setValue}
                                    watch={watch}
                                    onChange={(e) => { setValue("followUpSearch", e.target.value) }}
                                />
                            </div>
                        </div>

                        <div>
                            <p>
                                <label>{translate('dailyFollowUps.followUpCount')}</label>150
                            </p>
                            <span
                                className={`tableView ${selectedView === "table" ? "active" : ""}`}
                                onClick={() => setSelectedView("table")}
                            />
                            <span
                                className={`gridView ${selectedView === "grid" ? "active" : ""}`}
                                onClick={() => setSelectedView("grid")}
                            />
                        </div>
                    </div>

                    {selectedView === "table" ? <DailyFollowUpsFileTable
                        dataList={dataList} />
                        : <DailyFollowUpsGridView
                            dataList={dataList}
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default DailyFollowUps;
