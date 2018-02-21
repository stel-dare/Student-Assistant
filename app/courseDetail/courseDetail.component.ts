import { Component, OnInit,Input } from "@angular/core";

import { Router , ActivatedRoute } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";


@Component({
    selector: "ns-courseDetail",
    moduleId: module.id,
    templateUrl: "./courseDetail.component.html",
    styleUrls: ['./courseDetail.component.css']
})
export class CourseDetailComponent implements OnInit {

        courseNameReceived : string;


    constructor(private router: Router, private route: ActivatedRoute ,  private routerExtensions: RouterExtensions ) {
        this.route.params.subscribe((params) => {
          this.courseNameReceived=params["courseName"];
        });

   }

    ngOnInit(): void {

    }

    //Navigation
    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

}
