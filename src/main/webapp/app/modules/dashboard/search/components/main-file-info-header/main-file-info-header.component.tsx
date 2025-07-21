import { ProgressBar } from 'primereact/progressbar';
import React from 'react';
import { translate } from 'react-jhipster';
import { useAppSelector } from "app/config/store";
import dayjs from "dayjs";

export const FileInfoHeader = ({ setShowPopup, masterFileDetails }) => {

  const onUpdateData = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const $lang = useAppSelector((state) => state.locale.currentLocale);

  return (
    <div className='fileInfoHeader'>
      <div>
        {translate('search.serialNumber')}
        <span>{masterFileDetails?.fileNumber}</span>
      </div>
      <div>
        {translate('search.companyName')}
        <span>{$lang === 'en' ? masterFileDetails?.englishName : masterFileDetails?.arabicName}</span>
      </div>
      <div>
        {translate('search.fileOpenDate')}
        <span>{dayjs(masterFileDetails?.createdDate).format('DD-MM-YYYY')}</span>
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
