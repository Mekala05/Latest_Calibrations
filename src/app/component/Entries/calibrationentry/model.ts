export interface calibrationEntry {
  id?: Number;
  date?: Date;
  ScheduleNo?: any;
  InstrumentCode?: any;
  InstrumentName?: any;
  LPIdentification?: string;
  partySelection?: any;
  Quantity?: string;
  collabrationCost?: Number;
  DCDetails?: string;
  ReportNo?: string;
  ReportDate?: Date;
  RequestType?: string;
  Description?: string;
  Specification?: string;
  Observation?: string;
  MxLifeTimeNumber?: string;
  MxLifeTime?: string;
  Remark?: string;
  fileErrorDiscription?: File;
  Requesttypeselected?: any;
  status?: string;
  option?: string;
  conditionRemark?: string;
}

export interface EntryErrorDescription {
  InstrumentCode?: string;
  InstrumentName?: string;
  Description?: string;
  Remark?: string;
  Observation?: string;
  Specification?: string;
  active?: boolean;
  id?: Number;
}

export interface MultipleFiles {
  filename?: string;
  instrumentCode?: string;
  instrumentName?: string;
  filepath?: string;
  type?: string;
  active?: boolean;
  ids?: Number;
  // ErrorReferenceCode?: string;
}
