import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./helpers/auth/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {AdministrationComponent} from "./administration/administration.component";
import {ErrorpageComponent} from "./error/errorpage/errorpage.component";
import {AdminGuard} from "./helpers/auth/admin.guard";
import {Page404Component} from "./error/page404/page404.component";
import {StartredirecterComponent} from "./startredirecter/startredirecter.component";

/**
 * Information about which component that should be shown when navigating to different urls
 */
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdministrationComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'error', component: ErrorpageComponent},
  {path: '', component: StartredirecterComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
