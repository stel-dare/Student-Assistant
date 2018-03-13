import { Component, OnInit } from "@angular/core";

import { RouterExtensions  } from "nativescript-angular/router";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./AboutUs.component.html",
    styleUrls: ['./AboutUs.component.css']
})
export class AboutUsComponent implements OnInit {


    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

    }

    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }
}
