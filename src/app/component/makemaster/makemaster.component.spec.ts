import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakemasterComponent } from './makemaster.component';

describe('MakemasterComponent', () => {
  let component: MakemasterComponent;
  let fixture: ComponentFixture<MakemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
