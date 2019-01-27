import { Component, OnInit } from "@angular/core";

import { RouterExtensions  } from "nativescript-angular/router";

import {EkuaResume, StellaResume, AboutThisProject, aboutUsFacade} from './ourHistory';


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./AboutUs.component.html",
    styleUrls: ['./AboutUs.component.css']
})
export class AboutUsComponent implements OnInit {
aboutEkua=new EkuaResume();
 aboutStel = new StellaResume();
 aboutProject = new AboutThisProject();
 aboutUS = new aboutUsFacade(this.aboutEkua,this.aboutStel,this.aboutProject);
 akua = [];
 stel = [];
 project = "";
 experiences = [];
 showAkua = false;
 showStel = false;
 showProject = false;
 showExperiences = false;




    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

    }

    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

    aboutAkua(){
   //this.aboutUS.seeAboutUs();
  this.akua = this.aboutUS.seeAboutAkua();
  this.showAkua = !this.showAkua;
  this.showStel = false;
  this.showProject = false;
  this.showExperiences = false;
    }

    aboutStella(){
    this.stel =  this.aboutUS.seeAboutStella();
    this.showAkua = false;
    this.showStel = !this.showStel;
    this.showProject = false;
    this.showExperiences = false;
    }

    Project(){
    this.project =  this.aboutUS.aboutProject();
    this.showAkua = false;
    this.showStel = false;
    this.showProject = !this.showProject;
    this.showExperiences = false;
    }

    projectDifficulty(){
      //console.log("received");
    this.experiences =  this.aboutUS.projectDifficulty();
    this.showAkua = false;
    this.showStel = false;
    this.showProject = false;
    this.showExperiences = !this.showExperiences;
    //console.log(this.experiences);
    }
}
