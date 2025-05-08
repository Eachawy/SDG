import React from 'react';
import './loaderComponent.scss';
import { translate } from 'react-jhipster';

export default function LoaderComponent(props) {
  return (
    <div className={`loaderHolder ${props.show ? 'show' : ''}`}>
      {/* <div className="loader"></div> */}
      <div>
        <img src="./content/images/logo.svg" alt="fire" />
      </div>
      <p>{translate('global.loadingContent')}</p>
    </div>
  );
}
