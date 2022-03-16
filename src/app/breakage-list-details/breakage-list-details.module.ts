import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakageListDetailsComponent } from './breakage-list-details.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [BreakageListDetailsComponent],
  imports: [CommonModule, DataTablesModule],
  exports: [],
})
export class BreakageModule {}
