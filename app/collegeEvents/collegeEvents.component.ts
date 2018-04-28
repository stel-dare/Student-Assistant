import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";
import { Page } from "ui/page";
//import * as elementRegistryModule from 'nativescript-angular/element-registry';
//elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

import { EventService } from './eventService.service';
import { EventsToCalender } from './eventsToCalender.service';


@Component({
    selector: "ns-events",
    moduleId: module.id,
    templateUrl: "./collegeEvents.component.html",
    styleUrls: ['./collegeEvents.component.css']
})
export class CollegeEventsComponent implements OnInit {

events = [];
docId: string = "eventTimeStamp";
tsArray=[];

    constructor(private router: Router, private routerExtensions: RouterExtensions, private eventService:EventService, private page : Page, private eventsToCalender : EventsToCalender) {
      //get objects in docId which is eventTimeStamp

      let doc = this.eventsToCalender.getDocument(this.docId);
      //if its empty create document with id doc Id
      if( doc == null) {
        this.eventsToCalender.createDocument({"eventTimeStamp": []}, this.docId);
      }
      //else put the value in tsArray
      else {
        this.tsArray = doc.eventTimeStamp;
        console.log("this is what is in database " + this.tsArray.length);
      }


     }

    ngOnInit(): void {
      this.page.backgroundColor = "#E3F2FD";
      this.events = this.eventService.getEvents();

      console.log("events " + this.events);
      this.addEventToCalender();

}


goBackPage(){
this.routerExtensions.backToPreviousPage();

}

 isInArray(value, array) {
  return array.indexOf(value) > -1;
}

addEventToCalender(){
  //loop through events array
  for(var i = 0; i<this.events.length; i++){
    // if timestamp is not in database
  //  if(!this.tsArray.includes(this.events[i]['updateTs'])){
  if(!this.isInArray(this.events[i]['updateTs'], this.tsArray)){
    //add it to database
    this.eventsToCalender.updateDocument(this.docId, {"eventTimeStamp": this.events[i]['updateTs']});
    console.log("updated");

    }
    console.log("skipped");

  }
  console.log('it is finished');
}

}
