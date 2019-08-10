import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRemoveButtonGridRenderComponent } from './mat-remove-button-grid-render.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [MatRemoveButtonGridRenderComponent],
  declarations: [ MatRemoveButtonGridRenderComponent ]
})
export class MatRemoveButtonGridRenderModule { }
