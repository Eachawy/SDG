import { ReducersMapObject } from "@reduxjs/toolkit";
import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";
import entitiesReducers from "app/entities/reducers";
import authentication from "./authentication";
import locale from "./locale";
import createProfile from 'app/modules/new-profile/create-new-profile/pages/create-new-file/createNewProfile.reducer';
import createProfileLookups from 'app/modules/new-profile/create-new-profile/pages/select-file-type/newProfileLookups.reducer';
import selectFileType from 'app/modules/new-profile/create-new-profile/pages/select-file-type/select-file-type.reducer';
import legalBonds from 'app/modules/new-profile/create-new-profile/pages/Legal-bonds/legalBonds/legalBonds.reducer';
const rootReducer: ReducersMapObject = {
  authentication,
  locale,
  loadingBar,
  createProfile,
  selectFileType,
  createProfileLookups,
  legalBonds,
  ...entitiesReducers,
};

export default rootReducer;
