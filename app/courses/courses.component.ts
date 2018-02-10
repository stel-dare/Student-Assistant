import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

@Component({
    selector: "ns-courses",
    moduleId: module.id,
    templateUrl: "./courses.component.html",
    styleUrls: ['./courses.component.css']
})
export class CourseComponent implements OnInit {


    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: Router) { }

    ngOnInit(): void {

    }

//navigations start
    goHome(){
    this.router.navigate(["/home"]);
  }

}
