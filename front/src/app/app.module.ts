import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { MailTemplateComponent } from './mail-template/mail-template.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    AddUserComponent,
    MailTemplateComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }