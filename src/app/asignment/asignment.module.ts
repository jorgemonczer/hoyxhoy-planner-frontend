import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { AsignmentComponent } from './asignment.component';

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([])
  ],
  declarations: [AsignmentComponent]
})
export class AsignmentModule { }
