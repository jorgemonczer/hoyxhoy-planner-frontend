import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { CapacityComponent } from './capacity.component';

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([])
  ],
  declarations: [CapacityComponent]
})
export class CapacityModule { }
