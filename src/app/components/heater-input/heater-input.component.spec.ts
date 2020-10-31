import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaterInputComponent } from './heater-input.component';

describe('HeaterInputComponent', () => {
  let component: HeaterInputComponent;
  let fixture: ComponentFixture<HeaterInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaterInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
