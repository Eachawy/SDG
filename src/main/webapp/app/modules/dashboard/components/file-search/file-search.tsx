
import { DropDownComponent } from '@eachawy/frontend-library';
import { useAppSelector } from 'app/config/store';
import React from 'react';
import { useForm } from 'react-hook-form';
import { translate } from 'react-jhipster';

export const FileSearch = () => {

    const { register, formState: { errors }, watch, setValue } = useForm({ mode: "onTouched" });
    const $lang = useAppSelector((state) => state.locale.currentLocale);

    return (
        <div className='row file-search'>
            <DropDownComponent
                id="searchByNoNameFile-id"
                name="searchByNoNameFile"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={[
                    { name: { ar: "محمد أحمد عامر", en: "Mohamed Ahmed Amer" }, code: "MA" },
                    { name: { ar: "فاطمة علي حسن", en: "Fatima Ali Hassan" }, code: "FA" },
                    { name: { ar: "خالد محمود سالم", en: "Khaled Mahmoud Salem" }, code: "KA" }
                ]}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => setValue("searchByNoNameFile", e.value as object)}
                placeholder={translate('mainDashboard.searchByFileOrName')}
                className="col-md-6"
                filter={true}
                label={translate('mainDashboard.searchByFileOrName')}
            />

            <DropDownComponent
                id="searchByNoNameFile-id"
                name="searchByNoNameFile"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={[
                    { name: { ar: "محمد أحمد عامر", en: "Mohamed Ahmed Amer" }, code: "MA" },
                    { name: { ar: "فاطمة علي حسن", en: "Fatima Ali Hassan" }, code: "FA" },
                    { name: { ar: "خالد محمود سالم", en: "Khaled Mahmoud Salem" }, code: "KA" }
                ]}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => setValue("searchByNoNameFile", e.value as object)}
                placeholder={translate('mainDashboard.searchByDefendantName')}
                className="col-md-6"
                filter={true}
                label={translate('mainDashboard.searchByDefendantName')}
            />
        </div>
    )
}