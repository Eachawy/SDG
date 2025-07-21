import React from 'react';
import { ButtonComponent, DropDownComponent } from '@eachawy/frontend-library';
import { useAppSelector } from 'app/config/store';
import { useForm } from 'react-hook-form';

export const FileSearch = ({
    label1,
    placeholder1,
    optionList1,
    label2,
    placeholder2,
    optionList2,
    list1Change = (e) => {},
    list2Change = (e) => {}
}) => {
    const { register, formState: { errors }, watch, setValue } = useForm({ mode: "onTouched" });
    const $lang = useAppSelector((state) => state.locale.currentLocale);

    const ddl1Change = (e) => {
        setValue("searchByNoNameFile1", e.value);
        list1Change(e.value);
    }

    const ddl2Change = (e) => {
        setValue("searchByNoNameFile2", e.value);
        list2Change(e.value);
    }

    return (
        <div className="row file-search">
            <DropDownComponent
                id="searchByNoNameFile-id1"
                name="searchByNoNameFile1"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={optionList1}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => ddl1Change(e)}
                placeholder={placeholder1}
                className="col-md-12 col-lg-6"
                filter={true}
                label={label1}
            />

            <DropDownComponent
                id="searchByNoNameFile-id2"
                name="searchByNoNameFile2"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={optionList2}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => ddl2Change(e)}
                placeholder={placeholder2}
                className="col-md-12 col-lg-6"
                filter={true}
                label={label2}
            />
        </div>
    );
};
