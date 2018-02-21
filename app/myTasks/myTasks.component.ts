import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";


@Component({
    selector: "ns-tasks",
    moduleId: module.id,
    templateUrl: "./myTasks.component.html",
    styleUrls: ['./myTasks.component.css']
})
export class MyTasksComponent implements OnInit {



    constructor(private router:Router ,  private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

    }


    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

}
