import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { translate } from 'react-jhipster';
import { MainFileData } from '../main-file-data/main-file-data.component';
import { DefendantData } from '../defendant-data/defendant-data.component';

export const MainFileDefendantData = ({ setShowDefendantPopup, setShowMainFilePopup }) => {
    const [activeTab, setActiveTab] = useState("defendant");

    const onEditFile = (e: React.MouseEvent<HTMLElement, MouseEvent>, fileType: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileType === 'main') {
            setShowMainFilePopup(true)
        } else {
            setShowDefendantPopup(true)
        }
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
        <div className='main-file-data mb-4'>
            <div className='mainFileHeader _mainDefendantHeader'>
                <div className="tabs">
                    <div
                        className={activeTab === "defendant" && "active"}
                        onClick={() => setActiveTab("defendant")}
                    >
                        {translate('search.defendantData')}
                    </div>
                    <div
                        className={activeTab === "main" && "active"}
                        onClick={() => setActiveTab("main")}
                    >
                        {translate('search.mainFileData')}
                    </div>
                </div>

                <div className='menu' onClick={serviceList}>
                    {translate('search.serviceList')}
                    <div className="serviceActionList">
                        {activeTab === 'main' ? <span onClick={(e) => onEditFile(e, 'main')}>
                            {translate('search.editMainFile')}
                        </span>
                            : <span onClick={(e) => onEditFile(e, 'defendant')}>
                                {translate('search.editDefendantData')}
                            </span>}
                        <span onClick={() => { }}>
                            {translate('search.addsubfile')}
                        </span>
                        <span onClick={() => { }}>
                            {translate('search.attachments')}
                        </span>
                    </div>
                </div>
            </div>
            {activeTab === 'main' ? (
                <MainFileData setShowPopup={undefined} />
            ) : (
                <DefendantData setShowPopup={undefined} />
            )}
        </div>
    )
}