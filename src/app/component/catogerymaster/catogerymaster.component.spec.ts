import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatogerymasterComponent } from './catogerymaster.component';

describe('CatogerymasterComponent', () => {
  let component: CatogerymasterComponent;
  let fixture: ComponentFixture<CatogerymasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatogerymasterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatogerymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
