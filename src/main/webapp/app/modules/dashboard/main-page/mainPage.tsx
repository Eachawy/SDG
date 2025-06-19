import { ButtonComponent } from '@eachawy/frontend-library';
import BreadcrumbComponent from 'app/shared/components/breadcrumbs.Component/breadcrumb.component';
import React from 'react';
import { useNavigate } from 'react-router';


const MainPage = () => {

    const navigate = useNavigate();


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
            <div className='sdg_page'>
                <ButtonComponent onClick={() => { navigate('/create-file/create-new-profile'); }}>
                    انشاء ملف جديد
                </ButtonComponent>
            </div>
        </>
    )
}

export default MainPage;