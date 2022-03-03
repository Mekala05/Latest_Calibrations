import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrumentmasterComponent } from './intrumentmaster.component';

describe('IntrumentmasterComponent', () => {
  let component: IntrumentmasterComponent;
  let fixture: ComponentFixture<IntrumentmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrumentmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrumentmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
