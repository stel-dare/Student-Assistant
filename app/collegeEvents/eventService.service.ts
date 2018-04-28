import { Injectable } from "@angular/core";

//import 'rxjs/add/operator/toPromise';

const firebase = require("nativescript-plugin-firebase");



@Injectable()
export class EventService {

  compare(a,b) {
 if (a.updateTs < b.updateTs)
 return -1;
 if (a.updateTs > b.updateTs)
 return 1;
 return 0;
 }

events = [];

getEvents(){
  this.events=[];
  firebase.getValue('/events')
  .then((result) => {
    for (var key in result.value) {
      this.events.push({eventName: result.value[key].eventName,eventAbout:result.value[key].eventAbout,eventVenue:result.value[key].eventVenue, eventDate:result.value[key].eventDate, eventTime:result.value[key].eventTime,updateTs:result.value[key].updateTs});

    }

    this.events.sort(this.compare);

    console.log('after for ' + JSON.stringify(this.events));

})
  .catch(
    (error) => {
      console.log("Error: " + error);
      alert("Error: " + error);
    });

    return this.events;

}


}
