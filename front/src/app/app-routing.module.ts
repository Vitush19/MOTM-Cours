import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUsersComponent} from './pages/list-users/list-users.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {HomeComponent} from './pages/home/home.component';
import {TemplateComponent} from './pages/template/template.component';
import {EditUserComponent} from './pages/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: ListUsersComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'add-user', component: AddUserComponent},
    { path: 'edit-user/:id', component: EditUserComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
