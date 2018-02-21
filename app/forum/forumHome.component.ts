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
