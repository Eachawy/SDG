import React from 'react';
import { useDropzone } from 'react-dropzone';


const UploaderCompnent = props => {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone(
        {
            accept: props.acceptFiles,
            onDrop: files => onChange(files)
        }
    );

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const onChange = async (file: any) => {
        const _data: any = file;
        _data[0].base64 = await toBase64(file[0]);
        props.onchange(_data);
    }
    return (
        <>
            <section className="uploaderComponent">
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <div>
                        <p>{props.title}</p>
                        <span>{props.desc}</span>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UploaderCompnent;