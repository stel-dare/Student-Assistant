import { Component, OnInit } from "@angular/core";

import { Router} from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";

import { Courses } from "./courses";
import { CourseService } from "./courseService.service";

@Component({
    selector: "ns-courses",
    moduleId: module.id,
    templateUrl: "./courses.component.html",
    styleUrls: ['./courses.component.css']
})
export class CourseComponent implements OnInit {

    userCourses:Courses[];
    nameCourse:string;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: Router,  private routerExtensions: RouterExtensions ,private courseService: CourseService) { }

    ngOnInit(): void {
        this.userCourses = this.courseService.myCourses;
    }

//navigations start
      goBackPage(){
      this.routerExtensions.backToPreviousPage();

      }

    goCourseDetail(name:any){
      this.nameCourse = name;
  this.router.navigate(["/courseDetail", this.nameCourse]);
}

}
