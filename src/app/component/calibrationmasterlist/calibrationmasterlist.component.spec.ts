import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationmasterlistComponent } from './calibrationmasterlist.component';

describe('CalibrationmasterlistComponent', () => {
  let component: CalibrationmasterlistComponent;
  let fixture: ComponentFixture<CalibrationmasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationmasterlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationmasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
