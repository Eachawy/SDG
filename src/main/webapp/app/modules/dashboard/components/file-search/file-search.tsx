import React, { useEffect } from 'react';
import { DropDownComponent } from '@eachawy/frontend-library';
import { useForm } from 'react-hook-form';
import { translate, Storage } from 'react-jhipster';
import { useAppSelector, useAppDispatch } from "app/config/store";
import { getAllFilteredPersons, getAllMasterFiles } from '../../dashboardLookups.reducer';
import { useNavigate } from 'react-router';
import { combineSerialWithName } from 'app/shared/util/utils';

export const FileSearch = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { register, formState: { errors }, watch, setValue, getValues } = useForm({ mode: "onTouched" });

    const [masterFilesList, setMasterFilesList] = React.useState<any>([]);
    const [filteredPersonList, setFilteredPesonsList] = React.useState<any>([]);

    const $lang = useAppSelector((state) => state.locale.currentLocale);
    const $masterFilesList = useAppSelector((state) => state.dashboardLookups.masterFilesList);
    const $filteredPersonsList = useAppSelector((state) => state.dashboardLookups.filteredPersonsList);

    const ddl1Change = (e) => {
        setValue("searchByNoNameFile1", e.value);
        getFilteredPersonsFN(e.value?.id);
        Storage.session.set("DashboardSelectedMasterFileID", e.value?.id);
        handleSearchNavigation(true, false);
    }

    const ddl2Change = (e) => {
        setValue("searchByNoNameFile2", e.value);
        Storage.session.set("DashboardSelectedPersonID", e.value?.code);
        handleSearchNavigation(false, true);
    }

    useEffect(() => {
        getFilteredMasterFilesFN();
        getFilteredPersonsFN(0);
    }, []);

    useEffect(() => {
        if ($masterFilesList) {
            const filteredFiles = $masterFilesList.map((item) => {
                return {
                    id: item.id,
                    code: item.fileNumber,
                    name: {
                        en: item.englishName,
                        ar: item.arabicName
                    },

                };
            });
            setMasterFilesList(filteredFiles);
            const ـDashboardSelectedMasterFileID = Storage.session.get("DashboardSelectedMasterFileID");
            if (ـDashboardSelectedMasterFileID) {
                let selectedFile = filteredFiles.find(file => file.id === Number(ـDashboardSelectedMasterFileID));
                selectedFile = {
                    ...selectedFile,
                    name: {
                        ar: `${selectedFile.code} - ${selectedFile.name.ar}`,
                        en: `${selectedFile.code} - ${selectedFile.name.en}`
                    }
                }
                setValue("searchByNoNameFile1", selectedFile);
                getFilteredPersonsFN(selectedFile.id);
            }
        }
    }, [$masterFilesList, setValue]);

    useEffect(() => {
        if ($filteredPersonsList) {
            const filteredPersons = $filteredPersonsList.map((item) => {
                return {
                    code: item.id,
                    name: {
                        en: item.nameEnglish,
                        ar: item.nameArabic
                    },

                };
            });
            setFilteredPesonsList(filteredPersons);
            const _DashboardSelectedPersonID = Storage.session.get("DashboardSelectedPersonID");
            if (_DashboardSelectedPersonID) {
                const selectedPerson = filteredPersons.find(file => file.code === Number(_DashboardSelectedPersonID));

                setValue("searchByNoNameFile2", selectedPerson);
            }
        }
    }, [$filteredPersonsList, setValue]);

    const getFilteredMasterFilesFN = async () => {
        await dispatch(getAllMasterFiles());
    }

    const getFilteredPersonsFN = async (id) => {
        await dispatch(getAllFilteredPersons(id));
    }

    const handleSearchNavigation = (firstDDL, secondDDL) => {
        if (firstDDL) {
            Storage.session.remove("DashboardSelectedPersonID");
            setValue("searchByNoNameFile2", null);
            if (location.pathname === '/dashoard/search-by-main-file') {
                window.location.reload();
            } else {
                navigate("/dashoard/search-by-main-file");
            }
        }
        if (secondDDL) {
            if (getValues().searchByNoNameFile1) {
                navigate("/dashoard/search-by-main-file-defendant");
            } else {
                if (location.pathname === 'search-by-defendant') {
                    window.location.reload();
                } else {
                    navigate("/dashoard/search-by-defendant");
                }
            }
        }
    }

    return (
        <div className="row file-search">
            <DropDownComponent
                id="searchByNoNameFile-id1"
                name="searchByNoNameFile1"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={combineSerialWithName(masterFilesList)}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => ddl1Change(e)}
                placeholder={translate('search.searchByNoNameMainFile')}
                className="col-md-12 col-lg-6"
                filter={true}
                label={translate('search.searchByNoNameMainFile')}
            />

            <DropDownComponent
                id="searchByNoNameFile-id2"
                name="searchByNoNameFile2"
                register={register}
                watch={watch}
                setValueMethod={setValue}
                options={filteredPersonList}
                optionLabel={`name.${$lang}`}
                errors={errors}
                onChange={(e) => ddl2Change(e)}
                placeholder={translate('mainDashboard.searchByDefendantName')}
                className="col-md-12 col-lg-6"
                filter={true}
                label={translate('mainDashboard.searchByDefendantName')}
            />
        </div>
    );
};
