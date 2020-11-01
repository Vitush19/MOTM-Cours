import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUsersComponent} from './pages/list-users/list-users.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {HomeComponent} from './pages/home/home.component';
import {TemplateComponent} from './pages/template/template.component';
import { MailTemplateComponent } from './mail-template/mail-template.component';
import {EditUserComponent} from './pages/edit-user/edit-user.component';
import { MotmComponent } from './pages/motm/motm.component';

const routes: Routes = [
    { path: '', data:{navbar: true}, component: HomeComponent },
    { path: 'user',  data:{navbar: true}, component: ListUsersComponent },
    { path: 'add-user', data:{navbar: true}, component: AddUserComponent },
    { path: 'mail-template/:id', data:{navbar: false}, component: MailTemplateComponent },
    { path: 'templates', data:{navbar: true}, component: TemplateComponent },
    { path: 'edit-user/:id', data:{navbar: true}, component: EditUserComponent},
    { path: 'motm', data:{navbar: true}, component: MotmComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
