import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { FeaturesComponent } from './features.component';

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([])
  ],
  declarations: [FeaturesComponent]
})
export class FeaturesModule { }
