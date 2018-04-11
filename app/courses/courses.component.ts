import { Component, OnInit } from "@angular/core";

import { Router, NavigationExtras} from "@angular/router";
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
    //properties of the StackLayout in the html file
    userCourses:Courses[]=[];
    checkProfile:boolean;
    nameCourse:string;
    courseCode:string;
    



    constructor(private router: Router,  private routerExtensions: RouterExtensions ,private courseService: CourseService) { }

    ngOnInit(): void {
      //this uses courseService to check if user has set profile
        this.checkProfile = this.courseService.checkIfProfileUpdated();
        //this uses courseService to update the StackLayout in the html file
        this.userCourses = this.courseService.getCoursesFromFirebase();
        //for debugging
        console.log('this.courses ' +this.userCourses );
        console.log('this.checkProfile ' +this.checkProfile );
    }

//navigations start
      goBackPage(){
      this.routerExtensions.backToPreviousPage();

      }

//this method uses router parameters to send name of course clicked to next page
    goCourseDetail(name:any,id:any){
      this.nameCourse = name;
      this.courseCode = id;

    /*
      navigationExtras: NavigationExtras = {
           queryParams: {
               "courseName": name,
               "courseID": id
           }
       };
*/
  this.router.navigate(["/courseDetail", this.nameCourse,this.courseCode]);
}

}
