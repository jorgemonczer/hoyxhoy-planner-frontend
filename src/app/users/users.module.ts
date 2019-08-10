import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

import { UsersComponent } from './users.component';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([])
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
