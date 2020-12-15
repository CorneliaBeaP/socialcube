import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./auth/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {AdministrationComponent} from "./administration/administration.component";
import {ErrorpageComponent} from "./error/errorpage/errorpage.component";
import {AdminGuard} from "./auth/admin.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdministrationComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'error', component: ErrorpageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
