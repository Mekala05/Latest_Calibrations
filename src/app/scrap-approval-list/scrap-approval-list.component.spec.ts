import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapApprovalListComponent } from './scrap-approval-list.component';

describe('ScrapApprovalListComponent', () => {
  let component: ScrapApprovalListComponent;
  let fixture: ComponentFixture<ScrapApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapApprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
