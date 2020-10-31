import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityGaugeComponent } from './humidity-gauge.component';

describe('HumidityGaugeComponent', () => {
  let component: HumidityGaugeComponent;
  let fixture: ComponentFixture<HumidityGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumidityGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumidityGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
