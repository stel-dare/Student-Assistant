import { Component, OnInit,Input } from "@angular/core";

import { Router , ActivatedRoute } from "@angular/router";


@Component({
    selector: "ns-courseDetail",
    moduleId: module.id,
    templateUrl: "./courseDetail.component.html",
    styleUrls: ['./courseDetail.component.css']
})
export class CourseDetailComponent implements OnInit {

        courseNameReceived : string;
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private router: Router, private route: ActivatedRoute ) {
        this.route.params.subscribe((params) => {
          this.courseNameReceived=params["courseName"];
        });

   }

    ngOnInit(): void {

    }

    //Navigation
    goCourses(){
    this.router.navigate(["/courses"]);

  }

}
