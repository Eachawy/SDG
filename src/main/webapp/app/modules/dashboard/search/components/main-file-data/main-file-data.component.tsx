import React, { useEffect } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import { translate ,Storage} from 'react-jhipster';
import AttachmentPopupComponent from 'app/shared/components/attachmentPopup.Component/attachmentPopup.Component';
import { pushNotification } from 'app/shared/util/utils';

export const MainFileData = ({ setShowPopup, masterFileDetails }) => {
    const navigate = useNavigate();
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

    const createNewSubFile = (fileDetails: any) => {
        const $masterFile = {
            fileNumber: fileDetails.fileNumber,
            id: fileDetails.id,
        }
        Storage.session.set("isCompany", fileDetails.company);
        Storage.session.set("applicantName", { en: fileDetails.englishName, ar: fileDetails.arabicName });
        Storage.session.set("masterFile", $masterFile);
        navigate("/create-file/select-file-type");
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
                            <span onClick={() => createNewSubFile(masterFileDetails)}>
                                {translate('search.addsubfile')}
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