import { ButtonComponent } from '@eachawy/frontend-library';
import React from 'react';
import { useNavigate } from 'react-router';


const MainPage = () => {

    const navigate = useNavigate();


    return (
        <>
            <div className='sdg_page'>
                <ButtonComponent onClick={() => { navigate('/create-file/create-new-profile'); }}>
                    انشاء ملف جديد
                </ButtonComponent>
            </div>
        </>
    )
}

export default MainPage;