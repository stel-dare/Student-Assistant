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
        CourseComponent

    ],
    providers: [

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
