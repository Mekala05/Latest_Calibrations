export interface CalibrationRequest {
  id?: string;
  date?: Date;
  RequestType?: string;
  InstrumentCode?: any;
  InstrumentName?: any;
  LPIdentification?: string;
  Party?: any;
  Quantity?: string;
  RaiseDc?: string;
  calibrationlocation?: string;
  calibrationtype?: string;
  BreakageNo?: string;
  Requesttypeselected?: any;
  Active?: boolean;
}

export interface RaiseDC {
  refno?: string;
  id?: string;
  date?: Date;
  RequestType?: string;
  InstrumentCode?: any;
  InstrumentName?: any;
  LPIdentification?: string;
  Party?: any;
  Quantity?: string;
  RaiseDc?: string;
  calibrationlocation?: string;
  calibrationtype?: string;
  BreakageNo?: string;
  Requesttypeselected?: any;
  Active?: boolean;
}
