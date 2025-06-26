import React from 'react';
import { DropDownComponent } from '@eachawy/frontend-library';
import { useAppSelector } from 'app/config/store';
import { useForm } from 'react-hook-form';

export const FileSearch = ({
    label1,
    placeholder1,
    optionList1,
    label2,
    placeholder2,
    optionList2
}) => {
    const { register, formState: { errors }, watch, setValue } = useForm({ mode: "onTouched" });
    const $lang = useAppSelector((state) => state.locale.currentLocale);    
    
    const combineSerialWithName = (optionList = []) => {
        return optionList?.map(item => ({
            ...item,
            name: {
                ar: `${item.code} - ${item.name.ar}`,
                en: `${item.code} - ${item.name.en}`
            }
        }));
    };
    
    const combineSerialWithNameL1 = combineSerialWithName(optionList1);
    const combineSerialWithNameL2 = combineSerialWithName(optionList2);
    
    return (
        <div className="row file-search">
            <DropDownComponent
                id="searchByNoNameFile-id1"
                name="searchByNoNameFile1"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={combineSerialWithNameL1}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => setValue("searchByNoNameFile1", e.value)}
                placeholder={placeholder1}
                className="col-md-6"
                filter={true}
                label={label1}
            />

            <DropDownComponent
                id="searchByNoNameFile-id2"
                name="searchByNoNameFile2"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={combineSerialWithNameL2}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => setValue("searchByNoNameFile2", e.value)}
                placeholder={placeholder2}
                className="col-md-6"
                filter={true}
                label={label2}
            />
        </div>
    );
};
