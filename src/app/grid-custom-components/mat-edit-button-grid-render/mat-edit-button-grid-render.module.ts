import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatEditButtonGridRenderComponent } from './mat-edit-button-grid-render.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [MatEditButtonGridRenderComponent],
  declarations: [ MatEditButtonGridRenderComponent ]
})
export class MatEditButtonGridRenderModule { }
