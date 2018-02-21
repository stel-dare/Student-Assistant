import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { DrawerPage } from "../drawer/drawerPage";

import { Router } from "@angular/router";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent extends DrawerPage implements OnInit {


    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor( private changeDetectorRef: ChangeDetectorRef, private router:Router) {
      super(changeDetectorRef);

  }

    ngOnInit(): void {

    }
    //navigations start
      goCourses(){
        this.router.navigate(["/courses"]);
      }

      goTimetableAndEvents(){
        this.router.navigate(["/timetableAndEvents"]);

      }

      goForumHome(){
        this.router.navigate(["/forumHome"]);
      }

  //navigation ends

}
