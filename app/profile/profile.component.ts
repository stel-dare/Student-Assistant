import { Component, OnInit } from "@angular/core";

import { RouterExtensions  } from "nativescript-angular/router";

import * as ApplicationSettings from "application-settings";

const firebase = require("nativescript-plugin-firebase");


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:string;


    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

      firebase.getCurrentUser()
    .then((user) => {
      console.log("User uid: " + user.uid);
      if(user.name!=""){
        this.user=user.name;
      }
      else {
        this.user = user.email;
        console.log("it worked");
      }

      }
    )
    .catch(error => console.log("Trouble in paradise: " + error));

    }


    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }
}
