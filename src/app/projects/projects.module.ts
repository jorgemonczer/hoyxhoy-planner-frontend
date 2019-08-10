import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

import { ProjectsComponent } from './projects.component';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
