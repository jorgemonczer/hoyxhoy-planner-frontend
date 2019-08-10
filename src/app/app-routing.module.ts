import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
