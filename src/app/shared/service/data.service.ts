import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const server = environment.url;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: {},
  body: {},
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private setImageViewPopup: any;
  // public setImageViewPopupObserve: Observable<string>;
  adminSubject$ = new BehaviorSubject<any>(null);
  admin = this.adminSubject$.asObservable();
  scrapDetails$ = new BehaviorSubject<any>(null);
  scrap = this.scrapDetails$.asObservable();

  constructor(private http: HttpClient) {
    // this.setImageViewPopup = new BehaviorSubject('');
    // this.setImageViewPopupObserve = this.setImageViewPopup.asObservable();
  }

  // Login Api
  loginPost(data: any) {
    return this.http.post<any>(`${environment.Login}/login`, data);
  }

  getView_loginPost() {
    return this.http.get<any>(`${environment.url}/viewemail`);
  }

  // updateParticular(id: any, data: any) {
  //   console.log(id, data);

  //   return this.http.put<any>(
  //     `${environment.Calibration_Master}/update1/${id}`,
  //     data
  //   );
  // }

  setAdmin(data: any) {
    this.adminSubject$.next(data);
  }

  setScrapDetails(data: any) {
    this.scrapDetails$.next(data);
  }

  // Categroy Master Api
  getView() {
    return this.http.get<any>(`${environment.url}/view`);
  }
  postUser(data: any) {
    return this.http.post<any>(`${environment.url}/insert`, data);
  }
  DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(`${environment.url}/delete/${id}`, data);
  }
  updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.url}/update/${id}`, data);
  }
  getUserById(id: any) {
    // console.log(id +"111111111")
    return this.http.get<any>(`${environment.url}/${id}`);
  }

  get(endpoint: string, params = {}): Observable<any> {
    httpOptions.params = params;
    return this.http.get(server + endpoint, httpOptions);
  }

  post(endpoint: string, body = {}, params = {}): Observable<any> {
    httpOptions.params = params;
    return this.http.post(server + endpoint, body, httpOptions);
  }

  posts(endpoint: string, body: any): Observable<any> {
    return this.http.post(server + endpoint, body);
  }

  put(endpoint: string, body = {}, params = {}): Observable<any> {
    httpOptions.params = params;
    return this.http.patch(server + endpoint, body, httpOptions);
  }

  delete(endpoint: string, params = {}, bodyParams = {}): Observable<any> {
    httpOptions.params = params;
    httpOptions.body = bodyParams;
    return this.http.delete(server + endpoint, httpOptions);
  }

  getfromAssest(path: string, option = {}): Observable<any> {
    return this.http.get(path, option);
  }

  // File upload

  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();

  //   formData.append('file', file);

  //   const req = new HttpRequest('POST', `${server}/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });

  //   return this.http.request(req);
  // }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${server}/files`);
  // }

  // Type Master Api
  type_getView() {
    return this.http.get<any>(`${environment.Typeurl}/view`);
  }
  type_postUser(data: any) {
    return this.http.post<any>(`${environment.Typeurl}/insert`, data);
  }
  type_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(`${environment.Typeurl}/delete/${id}`, data);
  }
  // Deleteinstrumentmaster(id: any, data: any) {
  //   return this.http.put<any>(`${environment.Typeurl}/delete/${id}`, data);
  // }
  type_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.Typeurl}/update/${id}`, data);
  }

  // MakeMaster Api
  make_getView() {
    return this.http.get<any>(`${environment.Makeurl}/view`);
  }
  make_postUser(data: any) {
    return this.http.post<any>(`${environment.Makeurl}/insert`, data);
  }
  make_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(`${environment.Makeurl}/delete/${id}`, data);
  }
  make_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.Makeurl}/update/${id}`, data);
  }

  // Instrument Master Api
  instrument_getView() {
    return this.http.get<any>(`${environment.Instrument}/view`);
  }
  // Instrument Master Api
  calibrationmaster_getView() {
    return this.http.get<any>(`${environment.Calibration_Master}/view`);
  }

  //download calibration master

  // getViewdownload() {
  //   return this.http.get<any>(`${environment.Calibration_Master}/getFile`);
  // }

  instrument_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.Instrument}/delete/${id}`,
      data
    );
  }
  instrument_postUser(data: any) {
    return this.http.post<any>(`${environment.Instrument}/insert`, data);
  }
  instrument_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.Instrument}/update/${id}`, data);
  }

  // Equipment Master
  Equipment_getView() {
    return this.http.get<any>(`${environment.Equipment}/view`);
  }
  Equipment_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(`${environment.Equipment}/delete/${id}`, data);
  }
  Equipment_postUser(data: any) {
    return this.http.post<any>(`${environment.Equipment}/insert`, data);
  }
  Equipment_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.Equipment}/update/${id}`, data);
  }

  // Gauges Master
  Gauges_getView() {
    return this.http.get<any>(`${environment.Gauges}/view`);
  }
  Gauges_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(`${environment.Gauges}/delete/${id}`, data);
  }
  Gauges_postUser(data: any) {
    return this.http.post<any>(`${environment.Gauges}/insert`, data);
  }
  Gauges_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.Gauges}/update/${id}`, data);
  }
  //Get user
  GetEmplyee_user() {
    return this.http.get<any>(`${environment.Login}/userdetails`);
  }

  // Calibartion Master
  MasterTest_getView() {
    return this.http.get<any>(`${environment.Calibration_Master}/view`);
  }

  MasterTest_getViewtablerecord1() {
    return this.http.get<any>(`${environment.Calibration_Master}/tablerecord1`);
  }

  MasterTest_getViewrecalibration() {
    return this.http.get<any>(
      `${environment.Calibration_Master}/recalibration`
    );
  }

  MasterTest_getViewData(id?: any) {
    return this.http.get<any>(
      `${environment.Calibration_Master}/particular1/${id}`
    );
  }

  MasterTest_getView1() {
    return this.http.get<any>(
      `${environment.Calibration_Master}/CalibrationList`
    );
  }
  MasterTest_getViewParticular_getView() {
    return this.http.get<any>(`${environment.Calibration_Master}/view`);
  }
  MasterTest_getViewParticular_getView_sapref() {
    return this.http.get<any>(`${environment.Calibration_Master}/view-sapref`);
  }

  MasterTest_getViewParticular_getView_sapref1(data: any) {
    return this.http.get<any>(
      `${environment.Calibration_Master}/saprefcodeitems/${data}`
    );
  }

  // MasterTest_getViewParticular() {
  //   return this.http.get<any>(`${environment.Calibration_Master}/oitm`);
  // }
  MasterTest_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.Calibration_Master}/delete/${id}`,
      data
    );
  }
  MasterTest_postUser(data: any) {
    return this.http.post<any>(
      `${environment.Calibration_Master}/insert`,
      data
    );
  }

  MasterImage_postUser(image: any) {
    return this.http.post<any>(
      `${environment.Calibration_Master}/single`,
      image
    );
  }

  MasterTest_updateSingleUser(id: any, data: any) {
    console.log(id, data);

    return this.http.put<any>(
      `${environment.Calibration_Master}/update/${id}`,
      data
    );
  }
  // MasterCategory_getView() {
  //   return this.http.get<any>(
  //     `${environment.Calibration_Master}/GetCategory/:categorydata`
  //   );
  // }
  MasterCategory_getView() {
    return this.http.get<any>(`${environment.Calibration_Master}/GetCategory`);
  }

  categorydetails(data: any) {
    return this.http.get<any>(
      `${environment.Calibration_Master}/GetCategory/${data}`
    );
  }
  MasterType_getView() {
    return this.http.get<any>(`${environment.Calibration_Master}/Gettype`);
  }

  typedetails(data: any) {
    return this.http.get<any>(
      `${environment.Calibration_Master}/Gettype/${data}`
    );
  }

  MasterMake_getView() {
    return this.http.get<any>(`${environment.Calibration_Master}/GetMake`);
  }

  locationmasterdepartmet_getView() {
    return this.http.get<any>(`${environment.Calibration_Master}/Department`);
  }

  departmentdata(data: any) {
    return this.http.get<any>(
      `${environment.Calibration_Master}/department/${data}`
    );
  }

  // Entries Screens
  // Monthly schedule
  Monthly_report(year: any, month: any) {
    return this.http.get<any>(
      `${environment.Monthly_report}?year=${year}&month=${month}`
    );
  }

  Monthly_reportsheduleNo() {
    return this.http.get<any>(
      `${environment.Monthly_report_schduleNumber}/sheduleNum`
    );
  }

  Monthly_report_postUser(data: any) {
    return this.http.post<any>(`${environment.Calibration_Entry}/insert`, data);
  }

  MasterTest_getViewsheduleno() {
    return this.http.get<any>(`${environment.Calibration_Entry}/SheduleNo`);
  }

  // Calibration request
  Calibration_request(year: any, month: any) {
    return this.http.get<any>(
      `${environment.Monthly_report}?year=${year}&month=${month}`
    );
  }

  Card_Code() {
    return this.http.get<any>(`${environment.Card_Code}`);
  }
  Request_getView() {
    return this.http.get<any>(`${environment.Calibration_Request}/view`);
  }
  Request_getViewparty() {
    return this.http.get<any>(
      `${environment.Calibration_Request}/viewCardName`
    );
  }
  Request_postUser(data: any) {
    return this.http.post<any>(
      `${environment.Calibration_Request}/insert`,
      data
    );
  }
  Request_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.Calibration_Request}/delete/${id}`,
      data
    );
  }
  Request_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.Calibration_Request}/update/${id}`,
      data
    );
  }

  MasterTest_getViewreservice() {
    return this.http.get<any>(`${environment.Calibration_Request}/reservice`);
  }

  // CalibrationEntry
  Entry_getView() {
    return this.http.get<any>(`${environment.Calibration_Entry}/view`);
  }
  Entry_postUser(data: any) {
    console.log(data);

    return this.http.post<any>(`${environment.Calibration_Entry}/insert`, data);
  }
  Entry_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.Calibration_Entry}/delete/${id}`,
      data
    );
  }
  Entry_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.Calibration_Entry}/update/${id}`,
      data
    );
  }

  Entry_getViewdata(id: any) {
    return this.http.get<any>(
      `${environment.Calibration_Entry}/approval/${id}`
    );
  }

  BreakageNo_getView() {
    return this.http.get<any>(`${environment.BreakageRequest}/BreakageNo`);
  }

  // MasterCalibration_Request
  MasterCali_Request_getView() {
    return this.http.get<any>(`${environment.MasterCaliRequest}/view`);
  }
  MasterCali_Request_postUser(data: any) {
    return this.http.post<any>(`${environment.MasterCaliRequest}/insert`, data);
  }
  MasterCali_Request_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.MasterCaliRequest}/delete/${id}`,
      data
    );
  }
  MasterCali_Request_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.MasterCaliRequest}/update/${id}`,
      data
    );
  }

  // Location master
  Calibrationlocationmaster_getView() {
    return this.http.get<any>(`${environment.CalibrationLocationmaster}/view`);
  }

  CalibrationlocationmasterParticular_getView() {
    return this.http.get<any>(
      `${environment.CalibrationLocationmaster}/viewData`
    );
  }

  Calibrationlocationmastervalue_getView() {
    return this.http.get<any>(
      `${environment.CalibrationLocationmaster}/viewDataname`
    );
  }

  Calibrationlocationmaster_postUser(data: any) {
    return this.http.post<any>(
      `${environment.CalibrationLocationmaster}/insert`,
      data
    );
  }
  Calibrationlocationmaster_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.CalibrationLocationmaster}/delete/${id}`,
      data
    );
  }
  Calibrationlocationmaster_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.CalibrationLocationmaster}/update/${id}`,
      data
    );
  }

  //Breakage Details

  BreakageDetails_getView() {
    return this.http.get<any>(`${environment.BreakageDetails}/view`);
  }
  BreakageDetails_postUser(data: any) {
    return this.http.post<any>(`${environment.BreakageDetails}/insert`, data);
  }
  BreakageDetails_DeleteSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.BreakageDetails}/delete/${id}`,
      data
    );
  }
  BreakageDetails_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.BreakageDetails}/update/${id}`,
      data
    );
  }

  //IssueReturn

  IssueReturn_getView() {
    return this.http.get<any>(`${environment.IssueReturn}/view`);
  }

  IssueReturn_getView3() {
    return this.http.get<any>(`${environment.IssueReturn}/viewData3`);
  }

  IssueReturn_getViewParticular() {
    return this.http.get<any>(`${environment.IssueReturn}/viewData`);
  }
  IssueReturn_postUser(data: any) {
    return this.http.post<any>(`${environment.IssueReturn}/insert`, data);
  }
  IssueReturn_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.IssueReturn}/delete/${id}`,
      data
    );
  }
  IssueReturn_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.IssueReturn}/update/${id}`, data);
  }
  IssueReturn_getViewData(id: any) {
    return this.http.get<any>(`${environment.IssueReturn}/particular/${id}`);
  }

  // Return

  Return_getView() {
    return this.http.get<any>(`${environment.return}/view`);
  }

  Return_getViewParticular() {
    return this.http.get<any>(`${environment.return}/viewData`);
  }
  Return_postUser(data: any) {
    return this.http.post<any>(`${environment.return}/insert`, data);
  }
  Return_DeleteSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.return}/delete/${id}`, data);
  }
  Return_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.return}/update/${id}`, data);
  }

  //Brekagerequest

  BreakageRequest_getView() {
    return this.http.get<any>(`${environment.BreakageRequest}/viewU_ToolNo`);
  }

  BreakageRequestno_getView() {
    return this.http.get<any>(`${environment.BreakageRequest}/Breakageno`);
  }

  BreakageRequest_getView1() {
    return this.http.get<any>(`${environment.BreakageRequest}/view`);
  }

  BreakageRequest_getView2() {
    return this.http.get<any>(`${environment.BreakageRequest}/viewData2`);
  }

  BreakageRequest_getViewParticular() {
    return this.http.get<any>(`${environment.BreakageRequest}/viewData`);
  }

  BreakageRequest_postUser(data: any) {
    return this.http.post<any>(`${environment.BreakageRequest}/insert`, data);
  }
  BreakageRequest_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.BreakageRequest}/delete/${id}`,
      data
    );
  }
  BreakageRequest_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.BreakageRequest}/particular/${id}`,
      data
    );
  }
  BreakageRequest_getViewData(id: any) {
    return this.http.get<any>(
      `${environment.BreakageRequest}/particularidvalue/${id}`
    );
  }

  // BreakageRequest_getViewDatalist(id: any) {
  //   return this.http.get<any>(`${environment.IssueReturn}/particularidvalue/${id}`);
  // }

  // breakage list details

  BreakageListDetails_getView() {
    return this.http.get<any>(`${environment.BreakageRequest}/view`);
  }

  // BreakageListDetails_postUser(data: any) {
  //   return this.http.post<any>(`${environment.return}/insert`, data);
  // }

  BreakageListDetails_postUser(id: any, data: any) {
    return this.http.get<any>(`${environment.BreakageListDetails}/${id}`);
  }

  BreakageListDetails_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(`${environment.return}/delete/${id}`, data);
  }
  BreakageListDetails_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.return}/update/${id}`, data);
  }

  // return list

  ReturnList_getView() {
    return this.http.get<any>(`${environment.ReturnList}/view`);
  }
  ReturnList_postUser(id: any, data: any) {
    // console.log('environment',data);
    return this.http.get<any>(`${environment.ReturnList}/${id}`);
  }
  ReturnList_DeleteSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.ReturnList}/delete/${id}`, data);
  }
  ReturnList_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(`${environment.ReturnList}/update/${id}`, data);
  }

  // scrap approval screen
  ScrapApproval_getView() {
    return this.http.get<any>(`${environment.ScrapApproval}/view`);
  }
  SrapApproval_postUser(data: any) {
    return this.http.post<any>(`${environment.ScrapApproval}/insert`, data);
  }
  ScrapApproval_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.ScrapApproval}/delete/${id}`,
      data
    );
  }
  ScrapApproval_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.ScrapApproval}/update/${id}`,
      data
    );
  }

  //scap approval list
  ScrapApprovalList_getView() {
    return this.http.get<any>(`${environment.ScrapApprovalList}/view`);
  }
  ScrapApprovalList_postUser(data: any) {
    return this.http.post<any>(`${environment.ScrapApprovalList}/insert`, data);
  }
  ScrapApprovalList_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.ScrapApprovalList}/delete/${id}`,
      data
    );
  }
  ScrapApprovalList_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.ScrapApprovalList}/update/${id}`,
      data
    );
  }
  //calibrationtype

  calibrationtype_getView() {
    return this.http.get<any>(`${environment.calibrationtype}/view`);
  }
  calibrationtype_postUser(data: any) {
    return this.http.post<any>(`${environment.calibrationtype}/insert`, data);
  }
  calibrationtype_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.calibrationtype}/delete/${id}`,
      data
    );
  }
  calibrationtype_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.calibrationtype}/update/${id}`,
      data
    );
  }

  // calibrationmasterlist

  calibrationmasterlist_getViewlist() {
    return this.http.get<any>(
      `${environment.CalibrationMasterList}/calibrationlist`
    );
  }

  calibrationmasterlist_getView() {
    return this.http.get<any>(`${environment.CalibrationMasterList}/return`);
  }
  calibrationmasterlist_postUser(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.CalibrationMasterList}/insert`,
      data
    );
  }
  calibrationmasterlist_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.CalibrationMasterList}/delete/${id}`,
      data
    );
  }
  calibrationmasterlist_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.CalibrationMasterList}/update/${id}`,
      data
    );
  }

  // calibrationReport
  CalibrationReport_getView() {
    return this.http.get<any>(`${environment.CalibrationReport}/view`);
  }
  CalibrationReport_postUser(data: any) {
    return this.http.post<any>(`${environment.CalibrationReport}/insert`, data);
  }
  CalibrationReport_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.CalibrationReport}/delete/${id}`,
      data
    );
  }
  CalibrationReport_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.CalibrationReport}/update/${id}`,
      data
    );
  }

  // calibrationmasterlistreport

  // CalibrationReportlist_getView() {
  //   return this.http.get<any>(`${environment.CalibrationReport}/view`);
  // }
  CalibrationReportlist_postUser(data: any) {
    return this.http.post<any>(
      `${environment.CalibratuionMasterListReport}/insert`,
      data
    );
  }
  CalibrationReportlist_DeleteSingleUser(id: any, data: any) {
    return this.http.delete<any>(
      `${environment.CalibratuionMasterListReport}/delete/${id}`,
      data
    );
  }
  CalibrationReportlist_updateSingleUser(id: any, data: any) {
    return this.http.put<any>(
      `${environment.CalibratuionMasterListReport}/update/${id}`,
      data
    );
  }

  //file upload

  fileupload(data: any) {
    return this.http.post<any>(
      `${environment.Calibration_Master}/upload-images`,
      data
    );
  }

  calibrationmaster_saprefcodeitems_get() {
    return this.http.get<any>(
      `${environment.CalibrationReport}/saprefcodeitems`
    );
  }

  // public setImageViewPopupTrigger(data: string): void {
  //   this.setImageViewPopup.next(data);
  // }
}
