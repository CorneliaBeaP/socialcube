import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent} from "./administration/userlist/user-list/user-list.component";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./auth/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {AdministrationComponent} from "./administration/administration.component";

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdministrationComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
