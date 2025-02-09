import React from 'react';
import ViewAttachmentComponent from '../viewAttachment.component/viewAttachment.Component';
import UploaderCompnent from '../uploader.component/uploader.Component';
import _ from 'lodash';


const AttachmentMultiFileComponent = props => {


    const [aFile, setAFile] = React.useState([]);

    const OnUploaderChanged = file => {
        setAFile((prevState) => [...prevState, file]);
    }

    const onDeleteAttachFile = _name => {
        const files = _.remove(aFile, obj => obj.name !== _name);
        setAFile(files);
    }


    return (
        <div className={props.class}>
            {aFile?.map((file, i) =>
                <ViewAttachmentComponent
                    key={i + 1}
                    titleSuccess={'تم تحميل الملف بنجاح'}
                    titleFile={'اسم الملف '}
                    fileName={file.name}
                    file={file}
                    onDeleteFile={() => onDeleteAttachFile(file.name)}
                />
            )}

            <UploaderCompnent
                title={'انقر أو اسحب الملف إلى هذه المنطقة لتحميله'}
                desc={'أنواع الملفات: Pdf، Word، Excel، Jpg، Png، والحجم الأقصى 250 كيلوبايت'}
                onchange={f => OnUploaderChanged(f[0])}
                acceptFiles={{
                    // 'image/*': [],
                    'image/*': ['.jpeg', '.png']
                }}
            />
        </div>
    );
}


export default AttachmentMultiFileComponent;
