import React, { useEffect } from 'react';
import $ from 'jquery';
import { translate } from 'react-jhipster';
import { useAppSelector } from 'app/config/store';

export const DefendantData = ({ setShowPopup, personData }) => {

    const $lang = useAppSelector((state) => state.locale.currentLocale);

    const onEditMainFile = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
                    {$lang === 'en' ? personData?.nameEnglish : personData?.nameArabic}
                </p>
                <p>
                    <label>{translate('search.nationalID')}</label>
                    {personData?.nationalId ?? '--'}
                </p>
                <p>
                    <label>{translate('search.address1')}</label>
                    {personData?.addressOne ?? '--'}
                </p>
                <p>
                    <label>{translate('search.address2')}</label>
                    {personData?.addressTwo ?? '--'}
                </p>
                <p>
                    <label>{translate('search.phoneNumber1')}</label>
                    {personData?.mobileOne ?? '--'}
                </p>
                <p>
                    <label>{translate('search.phoneNumber2')}</label>
                    {personData?.mobileTwo ?? '--'}
                </p>
                <p>
                    <label>{translate('search.phoneNumber3')}</label>
                    {personData?.mobileThree ?? '--'}
                </p>
                <p>
                    <label>{translate('search.email')}</label>
                    {personData?.email ?? '--'}
                </p>
            </div>
        </div>
    )
}