import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUsersComponent} from './pages/list-users/list-users.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import { MailTemplateComponent } from './mail-template/mail-template.component';
import { TemplateComponent } from './template/template.component';



const routes: Routes = [
    { path: '',  data:{navbar: true}, component: ListUsersComponent },
    { path: 'list',  data:{navbar: true}, component: ListUsersComponent },
    { path: 'add-user',  data:{navbar: true}, component: AddUserComponent },
    { path: 'mail-template', data:{navbar: false}, component: MailTemplateComponent },
    { path: 'templates', data:{navbar: true}, component: TemplateComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
