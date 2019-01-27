import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";
import { Page } from "ui/page";
//import * as elementRegistryModule from 'nativescript-angular/element-registry';
//elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
const firebase = require("nativescript-plugin-firebase");
import { EventService } from './eventService.service';
import { EventsToCalender } from './eventsToCalender.service';
import * as Calendar from "nativescript-calendar";


@Component({
    selector: "ns-events",
    moduleId: module.id,
    templateUrl: "./collegeEvents.component.html",
    styleUrls: ['./collegeEvents.component.css']
})
export class CollegeEventsComponent implements OnInit {

events = [];
eventParent=[];
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
        console.log("the document " + JSON.stringify(doc) );
        console.log("what is given to tsArray " + doc.eventTimeStamp);
        console.log("this is what is in database " + typeof(this.tsArray));
      }


     }

    ngOnInit(): void {
      this.page.backgroundColor = "#E3F2FD";
      //this.events = this.eventService.getEvents();
      //console.log("events " + this.events);
      this.addEventToCalender();


      firebase.getValue('/events')
      .then((result) => {
        for (var key in result.value) {
          this.eventParent.push({eventName: result.value[key].eventName,eventAbout:result.value[key].eventAbout,eventVenue:result.value[key].eventVenue, eventDate:result.value[key].eventDate, eventTime:result.value[key].eventTime,updateTs:result.value[key].updateTs});

        }

        this.eventParent.sort(this.eventService.compare);
        this.events = this.eventParent;
        //console.log("Date "+new Date(this.events[0]['eventDate']).setHours(8,10,0));
        this.addEventToCalender();

        console.log('after for ' + JSON.stringify(this.events));

    })
      .catch(
        (error) => {
          console.log("Error: " + error);
          alert("Error: " + error);
        });

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
  if(!this.isInArray(this.events[i]['updateTs'], this.tsArray)){
    //add it to database
    this.tsArray.push(this.events[i]['updateTs']);
    console.log("updated");
    //adding to Calender

    var startDate = new Date(this.events[i]['eventDate']);
    startDate.setHours(this.events[i]['eventTime'].split(':')[0],this.events[i]['eventTime'].split(':')[1],0);
    var endDate = new Date(startDate.getTime() + (2*60*60*1000));
    var options = {
    title: this.events[i]['eventName'],
    startDate: startDate,
    endDate: endDate,
    location : this.events[i]['eventVenue'],
    notes:this.events[i]['eventAbout'],
    reminders:{
      first:30,
      second:15
    },
    calendar:{
      name:"Student Assistant - College Event",
      color:'#26A69A',
      accountName:'Student Assistant'
    }
};

Calendar.createEvent(options).then(
function(createdId) {
console.log("Created Event with ID: " + createdId);
},
function(error) {
console.log("Error creating an Event: " + error);
}
);

console.log("added to calender");


    }

    //added to calender

  //  console.log("skipped");

  }
  this.eventsToCalender.updateDocument(this.docId, {"eventTimeStamp": this.tsArray});
  console.log('it is finished');
}

}
