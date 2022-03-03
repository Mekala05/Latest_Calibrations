import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationrequstComponent } from './calibrationrequst.component';

describe('CalibrationrequstComponent', () => {
  let component: CalibrationrequstComponent;
  let fixture: ComponentFixture<CalibrationrequstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationrequstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationrequstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
