import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { SpringsComponent } from './springs.component';
import { NoWeekendValidator } from '../shared/date.weekend.directive';

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    SpringsComponent
  ],
  declarations: [SpringsComponent]
})
export class SpringsModule { }
