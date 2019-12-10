import { NgModule } from '@angular/core';
import { OutlookComponent } from './outlook.component';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [OutlookComponent],
  imports: [
    SharedModule,
    AgGridModule.withComponents([])
  ]
})
export class OutlookModule { }
