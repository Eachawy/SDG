import React, { useEffect } from 'react';
import $ from 'jquery';
import { translate } from 'react-jhipster';
import AttachmentPopupComponent from 'app/shared/components/attachmentPopup.Component/attachmentPopup.Component';
import { pushNotification } from 'app/shared/util/utils';

export const MainFileData = ({ setShowPopup, masterFileDetails }) => {

    const [attachmentListRow, setAttachmentListRow] = React.useState<number | null>(null)

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

    const setAttachments = (masterFile) => {
        if (masterFile.attachments && masterFile.attachments.length > 0) {
            setAttachmentListRow(masterFile);
        } else {
            setAttachmentListRow(null);
            pushNotification("error", "لم يتم العثور على مرفقات لهذا الملف");
        }
    }

    return (
        <>
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
                            <span onClick={() => setAttachments(masterFileDetails)}>
                                {translate('search.attachments')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='mainFileContent'>
                    <p><label>{translate('search.nationalID')}</label>{masterFileDetails?.ssn ?? '--'}</p>
                    <p><label>{translate('search.address')}</label>{masterFileDetails?.address ?? '--'}</p>
                    <p><label>{translate('search.phoneNumber')}</label>{masterFileDetails?.mobileNumber ?? '--'}</p>
                    <p><label>{translate('search.email')}</label>{masterFileDetails?.email ?? '--'}</p>
                </div>
            </div>
            {attachmentListRow &&
                <AttachmentPopupComponent attachList={attachmentListRow} closeAttachmentPopupFn={() => setAttachmentListRow(null)} />
            }
        </>
    )
}