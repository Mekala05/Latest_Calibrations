import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugesmasterComponent } from './gaugesmaster.component';

describe('GaugesmasterComponent', () => {
  let component: GaugesmasterComponent;
  let fixture: ComponentFixture<GaugesmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugesmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugesmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
