import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakageRequestComponent } from './breakage-request.component';

describe('BreakageRequestComponent', () => {
  let component: BreakageRequestComponent;
  let fixture: ComponentFixture<BreakageRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakageRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakageRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
