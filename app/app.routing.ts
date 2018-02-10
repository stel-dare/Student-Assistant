import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

//COmponents
import { LoginComponent } from "./login/login.component";
import { HomeComponent }  from "./home/home.component";
import { CourseComponent }  from "./courses/courses.component";



const routes: Routes = [
   { path: "", redirectTo: "/login", pathMatch: "full" },
   { path: "login", component: LoginComponent },
   { path: "home", component: HomeComponent },
   { path: "courses", component: CourseComponent }


//    { path: "item/:id", component: ItemDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
