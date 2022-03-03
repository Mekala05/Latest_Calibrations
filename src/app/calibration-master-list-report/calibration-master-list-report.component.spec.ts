import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationMasterListReportComponent } from './calibration-master-list-report.component';

describe('CalibrationMasterListReportComponent', () => {
  let component: CalibrationMasterListReportComponent;
  let fixture: ComponentFixture<CalibrationMasterListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationMasterListReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationMasterListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
