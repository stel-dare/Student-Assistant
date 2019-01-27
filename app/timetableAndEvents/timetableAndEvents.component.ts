import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

import { RouterExtensions  } from "nativescript-angular/router";

@Component({
    selector: "ns-timetableAndEvents",
    moduleId: module.id,
    templateUrl: "./timetableAndEvents.component.html",
    styleUrls: ['./timetableAndEvents.component.css']
})
export class TimetableAndEventsComponent implements OnInit {


  

    constructor(private router:Router, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

    }
//NAvs
goBackPage(){
this.routerExtensions.backToPreviousPage();

}

  goClassSchedule(){
    this.router.navigate(["/classSchedule"]);
  }

  goCollegeEvents(){
    this.router.navigate(["/collegeEvents"]);

  }

  goMyTasks(){
    this.router.navigate(["/myTasks"]);
  }

}
