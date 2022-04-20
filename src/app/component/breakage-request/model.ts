export interface BreakageRequest {
  id?: Number;
  date?: Date;
  InstrumentCode?: string;
  InstrumentName?: string;
  MachineCode?: string;
  Location?: string;
  // EmployeeCode?:string;
  EmployeeName?: string;
  Employee?: string;
  HistryDetails?: string;
  BreakageReason?: string;
  BreakageNo?: string;
  Type?: string;
  FileUpload?: File;
  file?: File;
  RefNo?: string;
}

export interface Attachment {
  breakageNo?: string;
  InstrumentCode?: string;
  filename?: string;
  filepath?: string;
  type?: string;
  active?: boolean;
}
