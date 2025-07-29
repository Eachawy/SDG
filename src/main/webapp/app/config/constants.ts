export const AUTHORITIES = {
  ADMIN: "ROLE_ADMIN",
  USER: "ROLE_USER",
  SUPPER: "ROLE_SUPPER"
};

export const messages = {
  DATA_ERROR_ALERT: "Internal Error",
};

export const APP_DATE_FORMAT = "DD/MM/YY HH:mm";
export const APP_TIMESTAMP_FORMAT = "DD/MM/YY HH:mm:ss";
export const APP_LOCAL_DATE_FORMAT = "DD/MM/YYYY";
export const APP_LOCAL_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm";
export const APP_WHOLE_NUMBER_FORMAT = "0,0";
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = "0,0.[00]";



export const APP_PARAMETERS = 'param';
export const AUTH_TOKEN_KEY = 'token';
export const GATEWAY_SERVER_API_URL = 'http://172.24.16.50:8080/';
export const authenticationURL = 'api/authenticate';
export const profileURL = 'api/account';
export const masterFilesAPI = 'api/master-files';
export const addEditPersonAPI = 'api/persons';
export const createFileAPI = 'api/files/create';

// Lookups
export const getAllEmployeesAPI = 'api/employees?name=&size=';
export const getAllPersonsAPI = 'api/persons?name=&size=';
export const getAllCourtsAPI = 'api/courts/active';
export const getAllJudgesAPI = 'api/judges/active';
export const getAllCaseTypesAPI = 'api/case-types/active/case';
export const getAllRequestTypesAPI = 'api/case-types/active/request';
export const getAllBanksAPI = 'api/banks?name=&size=';

// Legal Bonds
export const getFileDetailsAPI = 'api/files/';
export const addLegalBondAPI = 'api/legal-bonds';
export const deleteLegalBondAPI = 'api/legal-bonds';

// Dashboard
export const getBoxesDataAPI = 'api/files/file-count';
export const getChartsDataAPI = 'api/files/file-count-per-month/status/';
export const getTableTabsDataAPI = 'api/files/file-count-per-status';
export const getFilesTableDataAPI = 'api/master-files/search?size=200&page=0';
export const getFilteredMasterFilesAPI = 'api/master-files/filtered';
export const getFilteredPersonsAPI = 'api/persons/masterFileId/';
export const getMasterFileDetailsAPI = 'api/master-files/';
export const getMasterFileCountersAPI = 'api/master-files/counters';
export const editMasterFileAPI = 'api/master-files/update';