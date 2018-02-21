import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

//Classes
import { Courses,timetable } from "./timetableClass";

//Services
import { TimeTableService } from "./timetableService.service";

@Component({
    selector: "ns-classSchedule",
    moduleId: module.id,
    templateUrl: "./classSchedule.component.html",
    styleUrls: ['./classSchedule.component.css']
})
export class ClassScheduleComponent implements OnInit {
      //Variables
    semesterTimetable : timetable[];

     tapped :boolean = false;

    constructor(private router: Router, private timetableService : TimeTableService) { }

    ngOnInit(): void {
      this.semesterTimetable = this.timetableService.mytimetable;


    }

    open(){
      this.tapped = !this.tapped;

    }

    //Nav
    goTimetableAndEvents(){
      this.router.navigate(["/timetableAndEvents"]);
    }
}
