import React from 'react';
import ViewAttachmentComponent from '../viewAttachment.component/viewAttachment.Component';
import UploaderCompnent from '../uploader.component/uploader.Component';


const AttachmentFileComponent = props => {


    const [aFile, setAFile] = React.useState(null);

    const OnUploaderChanged = file => {
        setAFile(file);
        props.attachList(file);
    }

    const onDeleteAttachFile = () => {
        setAFile(null);
        props.attachList(null);
    }

    const onFileTypeChanged = e => {
        aFile.fileType = e;
        setAFile(aFile);
        props.attachList(aFile);
    }

    return (
        <div className={props.class}>
            {aFile !== null &&
                <ViewAttachmentComponent
                    titleSuccess={'تم تحميل الملف بنجاح'}
                    titleFile={'اسم الملف '}
                    fileName={aFile.name}
                    file={aFile}
                    onDeleteFile={onDeleteAttachFile}
                    class={'col-6'}
                    fileType={props?.fileTypeList}
                    lang={props.lang}
                    fileTypeChange={onFileTypeChanged}
                    fileTypePlaceHolder={props.fileTypePlaceHolder}
                />
            }
            {aFile === null &&
                <UploaderCompnent
                    title={'انقر أو اسحب الملف إلى هذه المنطقة لتحميله'}
                    desc={'أنواع الملفات: Pdf، Word، Excel، Jpg، Png، والحجم الأقصى 250 كيلوبايت'}
                    onchange={f => OnUploaderChanged(f[0])}
                    acceptFiles={{
                        // 'image/*': [],
                        'image/*': ['.jpeg', '.png']
                    }}
                    class={'col-6'}
                />
            }
        </div>
    );
}


export default AttachmentFileComponent;
