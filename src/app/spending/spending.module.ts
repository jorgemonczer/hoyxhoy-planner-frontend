import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { SpendingComponent } from './spending.component';

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([])
  ],
  declarations: [SpendingComponent]
})
export class SpendingModule { }
