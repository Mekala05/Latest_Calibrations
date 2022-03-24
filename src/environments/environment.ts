// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//// -------------- Server Node IP http://10.0.0.11:3000  ---------- ////

// export const environment = {
//   production: false,
//   url: 'http://10.0.0.11:3000/api/category',
//   Typeurl: 'http://10.0.0.11:3000/api/type',
//   Makeurl: 'http://10.0.0.11:3000/api/make',
//   Instrument: 'http://10.0.0.11:3000/api/Instrument',
//   Equipment: 'http://10.0.0.11:3000/api/equipment',
//   Gauges: 'http://10.0.0.11:3000/api/gauges',
//   Login: 'http://10.0.0.11:3000/api/auth',
//   Master: 'http://10.0.0.11:3000/api/master',
//   Calibration_Master: 'http://10.0.0.11:3000/api/calibrationmaster',
//   Monthly_report: 'http://10.0.0.11:3000/api/monthlyReport/filter',
//   Monthly_report_schduleNumber: 'http://10.0.0.11:3000/api/monthlyReport',
//   Card_Code: 'http://10.0.0.11:3000/api/monthlyReport/lastpart',
//   Calibration_Request: 'http://10.0.0.11:3000/api/CalibrationRequest',
//   Calibration_Entry: 'http://10.0.0.11:3000/api/CalibrationEntry',
//   MasterCaliRequest: 'http://10.0.0.11:3000/api/CalibrationRequestType',
//   CalibrationLocationmaster:
//     'http://10.0.0.11:3000/api/CalibrationLocationmaster',
//   BreakageDetails: 'http://10.0.0.11:3000/api/BreakageDetails',
//   IssueReturn: 'http://10.0.0.11:3000/api/IssueReturn',
//   return: 'http://10.0.0.11:3000/api/return',
//   BreakageRequest: 'http://10.0.0.11:3000/api/BreakageRequest',
//   BreakageListDetails: 'http://10.0.0.11:3000/api/BreakageListDetails',
//   ReturnList: 'http://10.0.0.11:3000/api/ReturnList/data',
//   ScrapApproval: 'http://10.0.0.11:3000/api/ScrapApproval/data',
//   ScrapApprovalList: 'http://10.0.0.11:3000/api/ScrapApprovalList/data',
//   calibrationtype: 'http://10.0.0.11:3000/api/calibrationtype',
//   CalibrationMasterList: 'http://10.0.0.11:3000/api/CalibrationMasterList',
//   CalibrationReport: 'http://10.0.0.11:3000/api/CalibrationReport',
//   CalibratuionMasterListReport:
//     'http://10.0.0.11:3000/api/CalibratuionMasterListReport',
//   fileupload: 'http://10.0.0.11:3000/api/file',
//   Useraccess: 'http://10.0.0.11:3000/api/useraccess',
//   Moduledescription: 'http://10.0.0.11:3000/api/iddescription',
//   Ohem: 'http://10.0.0.11:3000/api/ohem',
//   RaiseDC: 'http://10.0.0.11:3000/api/RaiseDC',

//   uploadurl: 'http://10.0.0.11:3001',
// };

export const environment = {
  production: false,
  url: 'http://localhost:3000/api/category',
  Typeurl: 'http://localhost:3000/api/type',
  Makeurl: 'http://localhost:3000/api/make',
  Instrument: 'http://localhost:3000/api/Instrument',
  Ohem: 'http://localhost:3000/api/ohem',
  Equipment: 'http://localhost:3000/api/equipment',
  Gauges: 'http://localhost:3000/api/gauges',
  Login: 'http://localhost:3000/api/auth',
  Master: 'http://localhost:3000/api/master',
  Calibration_Master: 'http://localhost:3000/api/calibrationmaster',
  Monthly_report: 'http://localhost:3000/api/monthlyReport/filter',
  Monthly_report_schduleNumber: 'http://localhost:3000/api/monthlyReport',
  Card_Code: 'http://localhost:3000/api/monthlyReport/lastpart',
  Calibration_Request: 'http://localhost:3000/api/CalibrationRequest',
  RaiseDC: 'http://localhost:3000/api/RaiseDC',
  Calibration_Entry: 'http://localhost:3000/api/CalibrationEntry',
  MasterCaliRequest: 'http://localhost:3000/api/CalibrationRequestType',
  CalibrationLocationmaster:
    'http://localhost:3000/api/CalibrationLocationmaster',
  BreakageDetails: 'http://localhost:3000/api/BreakageDetails',
  IssueReturn: 'http://localhost:3000/api/IssueReturn',
  return: 'http://localhost:3000/api/return',
  BreakageRequest: 'http://localhost:3000/api/BreakageRequest',
  BreakageListDetails: 'http://localhost:3000/api/BreakageListDetails',
  ReturnList: 'http://localhost:3000/api/ReturnList/data',
  ScrapApproval: 'http://localhost:3000/api/ScrapApproval/data',
  ScrapApprovalList: 'http://localhost:3000/api/ScrapApprovalList/data',
  calibrationtype: 'http://localhost:3000/api/calibrationtype',
  CalibrationMasterList: 'http://localhost:3000/api/CalibrationMasterList',
  CalibrationReport: 'http://localhost:3000/api/CalibrationReport',
  CalibratuionMasterListReport:
    'http://localhost:3000/api/CalibratuionMasterListReport',
  fileupload: 'http://localhost:3000/api/file',
  Useraccess: 'http://localhost:3000/api/useraccess',
  Moduledescription: 'http://localhost:3000/api/iddescription',
  uploadurl: 'http://localhost:3001',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
