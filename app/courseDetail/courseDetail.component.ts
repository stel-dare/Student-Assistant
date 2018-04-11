import { Component, OnInit,Input, ChangeDetectionStrategy } from "@angular/core";

import { Router , ActivatedRoute } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";

import { CourseService } from "../courses/courseService.service";


@Component({
    selector: "ns-courseDetail",
    moduleId: module.id,
    templateUrl: "./courseDetail.component.html",
    styleUrls: ['./courseDetail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailComponent implements OnInit {

        courseNameReceived : string;
        courseIdReceived:string;
        outline = [];
        finalOutline = [];


    constructor(private router: Router, private route: ActivatedRoute ,  private routerExtensions: RouterExtensions, private CourseService:CourseService ) {
        this.route.params.subscribe((params) => {
          this.courseNameReceived=params["nameCourse"];
          this.courseIdReceived = params["courseCode"];

          //this.outline.push("hey");
        });

        //this.finalOutline = this.CourseService.getOutlineFromFirebase(this.courseIdReceived);

   }

    ngOnInit(): void {
      //console.log(this.courseIdReceived);
      this.outline = this.CourseService.getOutlineFromFirebase(this.courseIdReceived);
      //this.arr = Object.assign({}, NEW_VALUE);
    //  this.outline= this.outline.slice();
      console.log("This is received "+ this.outline);
    }

    //Navigation
    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

}
