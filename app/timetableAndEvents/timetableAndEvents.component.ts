import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

@Component({
    selector: "ns-timetableAndEvents",
    moduleId: module.id,
    templateUrl: "./timetableAndEvents.component.html",
    styleUrls: ['./timetableAndEvents.component.css']
})
export class TimetableAndEventsComponent implements OnInit {


    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router:Router) { }

    ngOnInit(): void {

    }
//NAvs
    goHome(){
    this.router.navigate(["/home"]);
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