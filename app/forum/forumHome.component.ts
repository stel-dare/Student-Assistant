import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";


@Component({
    selector: "ns-forumHome",
    moduleId: module.id,
    templateUrl: "./forumHome.component.html",
    styleUrls: ['./forumHome.component.css']
})
export class ForumHomeComponent implements OnInit {


    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: Router) { }

    ngOnInit(): void {

    }

    goHome(){
    this.router.navigate(["/home"]);
  }


    goForumChat(){
      this.router.navigate(["/forumChat"]);
    }
}