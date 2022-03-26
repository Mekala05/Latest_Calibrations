import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, Routingcomponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
// import { TablePagination } from '@mui/material';
import { MatIconModule } from '@angular/material/icon';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoaderModule } from './shared/loader/loader.module';
import { ConfirmationService } from 'primeng/api';
import { LoaderInterceptor } from './shared/loaders/loaderInter';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePipe } from '@angular/common';
import { CatogerymasterComponent } from './component/catogerymaster/catogerymaster.component';
import { TypemasterComponent } from './component/typemaster/typemaster.component';
import { IntrumentmasterComponent } from './component/intrumentmaster/intrumentmaster.component';
import { EquipmentmasterComponent } from './component/equipmentmaster/equipmentmaster.component';
import { GaugesmasterComponent } from './component/gaugesmaster/gaugesmaster.component';
import { MakemasterComponent } from './component/makemaster/makemaster.component';
import { CalibrationmasterComponent } from './component/calibrationmaster/calibrationmaster.component';
import { MonthlycalibrationscheduleComponent } from './component/Entries/monthlycalibrationschedule/monthlycalibrationschedule.component';
import { CalibrationrequstComponent } from './component/Entries/calibrationrequst/calibrationrequst.component';
import {
  CalibrationentryComponent,
  DialogContent,
  rejectionmodalbox,
  conditionalRejection,
} from './component/Entries/calibrationentry/calibrationentry.component';
import { IssuereturnComponent } from './component/Entries/issuereturn/issuereturn.component';
import {
  BreagedetailsComponent,
  DialogContentExampleDialog,
  DialogOverviewExampleDialog,
  conrejection2,
} from './component/Entries/breagedetails/breagedetails.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SearchfilterPipe } from './shared/pipe/searchfilter.pipe';
import { CalibartionRequestTypeComponent } from './component/calibartion-request-type/calibartion-request-type.component';
import { LocationmasterComponent } from './component/locationmaster/locationmaster.component';
import { ReturnComponent } from './component/return/return.component';
import { BreakageRequestComponent } from './component/breakage-request/breakage-request.component';
import { ReturnListComponent } from './return-list/return-list.component';
import { BreakageListDetailsComponent } from './breakage-list-details/breakage-list-details.component';
import {
  conditionalRejections,
  ScrapApprovalComponent,
} from './scrap-approval/scrap-approval.component';
import { ScrapApprovalListComponent } from './scrap-approval-list/scrap-approval-list.component';
import { CalibrationtypeComponent } from './calibrationtype/calibrationtype.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import {
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { CalibrationmasterlistComponent } from './component/calibrationmasterlist/calibrationmasterlist.component';
import { MatTableModule } from '@angular/material/table';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CalibrationReportComponent } from './calibration-report/calibration-report.component';
import { CalibrationMasterListReportComponent } from './calibration-master-list-report/calibration-master-list-report.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { NgxFileDropModule } from 'ngx-file-drop';
import { DataTablesModule } from 'angular-datatables';
import { UseraccessComponent } from './useraccess/useraccess.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { BreakageModule } from './breakage-list-details/breakage-list-details.module';

@NgModule({
  declarations: [
    AppComponent,
    Routingcomponent,
    CalibrationmasterComponent,
    CatogerymasterComponent,
    TypemasterComponent,
    IntrumentmasterComponent,
    EquipmentmasterComponent,
    GaugesmasterComponent,
    MakemasterComponent,
    MonthlycalibrationscheduleComponent,
    CalibrationrequstComponent,
    CalibrationentryComponent,
    IssuereturnComponent,
    BreagedetailsComponent,
    DialogContentExampleDialog,
    SearchfilterPipe,
    CalibartionRequestTypeComponent,
    LocationmasterComponent,
    ReturnComponent,
    BreakageRequestComponent,
    ReturnListComponent,
    BreakageListDetailsComponent,
    ScrapApprovalComponent,
    ScrapApprovalListComponent,
    CalibrationtypeComponent,
    DialogOverviewExampleDialog,
    rejectionmodalbox,
    conrejection2,
    conditionalRejection,
    conditionalRejections,
    DialogContent,
    CalibrationmasterlistComponent,
    CalibrationReportComponent,
    CalibrationMasterListReportComponent,
    UseraccessComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    LoaderModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    // NgxFileDropModule,
    // TablePagination,
    MatTableModule,
    DataTablesModule.forRoot(),
    MultiSelectModule,
    // BreakageModule,
    NgMultiSelectDropDownModule.forRoot(),
    // DatePipe,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
    }),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    AutoCompleteModule,
    MatNativeDateModule,
    MaterialExampleModule,
    MatDialogModule,
    MatPaginatorModule,
    HttpClientModule,
    PdfViewerModule,

    // MatPaginator,
    // Ng2SearchPipeModule
  ],
  providers: [
    DatePipe,
    BnNgIdleService,
    ConfirmationService,

    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
