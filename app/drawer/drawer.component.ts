
import { Component, OnInit } from "@angular/core";
//ApplicationSettings is for simple local storage
import * as ApplicationSettings from "application-settings";

import * as dialogs from "ui/dialogs";

import { RouterExtensions  } from "nativescript-angular/router";

const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "drawer-content",
    moduleId: module.id,
    templateUrl: "./drawer.component.html",
    styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {




    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

    }


    logOut(){
      firebase.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
      console.log(ApplicationSettings.getNumber("authenticated"));
    }

}
