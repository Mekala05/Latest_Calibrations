import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationentryComponent } from './calibrationentry.component';

describe('CalibrationentryComponent', () => {
  let component: CalibrationentryComponent;
  let fixture: ComponentFixture<CalibrationentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
