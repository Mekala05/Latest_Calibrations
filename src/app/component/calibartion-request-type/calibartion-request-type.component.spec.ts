import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibartionRequestTypeComponent } from './calibartion-request-type.component';

describe('CalibartionRequestTypeComponent', () => {
  let component: CalibartionRequestTypeComponent;
  let fixture: ComponentFixture<CalibartionRequestTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibartionRequestTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibartionRequestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
