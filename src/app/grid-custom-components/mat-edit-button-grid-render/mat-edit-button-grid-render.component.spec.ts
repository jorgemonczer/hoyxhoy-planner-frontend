import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatEditButtonGridRenderComponent } from './mat-edit-button-grid-render.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

describe('MatRemoveButtonGridRenderComponent', () => {
  let component: MatEditButtonGridRenderComponent;
  let fixture: ComponentFixture<MatEditButtonGridRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatEditButtonGridRenderComponent ],
      imports : [ MatIconModule, MatButtonModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatEditButtonGridRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
