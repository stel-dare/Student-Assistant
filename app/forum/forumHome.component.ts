import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";


@Component({
    selector: "ns-forumHome",
    moduleId: module.id,
    templateUrl: "./forumHome.component.html",
    styleUrls: ['./forumHome.component.css']
})
export class ForumHomeComponent implements OnInit {


    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: Router, private routerExtensions: RouterExtensions ) { }

    ngOnInit(): void {

    }

    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }


    goForumChat(){
      this.router.navigate(["/forumChat"]);
    }
}
