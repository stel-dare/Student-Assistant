import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

@Component({
    selector: "ns-chat",
    moduleId: module.id,
    templateUrl: "./forumChat.component.html",
    styleUrls: ['./forumChat.component.css']
})
export class ForumChatComponent implements OnInit {


    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: Router) { }

    ngOnInit(): void {

    }
    //Nav
    goForumHome(){
    this.router.navigate(["/forumHome"]);
  }
}
