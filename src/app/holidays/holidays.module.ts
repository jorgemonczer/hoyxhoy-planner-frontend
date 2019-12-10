import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { HolidaysComponent } from './holidays.component';

@NgModule({
  declarations: [HolidaysComponent],
  imports: [
    SharedModule,
    AgGridModule.withComponents([])  ]
})
export class HolidaysModule { }
