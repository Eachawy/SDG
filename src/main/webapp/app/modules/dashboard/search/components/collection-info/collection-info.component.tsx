import React from 'react';
import { translate } from 'react-jhipster';

export const CollectionInfo = () => {
    return (
        <div className='mainFileContent _fileTypeInfoDiv '>
            <h4>{translate('search.collectionData')}</h4>
            <p>
                <label>
                    {translate('search.amountToBeCollected')}
                </label>
                1500 {translate('search.JOD')}
            </p>
            <p>
                <label>
                    {translate('search.originalDebt')}
                </label>
                2500 {translate('search.JOD')}
            </p>
            <p>
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
            </p>
        </div>
    )
}
