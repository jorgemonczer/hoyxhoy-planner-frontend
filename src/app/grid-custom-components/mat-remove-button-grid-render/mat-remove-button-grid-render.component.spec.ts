import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatRemoveButtonGridRenderComponent } from './mat-remove-button-grid-render.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

describe('MatRemoveButtonGridRenderComponent', () => {
  let component: MatRemoveButtonGridRenderComponent;
  let fixture: ComponentFixture<MatRemoveButtonGridRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatRemoveButtonGridRenderComponent ],
      imports : [ MatIconModule, MatButtonModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatRemoveButtonGridRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
