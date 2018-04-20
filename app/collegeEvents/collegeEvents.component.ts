import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";
import { Page } from "ui/page";
//import * as elementRegistryModule from 'nativescript-angular/element-registry';
//elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

import { EventService } from './eventService.service';


@Component({
    selector: "ns-events",
    moduleId: module.id,
    templateUrl: "./collegeEvents.component.html",
    styleUrls: ['./collegeEvents.component.css']
})
export class CollegeEventsComponent implements OnInit {

events = [];

    constructor(private router: Router, private routerExtensions: RouterExtensions, private eventService:EventService, private page : Page) { }

    ngOnInit(): void {
      this.page.backgroundColor = "#E3F2FD";
      this.events = this.eventService.getEvents();
      console.log("events " + this.events);

}


goBackPage(){
this.routerExtensions.backToPreviousPage();

}

}
