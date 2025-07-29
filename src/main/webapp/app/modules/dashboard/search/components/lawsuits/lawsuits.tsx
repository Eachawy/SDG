import React from 'react';
import { translate } from 'react-jhipster';
import { useAppSelector } from "app/config/store";
import { CurrencyList } from 'app/modules/shared/constants';
import _ from 'lodash';

export const Lawsuits = ({courtCaseDetails}) => {
    const $lang = useAppSelector((state) => state.locale.currentLocale);

    return (
        <div className='mainFileContent _fileTypeInfoDiv  _requestData '>
            <h4>{translate('search.lawsuitData')}</h4>
            <div>
                <p>
                    <label>
                        {translate('search.amountToBeCollected')}
                    </label>
                    {courtCaseDetails?.requiredAmount} {_.find(CurrencyList, (item) => item.code === courtCaseDetails?.currency)?.name[$lang]}
                </p>
            </div>
            <p>
                <label>{translate('search.lawsuitNo')}</label>
                {courtCaseDetails?.caseNumber}
            </p>
            <p>
                <label>{translate('search.lawsuitType')}</label>
                {$lang === 'en' ? courtCaseDetails?.caseType?.englishName : courtCaseDetails?.caseType?.arabicName}
            </p>
            <p>
                <label>{translate('search.judicialJurisdiction')}</label>
                {$lang === 'en' ? courtCaseDetails?.court?.englishName : courtCaseDetails?.court?.arabicName}
            </p>
            <p>
                <label>{translate('search.judge')}</label>
                {$lang === 'en' ? courtCaseDetails?.judge?.englishName : courtCaseDetails?.judge?.arabicName}
            </p>
            {/* <p>
                <label>{translate('search.courtLocation')}</label>
                شارع رشدي الصفدي – الصويفية / عمان
            </p> */}
            <p>
                <label>{translate('search.lawsuitRegistrationDate')}</label>
                {courtCaseDetails?.registrationDate}
            </p>
        </div>
    )
}
