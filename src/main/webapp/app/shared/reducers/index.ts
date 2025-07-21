import { ReducersMapObject } from "@reduxjs/toolkit";
import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";
import entitiesReducers from "app/entities/reducers";
import authentication from "./authentication";
import locale from "./locale";
import createProfile from 'app/modules/new-profile/create-new-file/createNewProfile.reducer';
import createProfileLookups from 'app/modules/new-profile/select-file-type/newProfileLookups.reducer';
import selectFileType from 'app/modules/new-profile/select-file-type/select-file-type.reducer';
import legalBonds from 'app/modules/new-profile/legal-bonds-page/components/legalBonds.reducer';
import dashboard from 'app/modules/dashboard/dashboard.reducer';
import dashboardLookups from 'app/modules/dashboard/dashboardLookups.reducer';

const rootReducer: ReducersMapObject = {
  authentication,
  locale,
  loadingBar,
  createProfile,
  selectFileType,
  createProfileLookups,
  legalBonds,
  dashboard,
  dashboardLookups,
  ...entitiesReducers,
};

export default rootReducer;
