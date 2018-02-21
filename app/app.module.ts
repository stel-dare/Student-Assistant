import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";


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

//Services
import { CourseService } from "./courses/courseService.service";
import { TimeTableService } from "./classSchedule/timetableService.service";


// Uncomment and add to NgModule imports if you need to use two-way binding
 import { NativeScriptFormsModule } from "nativescript-angular/forms";
// NativeScriptUISideDrawerModule
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule
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
        ForumChatComponent

    ],
    providers: [
      CourseService,
      TimeTableService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
