import React, { useEffect } from 'react';
import $ from 'jquery';
import { translate } from 'react-jhipster';

export const DefendantData = ({ setShowPopup }) => {

    const onEditMainFile = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        console.log('Test Btn Done')
        e.preventDefault();
        e.stopPropagation();
        setShowPopup(true)
    };

    useEffect(() => {
        function handleDocumentClick(e) {
            if (!$(e.target).closest('.menu').length) {
                $('.serviceActionList').hide();
            }
        }
        $(document).on('mousedown', handleDocumentClick);
        return () => {
            $(document).off('mousedown', handleDocumentClick);
        };
    }, []);

    const serviceList = (e) => {
        e.stopPropagation();
        $(e.currentTarget).find('.serviceActionList').css("display", "flex");
    };

    return (
        <div className='main-file-data'>
            <div className='mainFileHeader'>
                <div className='headerTitle'>
                    {translate('search.defendantData')}
                </div>

                <div className='menu' onClick={serviceList}>
                    {translate('search.serviceList')}
                    <div className="serviceActionList">
                        <span onClick={(e) => onEditMainFile(e)}>
                            {translate('search.editDefendantData')}
                        </span>
                    </div>
                </div>
            </div>
            <div className='mainFileContent'>
                <p>
                    <label>{translate('search.personName')}</label>
                    محمد عبدالله رشوان
                </p>
                <p>
                    <label>{translate('search.nationalID')}</label>
                    123456789
                </p>
                <p>
                    <label>{translate('search.address1')}</label>
                    شارع محمد عبدالحميد زغلول بلوك ٨٩
                </p>
                <p>
                    <label>{translate('search.address2')}</label>
                    شارع محمد عبدالحميد زغلول بلوك ٨٩
                </p>
                <p>
                    <label>{translate('search.phoneNumber1')}</label>
                    54368956435
                </p>
                <p>
                    <label>{translate('search.phoneNumber2')}</label>
                    6544543434
                </p>
                <p>
                    <label>{translate('search.phoneNumber3')}</label>
                    55675544545
                </p>
                <p>
                    <label>{translate('search.email')}</label>
                    info@gmail.com
                </p>
            </div>
        </div>
    )
}