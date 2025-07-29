import { ButtonComponent } from "@eachawy/frontend-library";
import React, { useEffect, useState } from "react";
import { getFileSize, getFileType } from "app/shared/util/utils";


const AttachmentPopupComponent = props => {

    const [selectedAttachmentFilePath, setSelectedAttachmentFilePath] = useState('');
    const [selectedAttachmentCard, setSelectedAttachmentCard] = useState(0);
    const [pdfView, setPdfView] = useState(false);

    useEffect(() => {
        setSelectedAttachmentFilePath(props.attachList.attachments[0]?.content);
    }, []);

    const viewFile = (base64: any, index: any) => {
        setSelectedAttachmentCard(index);
        setSelectedAttachmentFilePath(base64);
        if (base64.startsWith("data:image/")) {
            setPdfView(false)
        } else {
            setPdfView(true)
        }
        // base64.startsWith("data:image/") ? setPdfView(false) : setPdfView(true);
    }

    return (
        <>
            <div className="popupView popupAttachmentView">
                <div className="content">
                    <div>
                        <div className="fileCardList">
                            {props.attachList.attachments?.length > 0 && props.attachList.attachments.map((i, index) => (
                                <div key={index} onClick={() => viewFile(i.content, index)} className={`${selectedAttachmentCard === index && 'active'}`}>
                                    <p>
                                        <label>اسم الملف</label>
                                        {i.name}
                                    </p>
                                    <div>
                                        <p>
                                            <label>نوع الملف</label>
                                            {getFileType(i.content)}
                                        </p>
                                        <p>
                                            <label>حجم الملف</label>
                                            {getFileSize(i.content)}
                                        </p>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        <div className="fileViewSpace">
                            {pdfView &&
                                <object width={"100%"} height={"100%"} data={`${selectedAttachmentFilePath}`} />
                            }
                            {!pdfView &&
                                <img width={"100%"} src={`${selectedAttachmentFilePath}`} />
                            }
                        </div>
                    </div>
                    <ButtonComponent Class={'BtnCancel'} onClick={props.closeAttachmentPopupFn}>إغلاق</ButtonComponent>
                </div>
            </div>
        </>
    )
}

export default AttachmentPopupComponent;