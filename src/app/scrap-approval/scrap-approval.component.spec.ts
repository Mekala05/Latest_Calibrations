import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapApprovalComponent } from './scrap-approval.component';

describe('ScrapApprovalComponent', () => {
  let component: ScrapApprovalComponent;
  let fixture: ComponentFixture<ScrapApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
