import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";


@Component({
    selector: "ns-events",
    moduleId: module.id,
    templateUrl: "./collegeEvents.component.html",
    styleUrls: ['./collegeEvents.component.css']
})
export class CollegeEventsComponent implements OnInit {



    constructor(private router: Router, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
}


goBackPage(){
this.routerExtensions.backToPreviousPage();

}

}
