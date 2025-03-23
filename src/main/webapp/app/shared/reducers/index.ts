import { ReducersMapObject } from "@reduxjs/toolkit";
import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";
import entitiesReducers from "app/entities/reducers";
import authentication from "./authentication";
import locale from "./locale";
import createProfile from 'app/modules/new-profile/create-new-profile/pages/create-new-file/createNewProfile.reducer';

const rootReducer: ReducersMapObject = {
  authentication,
  locale,
  loadingBar,
  createProfile,
  ...entitiesReducers,
};

export default rootReducer;
