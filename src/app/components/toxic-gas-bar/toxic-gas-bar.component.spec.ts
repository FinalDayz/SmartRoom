import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicGasBarComponent } from './toxic-gas-bar.component';

describe('ToxicGasBarComponent', () => {
  let component: ToxicGasBarComponent;
  let fixture: ComponentFixture<ToxicGasBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToxicGasBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicGasBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
