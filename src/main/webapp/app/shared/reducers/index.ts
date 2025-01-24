import { ReducersMapObject } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import entitiesReducers from 'app/entities/reducers';
import authentication from './authentication';
import locale from './locale';

const rootReducer: ReducersMapObject = {
  authentication,
  locale,
  loadingBar,
  ...entitiesReducers,
};

export default rootReducer;
