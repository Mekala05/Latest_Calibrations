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
  file?: File;
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
}

export interface Image {
  headerImages?: string | Blob;
  errorDescription?: string | Blob;
}
