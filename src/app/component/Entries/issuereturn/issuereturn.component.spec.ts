import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuereturnComponent } from './issuereturn.component';

describe('IssuereturnComponent', () => {
  let component: IssuereturnComponent;
  let fixture: ComponentFixture<IssuereturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuereturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuereturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
