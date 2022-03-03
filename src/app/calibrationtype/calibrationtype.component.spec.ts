import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationtypeComponent } from './calibrationtype.component';

describe('CalibrationtypeComponent', () => {
  let component: CalibrationtypeComponent;
  let fixture: ComponentFixture<CalibrationtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
