import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProjectsModule } from './projects/projects.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { MatIconModule, MatMenuModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    ProjectsModule,
    UsersModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule    
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
