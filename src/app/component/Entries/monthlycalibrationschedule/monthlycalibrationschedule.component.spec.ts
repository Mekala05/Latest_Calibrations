import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlycalibrationscheduleComponent } from './monthlycalibrationschedule.component';

describe('MonthlycalibrationscheduleComponent', () => {
  let component: MonthlycalibrationscheduleComponent;
  let fixture: ComponentFixture<MonthlycalibrationscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlycalibrationscheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlycalibrationscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
