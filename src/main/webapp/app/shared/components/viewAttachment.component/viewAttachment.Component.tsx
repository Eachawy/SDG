import React from 'react';

const ViewAttachmentComponent = props => {

    const onDownloadFile = () => {
        const a = document.createElement("a");
        a.href = props.file.base64;
        a.download = props.file.path;
        a.click();
    }

    return (
        <>
            <div className='viewAttachment'>
                <div>
                    <span className='downloadIcon' onClick={onDownloadFile} />
                    <div>
                        <p>{props.titleSuccess}</p>
                        <span>{`${props.titleFile} ${props.fileName}`}</span>
                    </div>
                    <span className='deleteFile_icon' onClick={() => props.onDeleteFile()} />
                </div>
            </div>
        </>
    );
}

export default ViewAttachmentComponent;