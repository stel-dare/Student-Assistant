import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";

//Classes
//import { Courses,timetable } from "./timetableClass";

//Services
//import { TimeTableService } from "./timetableService.service";
import { CourseService } from "../courses/courseService.service";


@Component({
    selector: "ns-classSchedule",
    moduleId: module.id,
    templateUrl: "./classSchedule.component.html",
    styleUrls: ['./classSchedule.component.css']
})
export class ClassScheduleComponent implements OnInit {
      //Variables
    //semesterTimetable : timetable[];

//variables for accordion
     tappedMonday :boolean = false;
     tappedTuesday :boolean = false;
     tappedWednesday :boolean = false;
     tappedThursday :boolean = false;
     tappedFriday :boolean = false;


     checkProfile:boolean;
     getMonday=[];
     getTuesday=[];
     getWednesday=[];
     getThursday=[];
     getFriday=[];
     getTimetable=[];

    constructor(private router: Router, private routerExtensions: RouterExtensions ,private courseService: CourseService) { }

    ngOnInit(): void {
      //this.semesterTimetable = this.timetableService.mytimetable;
      this.checkProfile = this.courseService.checkIfProfileUpdated();
      setInterval( () => {
      this.getMonday = this.courseService.getTimetableFromFirebase()[0];
      this.getTuesday =  this.courseService.getTimetableFromFirebase()[1];
      this.getWednesday = this.courseService.getTimetableFromFirebase()[2];
      this.getThursday = this.courseService.getTimetableFromFirebase()[3];
      this.getFriday = this.courseService.getTimetableFromFirebase()[4];

      console.log('this is thursday  ' + this.getWednesday.length );

}, 6000);

    //  this.getTimetable =



    //  this.getFriday = this.getTimetable;
    //  console.log(this.getFriday +' hey ');


    }

    //accordion methods

    openMonday(){
      this.tappedMonday = !this.tappedMonday; //true
      this.tappedTuesday = false;//false
      this.tappedWednesday = false;//false
      this.tappedThursday = false;//false
      this.tappedFriday = false;//false
      }

      openTuesday(){
        this.tappedMonday = false; //false
        this.tappedTuesday = !this.tappedTuesday;//true
        this.tappedWednesday = false;//false
        this.tappedThursday = false;//false
        this.tappedFriday = false;//false
        }

        openWednesday(){
          this.tappedMonday = false; //true
          this.tappedTuesday = false;//false
          this.tappedWednesday = !this.tappedWednesday;//false
          this.tappedThursday = false;//false
          this.tappedFriday = false;//false
          }

          openThursday(){
            this.tappedMonday = false; //true
            this.tappedTuesday = false;//false
            this.tappedWednesday = false;//false
            this.tappedThursday = !this.tappedThursday;//false
            this.tappedFriday = false;//false
            }

            openFriday(){
              this.tappedMonday = false; //true
              this.tappedTuesday = false;//false
              this.tappedWednesday = false;//false
              this.tappedThursday = false;//false
              this.tappedFriday = !this.tappedFriday;//false
              }

    //Nav
    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }
}
