import { CurrencyList } from 'app/modules/shared/constants';
import React from 'react';
import { translate } from 'react-jhipster';
import { useAppSelector } from "app/config/store";
import _ from 'lodash';

export const CollectionInfo = ({collectionsDetails}) => {
    const $lang = useAppSelector((state) => state.locale.currentLocale);

    return (
        <div className='mainFileContent _fileTypeInfoDiv '>
            <h4>{translate('search.collectionData')}</h4>
            <p>
                <label>
                    {translate('search.amountToBeCollected')}
                </label>
                {collectionsDetails?.requiredCollectionAmount} {_.find(CurrencyList, (item) => item.code === collectionsDetails?.currency)?.name[$lang]}
            </p>
            <p>
                <label>
                    {translate('search.originalDebt')}
                </label>
                {collectionsDetails?.requiredCollectionAmount} {_.find(CurrencyList, (item) => item.code === collectionsDetails?.currency)?.name[$lang]}
            </p>
            {/* <p>
                <label>
                    {translate('search.amountCollected')}
                </label>
                500 {translate('search.JOD')}
            </p>
            <p>
                <label>
                    {translate('search.remainingAmount')}
                </label>
                1000 {translate('search.JOD')}
            </p> */}
        </div>
    )
}
