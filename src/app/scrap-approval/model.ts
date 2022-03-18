export interface ScrapApproval {
  id?: Number;
  date?: Date;
  InstrumentCode?: string;
  InstrumentName?: string;
  // MachineCode?:string;
  Location?: string;
  // EmployeeCode?:string;
  // EmployeeName?:string;
  // Employee?:string;
  // HistryDetails?:string;
  BreakageReason?: string;
  Type?: string;
  FileUpload?: File;
  file?: File;
  Approve?: boolean;
  Reject?: boolean;
}
