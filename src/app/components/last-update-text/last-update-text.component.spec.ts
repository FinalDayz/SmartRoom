import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastUpdateTextComponent } from './last-update-text.component';

describe('LastUpdateTextComponent', () => {
  let component: LastUpdateTextComponent;
  let fixture: ComponentFixture<LastUpdateTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastUpdateTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastUpdateTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
