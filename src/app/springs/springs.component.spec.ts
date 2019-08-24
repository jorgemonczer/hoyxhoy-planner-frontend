import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringsComponent } from './springs.component';

describe('SpringsComponent', () => {
  let component: SpringsComponent;
  let fixture: ComponentFixture<SpringsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpringsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
