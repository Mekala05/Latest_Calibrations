export interface EmployeeAccess {
  unit: string;
  department: string;
  employeeid: string;
}

export interface EmployeeAccessDetails {
  view: boolean;
  Edit: boolean;
  moduleid: string;
  ModuleidDescription: string;
  employeeid: string;
  unit: string;
  department: string;
}
