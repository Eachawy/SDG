import React, { useEffect } from 'react';
import { ButtonComponent } from '@eachawy/frontend-library';
import { FileSearch } from 'app/modules/dashboard/components/file-search/file-search';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import { translate } from 'react-jhipster';
import { useNavigate } from 'react-router';
import { AllProfilesDataTable } from '../components/all-profiles-data-table/all-profiles-data-table.component';

export const AllProfiles = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    return (
        <>
            <BreadcrumbComponent
                back={true}
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
                            ar: 'عرض جميع الملفات',
                        },
                    }
                ]}
            />

            <div className='sdg_page searchByProfile'>
                <div className='titlePageDashboard'>
                    <h2>{translate('search.showAllFiles')}</h2>
                    <ButtonComponent onClick={() => navigate('/create-file/create-new-profile')}>
                        {translate('mainDashboard.createNewFileButton')}
                    </ButtonComponent>
                </div>

                <FileSearch />

                <AllProfilesDataTable />
            </div>
        </>
    );
}
