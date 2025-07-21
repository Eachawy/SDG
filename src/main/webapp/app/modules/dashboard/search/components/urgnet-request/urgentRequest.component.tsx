import React from 'react';
import { translate } from 'react-jhipster';

export const UrgentRequest = () => {
    return (
        <div className='mainFileContent _fileTypeInfoDiv  _requestData '>
            <h4>{translate('search.requestData')}</h4>
            <div>
                <p>
                    <label>
                        {translate('search.amountToBeCollected')}
                    </label>
                    1500 {translate('search.JOD')}
                </p>
            </div>
            <p>
                <label>{translate('search.requestNumber')}</label>
                123456789
            </p>
            <p>
                <label>{translate('search.requestType')}</label>
                نفقة
            </p>
            <p>
                <label>{translate('search.judicialJurisdiction')}</label>
                جنائي
            </p>
            <p>
                <label>{translate('search.judge')}</label>
                محمد زكريا
            </p>
            <p>
                <label>{translate('search.courtLocation')}</label>
                شارع رشدي الصفدي – الصويفية / عمان
            </p>
            <p>
                <label>{translate('search.requestRegistrationDate')}</label>
                29-09-2025
            </p>
        </div>
    )
}
