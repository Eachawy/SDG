import React, { useEffect } from 'react';
import $ from 'jquery';
import { translate } from 'react-jhipster';

export const MainFileData = ({ setShowPopup }) => {

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
                    {translate('search.mainFileData')}
                </div>

                <div className='menu' onClick={serviceList}>
                    {translate('search.serviceList')}
                    <div className="serviceActionList">
                        <span onClick={(e) => onEditMainFile(e)}>
                            {translate('search.editMainFile')}
                        </span>
                        <span onClick={()=>{}}>
                            {translate('search.attachments')}
                        </span>
                    </div>
                </div>
            </div>
            <div className='mainFileContent'>
                <p><label>{translate('search.nationalID')}</label>123456789</p>
                <p><label>{translate('search.address')}</label>شركة النور</p>
                <p><label>{translate('search.phoneNumber')}</label>8546898435</p>
                <p><label>{translate('search.email')}</label>sdc@info.com</p>
            </div>
        </div>
    )
}