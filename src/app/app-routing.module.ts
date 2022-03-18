import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { CatogerymasterComponent } from './component/catogerymaster/catogerymaster.component';
import { CalibrationmasterComponent } from './component/calibrationmaster/calibrationmaster.component';
import { MakemasterComponent } from './component/makemaster/makemaster.component';
import { GaugesmasterComponent } from './component/gaugesmaster/gaugesmaster.component';
import { EquipmentmasterComponent } from './component/equipmentmaster/equipmentmaster.component';
import { IntrumentmasterComponent } from './component/intrumentmaster/intrumentmaster.component';
import { TypemasterComponent } from './component/typemaster/typemaster.component';
import { CalibrationentryComponent } from './component/Entries/calibrationentry/calibrationentry.component';
import { CalibrationrequstComponent } from './component/Entries/calibrationrequst/calibrationrequst.component';
import { MonthlycalibrationscheduleComponent } from './component/Entries/monthlycalibrationschedule/monthlycalibrationschedule.component';
import { IssuereturnComponent } from './component/Entries/issuereturn/issuereturn.component';
import { BreagedetailsComponent } from './component/Entries/breagedetails/breagedetails.component';
import { CalibartionRequestTypeComponent } from './component/calibartion-request-type/calibartion-request-type.component';
import { LocationmasterComponent } from './component/locationmaster/locationmaster.component';
import { ReturnComponent } from './component/return/return.component';
import { BreakageRequestComponent } from './component/breakage-request/breakage-request.component';
import { ReturnListComponent } from './return-list/return-list.component';
import { BreakageListDetailsComponent } from './breakage-list-details/breakage-list-details.component';
import { ScrapApprovalComponent } from './scrap-approval/scrap-approval.component';
import { ScrapApprovalListComponent } from './scrap-approval-list/scrap-approval-list.component';
import { CalibrationtypeComponent } from './calibrationtype/calibrationtype.component';
import { CalibrationmasterlistComponent } from './component/calibrationmasterlist/calibrationmasterlist.component';
import { CalibrationReportComponent } from './calibration-report/calibration-report.component';
import { CalibrationMasterListReportComponent } from './calibration-master-list-report/calibration-master-list-report.component';

const routes: Routes = [
  { path: 'login', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
    children: [
      {
        path: 'category',
        component: CatogerymasterComponent,
      },
      {
        path: 'Type',
        component: TypemasterComponent,
      },
      {
        path: 'Intrument',
        component: IntrumentmasterComponent,
      },
      {
        path: 'Equipment',
        component: EquipmentmasterComponent,
      },
      {
        path: 'Gauges',
        component: GaugesmasterComponent,
      },
      {
        path: 'Make',
        component: MakemasterComponent,
      },
      {
        path: 'Calibration',
        component: CalibrationmasterComponent,
      },
      {
        path: 'CalibrationNew',
        component: CalibrationmasterComponent,
      },
      {
        path: 'Schedule',
        component: MonthlycalibrationscheduleComponent,
      },
      {
        path: 'calibrationrequest',
        component: CalibrationrequstComponent,
      },

      {
        path: 'calibrationentry',
        component: CalibrationentryComponent,
      },
      {
        path: 'IssueReturn',
        component: IssuereturnComponent,
      },
      {
        path: 'BreakageDetails',
        component: BreagedetailsComponent,
      },
      // {
      //   path: 'BreakageDetails2',
      //   component: BreagedetailsComponent,
      // },
      {
        path: 'update',
        component: CatogerymasterComponent,
      },
      {
        path: 'CalibrationRequestType',
        component: CalibartionRequestTypeComponent,
      },
      {
        path: 'CalibrationLocationmaster',
        component: LocationmasterComponent,
      },
      {
        path: 'Return',
        component: ReturnComponent,
      },
      {
        path: 'Return2',
        component: ReturnComponent,
      },

      {
        path: 'BreakageRequest',
        component: BreakageRequestComponent,
      },

      {
        path: 'ReturnList',
        component: ReturnListComponent,
      },

      {
        path: 'BreakageListDetails',
        component: BreakageListDetailsComponent,
      },
      {
        path: 'ScrapApproval',
        component: ScrapApprovalComponent,
      },
      {
        path: 'ScrapApprovalList',
        component: ScrapApprovalListComponent,
      },
      {
        path: 'Calibrationtype',
        component: CalibrationtypeComponent,
      },
      {
        path: 'Calibrationmasterlist',
        component: CalibrationmasterlistComponent,
      },

      {
        path: 'CalibrationReport',
        component: CalibrationReportComponent,
      },

      {
        path: 'CalibrationMasterListReport',
        component: CalibrationMasterListReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const Routingcomponent = [LoginComponent, HeaderComponent];
