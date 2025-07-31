import { ButtonComponent } from '@eachawy/frontend-library';
import React, { useEffect } from 'react';
import { Storage, translate } from "react-jhipster";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "app/config/store";
import { reset } from 'app/modules/new-profile/create-new-file/createNewProfile.reducer';
import { resetAndClearSeasion } from 'app/shared/util/utils';

const MainDashboardPage = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(reset());
        resetAndClearSeasion();
    }, []);

    const createNewFileFn = () => {
        navigate('/dashoard/main-page');
    }

    const followUpsFn = () => {

    }

    return (
        <div className="container mainDashboardPage">
            <h3>{translate('dashboardTitle.title')}</h3>
            <div className="row g-5">
                <div className="col-md-12 col-lg-6">
                    <div className="card-wrapper">
                        <div className="createNewFile">
                            <h3>{translate('dashboardTitle.createNewFileTitle')}</h3>
                            <p>{translate('dashboardTitle.createNewFileDescription')}</p>
                        </div>
                        <ButtonComponent onClick={createNewFileFn}>
                            {translate('dashboardTitle.createNewFileButton')}
                        </ButtonComponent>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6">
                    <div className="card-wrapper">
                        <div className="followUps">
                            <h3>{translate('dashboardTitle.followUpsTitle')}</h3>
                            <p>{translate('dashboardTitle.followUpsDescription')}</p>
                        </div>
                        <ButtonComponent onClick={followUpsFn}>
                            {translate('dashboardTitle.followUpsButton')}
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MainDashboardPage;