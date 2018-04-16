import { Component, OnInit } from "@angular/core";

import { RouterExtensions  } from "nativescript-angular/router";

import {EkuaResume, StellaResume, AboutThisProject, aboutUsFacade} from './ourHistory';


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./AboutUs.component.html",
    styleUrls: ['./AboutUs.component.css']
})
export class AboutUsComponent implements OnInit {
aboutEkua=new EkuaResume();
 aboutStel = new StellaResume();
 aboutProject = new AboutThisProject();
 aboutUS = new aboutUsFacade(this.aboutEkua,this.aboutStel,this.aboutProject);




    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

    }

    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

    seeUs(){
   //this.aboutUS.seeAboutUs();
   this.aboutUS.projectDifficulty();
    }
}
