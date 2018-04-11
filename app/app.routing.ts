import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

//COmponents
import { LoginComponent } from "./login/login.component";
import { HomeComponent }  from "./home/home.component";
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

//Services
import { AuthRoute } from "./login/authRouteService.service";

const routes: Routes = [
   {path: "", component:  HomeComponent , canActivate:[AuthRoute]},
   { path: "login", component: LoginComponent },
   { path: "home", component: HomeComponent },
   { path: "courses", component: CourseComponent },
   { path: "courseDetail/:nameCourse/:courseCode", component: CourseDetailComponent},
   { path: "timetableAndEvents", component: TimetableAndEventsComponent},
   { path: "classSchedule", component: ClassScheduleComponent},
   { path: "collegeEvents", component: CollegeEventsComponent},
   { path: "myTasks", component: MyTasksComponent},
   { path: "forumHome", component: ForumHomeComponent},
   { path: "forumChat", component: ForumChatComponent},
   { path: "profile", component: ProfileComponent},
   { path: "about-us", component: AboutUsComponent}



//    { path: "item/:id", component: ItemDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
