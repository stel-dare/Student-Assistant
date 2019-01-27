import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";
import { MomentModule } from 'angular2-moment';


//Components
import { LoginComponent } from "./login/login.component";
import { HomeComponent }  from "./home/home.component";
import { DrawerComponent }  from "./drawer/drawer.component";
import { CourseComponent }  from "./courses/courses.component";
import { CourseDetailComponent }  from "./courseDetail/courseDetail.component";
import { TimetableAndEventsComponent }  from "./timetableAndEvents/timetableAndEvents.component";
import { ClassScheduleComponent }  from "./classSchedule/classSchedule.component";
import { CollegeEventsComponent }  from "./collegeEvents/collegeEvents.component";
import { MyTasksComponent }  from "./myTasks/myTasks.component";
import { ForumHomeComponent } from "./forum/forumHome.component";
import { ForumChatComponent } from "./forum/forumChat.component";
import { ProfileComponent } from "./profile/profile.component";
import { AboutUsComponent } from "./AboutUs/AboutUs.component";
import { ModalComponent } from "./forum/tag.modal";

//Services
import { CourseService } from "./courses/courseService.service";
import { TimeTableService } from "./classSchedule/timetableService.service";
import { AuthRoute } from "./login/authRouteService.service";
import { Outline } from "./courseDetail/courseDetailService.service";
import { EventService  } from "./collegeEvents/eventService.service";
import { EventsToCalender  } from "./collegeEvents/eventsToCalender.service";
import { ReccBooksService  } from "./courseDetail/reccommendedBooksService.service";
import { ModalDialogService } from "nativescript-angular/modal-dialog";


// Uncomment and add to NgModule imports if you need to use two-way binding
 import { NativeScriptFormsModule } from "nativescript-angular/forms";
// NativeScriptUISideDrawerModule
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
//import { NativeScriptHttpModule } from "nativescript-angular/http";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        HttpModule,
        HttpClientModule,
        MomentModule

    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        DrawerComponent,
        CourseComponent,
        CourseDetailComponent,
        TimetableAndEventsComponent,
        ClassScheduleComponent,
        CollegeEventsComponent,
        MyTasksComponent,
        ForumHomeComponent,
        ForumChatComponent,
        ProfileComponent,
        AboutUsComponent,
        ModalComponent

    ],
    entryComponents: [ModalComponent],
    providers: [
      CourseService,
      TimeTableService,
      AuthRoute,
      Outline,
      EventService,
      ReccBooksService,
      EventsToCalender,
      ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
