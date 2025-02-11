import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const ViewAttachmentComponent = props => {

    const [fileType, setFileType] = React.useState(null);

    const onDownloadFile = () => {
        const a = document.createElement("a");
        a.href = props.file.base64;
        a.download = props.file.path;
        a.click();
    }

    const onFileTypeChange = (e) => {
        setFileType(e.value);
        props.fileTypeChange(e.value);
    }

    return (
        <>
            <div className={`viewAttachment ${props.class}`}>
                <div>
                    <span className='downloadIcon' onClick={onDownloadFile} />
                    <div className='details'>
                        <p>{props.titleSuccess}</p>
                        <span>{`${props.titleFile} ${props.fileName}`}</span>
                    </div>
                    <span className='deleteFile_icon' onClick={() => props.onDeleteFile()} />
                </div>
                {props.fileType &&
                    <Dropdown
                        value={fileType}
                        onChange={onFileTypeChange}
                        options={props.fileType}
                        optionLabel={`name.${props.lang}`}
                        placeholder={props.fileTypePlaceHolder}
                    />
                }
            </div>
        </>
    );
}

export default ViewAttachmentComponent;