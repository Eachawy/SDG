import { AttachmentMultiFilesComponent, ButtonComponent, InputComponent, RadioButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React, { useState } from 'react';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { FileInfoHeader } from '../components/file-info-header/file-info-header';
import { MainFileData } from '../components/main-file-data/main-file-data';
import { DefendantDataTable } from '../components/defendant-data-table/defendant-data-table';
import { useForm } from 'react-hook-form';
import PhoneNumberComponent from 'app/shared/components/phoneNumber.Component/phoneNumber.Component';
import { useAppSelector } from 'app/config/store';

export const SearchByProfile = () => {
    const [showPopup, setShowPopup] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm({ mode: 'onTouched', });
    const navigate = useNavigate();
    const createNewFileFn = () => {
        navigate('/create-file/create-new-profile');
    }
    const $lang = useAppSelector(state => state.locale.currentLocale);
    const defendantDataList = [
        {
            id: 1,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 50,
        },
        {
            id: 2,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 3,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 50,
        },
        {
            id: 4,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 5,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 6,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 7,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 8,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 9,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 10,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 11,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 12,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 13,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 14,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 15,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 16,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 17,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 18,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
        {
            id: 19,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 20,
        },
        {
            id: 20,
            fileNumber: "10 / 12564",
            defendantName: "اسم المدعي عليه يكتب هنا",
            nationalNumber: "12345679",
            registerDate: "29-03-2025",
            lastUpdateDate: "20-12-2025",
            legalDocuments: "شيك / كمبيالة / إقرار خطي- سند امانة / كشف حساب / عقد ايجار/ قانوني",
            dataStatus: 100,
        },
    ];
    const cancelFn = () => {
        setShowPopup(false)
    }
    const saveFn = () => {
    }
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
                        id: 'PAGE1',
                        name: {
                            en: 'View files',
                            ar: 'عرض الملفات',
                        },
                    }
                ]}
            />

            <div className='sdg_page searchByProfile'>
                <div className='titlePageDashboard'>
                    <h2>{translate('search.searchResults')}</h2>
                    <ButtonComponent onClick={createNewFileFn}>
                        {translate('mainDashboard.createNewFileButton')}
                    </ButtonComponent>
                </div>

                <FileSearch
                    label1={translate('search.searchByNoNameMainFile')}
                    placeholder1={translate('search.searchByNoNameMainFile')}
                    optionList1={[
                        { name: { ar: "محمد أحمد عامر", en: "Mohamed Ahmed Amer" }, code: "1234" },
                        { name: { ar: "فاطمة علي حسن", en: "Fatima Ali Hassan" }, code: "5978" },
                        { name: { ar: "خالد محمود سالم", en: "Khaled Mahmoud Salem" }, code: "8799" }
                    ]}
                    label2={translate('mainDashboard.searchByDefendantName')}
                    placeholder2={translate('mainDashboard.searchByDefendantName')}
                    optionList2={[
                        { name: { ar: "محمد أحمد عامر", en: "Mohamed Ahmed Amer" }, code: "1284" },
                        { name: { ar: "فاطمة علي حسن", en: "Fatima Ali Hassan" }, code: "8976" },
                        { name: { ar: "خالد محمود سالم", en: "Khaled Mahmoud Salem" }, code: "9965" }
                    ]}
                />

                <FileInfoHeader setShowPopup={setShowPopup} />

                <MainFileData setShowPopup={setShowPopup} />

                <DefendantDataTable defendantDataList={defendantDataList} />

                {showPopup && (
                    <div className="popupView">
                        <div className="contanier">
                            <div className='header'>
                                {translate('search.serialNumber')}
                                <span>123456789</span>
                            </div>
                            <div className="content">
                                <div className="radioButtonDiv">
                                    <RadioButtonComponent
                                        name="profileType"
                                        label={translate("createNewProfile.companyTypeCorporate")}
                                        register={register}
                                        errors={errors}
                                        value={'corporateType'}
                                        watch={watch}
                                        onChange={() => setValue("profileType", "corporateType")}
                                        checked={getValues().profileType === 'corporateType'}
                                    />
                                    <RadioButtonComponent
                                        name="profileType"
                                        label={translate("createNewProfile.companyTypePersonal")}
                                        register={register}
                                        errors={errors}
                                        value={'personalType'}
                                        watch={watch}
                                        onChange={() => setValue("profileType", "personalType")}
                                        checked={getValues().profileType === 'personalType'}
                                    />
                                </div>

                                <div className="formDiv row g-4 mt-8">
                                    <div className='col-md-6'>
                                        <InputComponent
                                            id="NameAr"
                                            type="text"
                                            name="NameAr"
                                            label={
                                                (getValues().profileType === 'corporateType') ?
                                                    translate("createNewProfile.companyNameAr") : translate("createNewProfile.personNameAr")}
                                            placeholder={
                                                (getValues().profileType === 'corporateType') ?
                                                    translate("createNewProfile.companyNameAr") : translate("createNewProfile.personNameAr")}
                                            register={register}
                                            // rules={{ required: translate("search.requiredField") }}
                                            errors={errors}
                                            setValueMethod={setValue}
                                            watch={watch}
                                            onChange={(e) => {
                                                const arabicOnly = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");
                                                setValue("NameAr", arabicOnly);
                                            }}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <InputComponent
                                            id="NameEn"
                                            type="text"
                                            name="NameEn"
                                            label={
                                                (getValues().profileType === 'corporateType') ?
                                                    translate("createNewProfile.companyNameEn") : translate("createNewProfile.personNameEn")}
                                            placeholder={
                                                (getValues().profileType === 'corporateType') ?
                                                    translate("createNewProfile.companyNameEn") : translate("createNewProfile.personNameEn")}
                                            register={register}
                                            // rules={{ required: translate("search.requiredField") }}
                                            errors={errors}
                                            setValueMethod={setValue}
                                            watch={watch}
                                            onChange={(e) => {
                                                const englishOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                                                setValue("NameEn", englishOnly);
                                            }}
                                            Class={'col-md-6'}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <InputComponent
                                            id="nationalNumber"
                                            type="nationalNumber"
                                            name="nationalNumber"
                                            label={translate("createNewProfile.nationalNumber")}
                                            placeholder={translate("createNewProfile.exm") + "1234567"}
                                            register={register}
                                            errors={errors}
                                            setValueMethod={setValue}
                                            watch={watch}
                                            onChange={(e) => {
                                                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                                setValue("nationalNumber", numericValue);
                                            }}
                                            Class={'col-md-6'}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <InputComponent
                                            id="address"
                                            type="address"
                                            name="address"
                                            label={translate("createNewProfile.address")}
                                            placeholder={translate("createNewProfile.enterTheAddress")}
                                            register={register}
                                            errors={errors}
                                            setValueMethod={setValue}
                                            watch={watch}
                                            onChange={(e) => setValue("address", e.target.value)}
                                            Class={'col-md-6'}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <PhoneNumberComponent
                                            register={register}
                                            errors={errors}
                                            watch={watch}
                                            setValue={setValue}
                                            Class={'col-md-6'}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <InputComponent
                                            id="email"
                                            type="email"
                                            name="email"
                                            label={translate("createNewProfile.email")}
                                            placeholder={translate("loginPage.emailPlaceholder")}
                                            register={register}
                                            errors={errors}
                                            setValueMethod={setValue}
                                            watch={watch}
                                            onChange={(e) => setValue("email", e.target.value)}
                                            Class={'col-md-6'}
                                        />
                                    </div>
                                </div>

                                <div className="uploaderContainer">
                                    <h4>{translate("createNewProfile.attachments")}</h4>
                                    <div className="row mb-4">
                                        <AttachmentMultiFilesComponent
                                            name={"attach1"}
                                            attachList={(e) => setValue("attach1", e)}
                                            lang={$lang}
                                            register={register}
                                            watch={watch}
                                            setValueMethod={setValue}
                                            fileTypePlaceHolder={'Select a File Type'}
                                            Class="col-md-12 col-lg-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="footerPopup">
                                <ButtonComponent Class={'BtnCancel'} onClick={cancelFn}>{translate("search.close")}</ButtonComponent>
                                <ButtonComponent Class={'btnStyle'} onClick={handleSubmit(saveFn)}>{translate("search.save")}</ButtonComponent>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
