import { Component, OnInit } from "@angular/core";
//import { Observable } from 'rxjs/Observable';

import { Router } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";

@Component({
    selector: "ns-chat",
    moduleId: module.id,
    templateUrl: "./forumChat.component.html",
    styleUrls: ['./forumChat.component.css']
})
export class ForumChatComponent implements OnInit {


    constructor(private router: Router ,  private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

    }
    //Nav
    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }


}
