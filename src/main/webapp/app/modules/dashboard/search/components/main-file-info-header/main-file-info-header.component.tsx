import { ProgressBar } from 'primereact/progressbar';
import React from 'react';
import { translate } from 'react-jhipster';

export const FileInfoHeader = ({ setShowPopup }) => {

  const onUpdateData = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div className='fileInfoHeader'>
      <div>
        {translate('search.serialNumber')}
        <span>12565453</span>
      </div>
      <div>
        {translate('search.companyName')}
        <span>شركة النور للتجميع والمحاماة</span>
      </div>
      <div>
        {translate('search.fileOpenDate')}
        <span>02-12-2024</span>
      </div>
      <div>
        <div className="progressBar">
          <ProgressBar value={50} />
          <span>50%</span>
        </div>
        <span>
          {translate('search.mainFileNeeds')}
          <a href="#" onClick={onUpdateData}>{translate('search.updateData')}</a>
        </span>
      </div>
    </div>
  );
};
