import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { SpringsComponent } from './springs/springs.component';
import { FeaturesComponent } from './backlog/features.component';
import { AsignmentComponent } from './asignment/asignment.component';
import { CapacityComponent } from './capacity/capacity.component';
import { SpendingComponent } from './spending/spending.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { OutlookComponent } from './outlook/outlook.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'springs', component: SpringsComponent },
  { path: 'backlog', component: FeaturesComponent },
  { path: 'asignment', component: AsignmentComponent },
  { path: 'capacity', component: CapacityComponent },
  { path: 'spending', component: SpendingComponent },
  { path: 'holidays', component: HolidaysComponent },
  { path: 'outlook', component: OutlookComponent },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
