import React from 'react';
import { translate } from 'react-jhipster';

export const Lawsuits = (courtCaseDetails) => {
    return (
        <div className='mainFileContent _fileTypeInfoDiv  _requestData '>
            <h4>{translate('search.lawsuitData')}</h4>
            <div>
                <p>
                    <label>
                        {translate('search.amountToBeCollected')}
                    </label>
                    1500 {translate('search.JOD')}
                </p>
            </div>
            <p>
                <label>{translate('search.lawsuitNo')}</label>
                123456789
            </p>
            <p>
                <label>{translate('search.lawsuitType')}</label>
                مدنية
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
                <label>{translate('search.lawsuitRegistrationDate')}</label>
                29-09-2025
            </p>
        </div>
    )
}
