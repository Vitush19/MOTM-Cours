import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { TemplateComponent } from './pages/template/template.component';
import { MonthDetailsComponent } from './pages/home/month-details/month-details.component';
import { MailTemplateComponent } from './mail-template/mail-template.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { DatePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';
import { MotmComponent } from './pages/motm/motm.component';


@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    AddUserComponent,
    HomeComponent,
    TemplateComponent,
    MonthDetailsComponent,
    MailTemplateComponent,
    EditUserComponent,
    DeleteUserComponent,
    MotmComponent
  ],
  entryComponents: [
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    Ng2SmartTableModule,
    NgbModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
