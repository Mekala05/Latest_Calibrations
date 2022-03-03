import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakageListDetailsComponent } from './breakage-list-details.component';

describe('BreakageListDetailsComponent', () => {
  let component: BreakageListDetailsComponent;
  let fixture: ComponentFixture<BreakageListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakageListDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakageListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
