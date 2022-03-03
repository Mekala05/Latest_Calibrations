import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreagedetailsComponent } from './breagedetails.component';

describe('BreagedetailsComponent', () => {
  let component: BreagedetailsComponent;
  let fixture: ComponentFixture<BreagedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreagedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreagedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
