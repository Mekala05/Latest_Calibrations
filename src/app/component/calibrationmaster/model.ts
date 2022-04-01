export interface master {
  id?: Number;
  category?: string;
  type?: string;
  MasterType?: string;
  InstrumentCode?: string;
  InstrumentName?: string;
  make?: string;
  range?: string;
  masterspecification?: string;
  CurrentLocation?: string;
  date?: Date;
  MxLifeTime?: string;
  MxLifeTimeNumber?: string;
  Location?: string;
  file?: string[];
  filepath?: string[];
  active?: boolean;
  amccheckbox?: boolean;
  Description?: string;
  Specification?: string;
  Observation?: string;
  Remark?: string;
  fileErrorDiscription?: File;
  InstrumentRefferenceCode?: string;
  SAPRefferenceCode?: string;
  Department?: string;
  dueDate?: Date;
  headerImage?: string;
  headerImagepath?: string;
  // ErrorReferenceCode?: string;
}

export interface Image {
  headerImages?: string | Blob;
  errorDescription?: string | Blob;
}

export interface MultipleImage {
  filename?: string;
  instrumentCode?: string;
  instrumentName?: string;
  filepath?: string;
  type?: string;
  active?: boolean;
  ids?: Number;
  // ErrorReferenceCode?: string;
}
