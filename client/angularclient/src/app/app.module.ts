import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './userlist/user-list/user-list.component';
import { UserService } from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './navigation/header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CreateActivityComponent } from './main/create-activity/create-activity.component';
import {FormsModule} from "@angular/forms";
import { ActivityCardsComponent } from './main/activity-cards/activity-cards.component';
import { CalendarComponent } from './main/calendar/calendar.component';
import { UpcomingActivitiesComponent } from './main/upcoming-activities/upcoming-activities.component';
import { ProfileComponent } from './profile/profile.component';
import { AdministrationComponent } from './administration/administration.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    CreateActivityComponent,
    ActivityCardsComponent,
    CalendarComponent,
    UpcomingActivitiesComponent,
    ProfileComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
