import React from 'react';
import { translate } from 'react-jhipster';
import { useAppSelector } from "app/config/store";
import _ from 'lodash';
import { CurrencyList } from 'app/modules/shared/constants';

export const UrgentRequest = ({urgentRequestDetails}) => {
    const $lang = useAppSelector((state) => state.locale.currentLocale);
    return (
        <div className='mainFileContent _fileTypeInfoDiv  _requestData '>
            <h4>{translate('search.requestData')}</h4>
            <div>
                <p>
                    <label>
                        {translate('search.amountToBeCollected')}
                    </label>
                    {urgentRequestDetails?.requiredAmount} {_.find(CurrencyList, (item) => item.code === urgentRequestDetails?.currency)?.name[$lang]}
                </p>
            </div>
            <p>
                <label>{translate('search.requestNumber')}</label>
                {urgentRequestDetails?.caseNumber}
            </p>
            <p>
                <label>{translate('search.requestType')}</label>
                {$lang === 'en' ? urgentRequestDetails?.caseType?.englishName : urgentRequestDetails?.caseType?.arabicName}
            </p>
            <p>
                <label>{translate('search.judicialJurisdiction')}</label>
                {$lang === 'en' ? urgentRequestDetails?.court?.englishName : urgentRequestDetails?.court?.arabicName}
            </p>
            <p>
                <label>{translate('search.judge')}</label>
                {$lang === 'en' ? urgentRequestDetails?.judge?.englishName : urgentRequestDetails?.judge?.arabicName}
            </p>
            {/* <p>
                <label>{translate('search.courtLocation')}</label>
                شارع رشدي الصفدي – الصويفية / عمان
            </p> */}
            <p>
                <label>{translate('search.requestRegistrationDate')}</label>
                {urgentRequestDetails?.registrationDate}
            </p>
        </div>
    )
}
