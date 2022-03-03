import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationmasterComponent } from './calibrationmaster.component';

describe('CalibrationmasterComponent', () => {
  let component: CalibrationmasterComponent;
  let fixture: ComponentFixture<CalibrationmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
