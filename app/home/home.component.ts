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
