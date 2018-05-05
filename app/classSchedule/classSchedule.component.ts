import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";

//Classes
//import { Courses,timetable } from "./timetableClass";
import * as Calendar from "nativescript-calendar";
//Services
//import { TimeTableService } from "./timetableService.service";
import { CourseService } from "../courses/courseService.service";
import { EventsToCalender } from '../collegeEvents/eventsToCalender.service';


@Component({
    selector: "ns-classSchedule",
    moduleId: module.id,
    templateUrl: "./classSchedule.component.html",
    styleUrls: ['./classSchedule.component.css']
})
export class ClassScheduleComponent implements OnInit {
      //Variables
    //semesterTimetable : timetable[];

//variables for accordion
     tappedMonday :boolean = false;
     tappedTuesday :boolean = false;
     tappedWednesday :boolean = false;
     tappedThursday :boolean = false;
     tappedFriday :boolean = false;


     checkProfile:boolean;

     getMonday=[];
     getTuesday=[];
     getWednesday=[];
     getThursday=[];
     getFriday=[];
     getTimetable=[];
//very crazy

Monday=[];
Tuesday=[];
Wednesday=[];
Thursday=[];
Friday=[];
Timetable=[];
empty = false;
matching = true;
//notMatching:boolean;
//userState:string;

docId: string = "previousState";

    constructor(private router: Router, private routerExtensions: RouterExtensions ,private courseService: CourseService, private eventsToCalender : EventsToCalender) {
      let state = this.courseService.checkState();
      let doc = this.eventsToCalender.getDocument(this.docId);
      //if its empty create document with id doc Id
      if( doc == null) {
        this.eventsToCalender.createDocument({"previousState": state}, this.docId);
        //empty timetable calender
        this.empty = true;
        console.log("userState now set ");
      }
      //else put the value in userState
      else {
        //this.userState = doc.previousState;
        if(state === doc.previousState){
        this.matching =  true;
        //do nothing
        console.log("matching : " + this.matching);
      }

      else{
        this.matching =  false;
        this.eventsToCalender.updateDocument(this.docId, {"previousState": state});
        //update database
        //delete class Schedule from Calendar
        //add new class schedule to calendar
        console.log("matching : " + this.matching);
      }

        //console.log("userState : " + this.userState);
        //console.log("the document " + JSON.stringify(doc) );
        //console.log("what is given to tsArray " + doc.eventTimeStamp);
        //console.log("this is what is in database " + typeof(this.tsArray));
      }



    }

    ngOnInit(): void {
      //this.semesterTimetable = this.timetableService.mytimetable;
      this.checkProfile = this.courseService.checkIfProfileUpdated();
      this.courseService.getTimetableFromFirebase().then((result) =>
      {
        if(result.value != null){
        for (var key in result.value.Monday) {
        //  this.myCourses.push({id: result.value[key].courseCode,name:result.value[key].courseName,level:result.value[key].courseDifficulty});
        this.Monday.push({course_name:result.value.Monday[key].course_name, course_code:result.value.Monday[key].course_code, course_venue:result.value.Monday[key].course_venue, start_time:result.value.Monday[key].start_time,end_time:result.value.Monday[key].end_time,Time:result.value.Monday[key].timestamp});
        }

        for (var key in result.value.Tuesday) {
        //  this.myCourses.push({id: result.value[key].courseCode,name:result.value[key].courseName,level:result.value[key].courseDifficulty});
        this.Tuesday.push({course_name:result.value.Tuesday[key].course_name, course_code:result.value.Tuesday[key].course_code, course_venue:result.value.Tuesday[key].course_venue, start_time:result.value.Tuesday[key].start_time,end_time:result.value.Tuesday[key].end_time,Time:result.value.Tuesday[key].timestamp});
        }

        for (var key in result.value.Wednesday) {
        //  this.myCourses.push({id: result.value[key].courseCode,name:result.value[key].courseName,level:result.value[key].courseDifficulty});
        this.Wednesday.push({course_name:result.value.Wednesday[key].course_name, course_code:result.value.Wednesday[key].course_code, course_venue:result.value.Wednesday[key].course_venue, start_time:result.value.Wednesday[key].start_time,end_time:result.value.Wednesday[key].end_time, Time:result.value.Wednesday[key].timestamp});
        }

        for (var key in result.value.Thursday) {
        //  this.myCourses.push({id: result.value[key].courseCode,name:result.value[key].courseName,level:result.value[key].courseDifficulty});
        this.Thursday.push({course_name:result.value.Thursday[key].course_name, course_code:result.value.Thursday[key].course_code, course_venue:result.value.Thursday[key].course_venue, start_time:result.value.Thursday[key].start_time,end_time:result.value.Thursday[key].end_time, Time:result.value.Thursday[key].timestamp});
        }

        for (var key in result.value.Friday) {
        //  this.myCourses.push({id: result.value[key].courseCode,name:result.value[key].courseName,level:result.value[key].courseDifficulty});
        this.Friday.push({course_name:result.value.Friday[key].course_name, course_code:result.value.Friday[key].course_code, course_venue:result.value.Friday[key].course_venue, start_time:result.value.Friday[key].start_time,end_time:result.value.Friday[key].end_time,Time:result.value.Friday[key].timestamp});
        }

        this.getMonday = this.Monday.sort(this.courseService.compare);
        this.getTuesday = this.Tuesday.sort(this.courseService.compare);
        this.getWednesday = this.Wednesday.sort(this.courseService.compare);
        this.getThursday = this.Thursday.sort(this.courseService.compare);
        this.getFriday = this.Friday.sort(this.courseService.compare);
        //this.addToCalendar();
        //this.deleteFromCal();
        if(this.empty){
        this.addToCalendar();
      }

      else if (!this.matching){
        this.deleteFromCal();
        this.addToCalendar();
        console.log("deleted and added");

      }


        console.log("Mon "+JSON.stringify(this.Tuesday));
      }
    }
  )
  .catch((error) => {
    console.log(error);
    alert(error);
  }

  );

  }
/*
      setInterval( () => {
      this.getMonday = this.courseService.getTimetableFromFirebase()[0];
      this.getTuesday =  this.courseService.getTimetableFromFirebase()[1];
      this.getWednesday = this.courseService.getTimetableFromFirebase()[2];
      this.getThursday = this.courseService.getTimetableFromFirebase()[3];
      this.getFriday = this.courseService.getTimetableFromFirebase()[4];

      console.log('this is thursday  ' + this.getWednesday.length );

}, 6000);
*/

    //  this.getTimetable =



    //  this.getFriday = this.getTimetable;
    //  console.log(this.getFriday +' hey ');




    //accordion methods

    openMonday(){
      this.tappedMonday = !this.tappedMonday; //true
      this.tappedTuesday = false;//false
      this.tappedWednesday = false;//false
      this.tappedThursday = false;//false
      this.tappedFriday = false;//false
      }

      openTuesday(){
        this.tappedMonday = false; //false
        this.tappedTuesday = !this.tappedTuesday;//true
        this.tappedWednesday = false;//false
        this.tappedThursday = false;//false
        this.tappedFriday = false;//false
        }

        openWednesday(){
          this.tappedMonday = false; //true
          this.tappedTuesday = false;//false
          this.tappedWednesday = !this.tappedWednesday;//false
          this.tappedThursday = false;//false
          this.tappedFriday = false;//false
          }

          openThursday(){
            this.tappedMonday = false; //true
            this.tappedTuesday = false;//false
            this.tappedWednesday = false;//false
            this.tappedThursday = !this.tappedThursday;//false
            this.tappedFriday = false;//false
            }

            openFriday(){
              this.tappedMonday = false; //true
              this.tappedTuesday = false;//false
              this.tappedWednesday = false;//false
              this.tappedThursday = false;//false
              this.tappedFriday = !this.tappedFriday;//false
              }

    //Nav
    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

    addToCalendar(){
      /********This a complicated function. it loops through the day arrays and adds them to the calendar
      */
      var rec:any = "weekly";
      //Monday
      for(var i = 0; i<this.Monday.length; i++){
        //adding to Calender
            var startDate = new Date(this.getPrevMon());
            var endDate = new Date(this.getPrevMon());
            startDate.setHours(this.Monday[i]['start_time'].split(':')[0],this.Monday[i]['start_time'].split(':')[1],0);
            endDate.setHours(this.Monday[i]['end_time'].split(':')[0],this.Monday[i]['end_time'].split(':')[1],0);
            var options = {
            title: this.Monday[i]['course_name'],
            startDate: startDate,
            endDate: endDate,
            location : this.Monday[i]['course_venue'],
            reminders:{
              first:30,
              second:15
            },
            recurrence:  {
    frequency: rec,
    interval: 1,
    endDate: new Date(new Date().getTime() + (90*24*60*60*1000)) // 90 days = 3months
},
            calendar:{
              name:"Student Assistant - Class Schedule",
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

          //Tuesday

          for(var i = 0; i<this.Tuesday.length; i++){
            //adding to Calender
                var startDate = new Date(this.getPrevTues());
                var endDate = new Date(this.getPrevTues());
                startDate.setHours(this.Tuesday[i]['start_time'].split(':')[0],this.Tuesday[i]['start_time'].split(':')[1],0);
                endDate.setHours(this.Tuesday[i]['end_time'].split(':')[0],this.Tuesday[i]['end_time'].split(':')[1],0);
                var options = {
                title: this.Tuesday[i]['course_name'],
                startDate: startDate,
                endDate: endDate,
                location : this.Tuesday[i]['course_venue'],
                reminders:{
                  first:30,
                  second:15
                },
                recurrence:  {
        frequency: rec,
        interval: 1,
        endDate: new Date(new Date().getTime() + (90*24*60*60*1000)) // 90 days = 3months
    },
                calendar:{
                  name:"Student Assistant - Class Schedule",
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

              //Wednesday

              for(var i = 0; i<this.Wednesday.length; i++){
                //adding to Calender
                    var startDate = new Date(this.getPrevWed());
                    var endDate = new Date(this.getPrevWed());
                    startDate.setHours(this.Wednesday[i]['start_time'].split(':')[0],this.Wednesday[i]['start_time'].split(':')[1],0);
                    endDate.setHours(this.Wednesday[i]['end_time'].split(':')[0],this.Wednesday[i]['end_time'].split(':')[1],0);
                    var options = {
                    title: this.Wednesday[i]['course_name'],
                    startDate: startDate,
                    endDate: endDate,
                    location : this.Wednesday[i]['course_venue'],
                    reminders:{
                      first:30,
                      second:15
                    },
                    recurrence:  {
            frequency: rec,
            interval: 1,
            endDate: new Date(new Date().getTime() + (90*24*60*60*1000)) // 90 days = 3months
        },
                    calendar:{
                      name:"Student Assistant - Class Schedule",
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

                  //thursday

                  for(var i = 0; i<this.Thursday.length; i++){
                    //adding to Calender
                        var startDate = new Date(this.getPrevThurs());
                        var endDate = new Date(this.getPrevThurs());
                        startDate.setHours(this.Thursday[i]['start_time'].split(':')[0],this.Thursday[i]['start_time'].split(':')[1],0);
                        endDate.setHours(this.Thursday[i]['end_time'].split(':')[0],this.Thursday[i]['end_time'].split(':')[1],0);
                        var options = {
                        title: this.Thursday[i]['course_name'],
                        startDate: startDate,
                        endDate: endDate,
                        location : this.Thursday[i]['course_venue'],
                        reminders:{
                          first:30,
                          second:15
                        },
                        recurrence:  {
                frequency: rec,
                interval: 1,
                endDate: new Date(new Date().getTime() + (90*24*60*60*1000)) // 90 days = 3months
            },
                        calendar:{
                          name:"Student Assistant - Class Schedule",
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

                      //Friday

                      for(var i = 0; i<this.Friday.length; i++){
                        //adding to Calender
                            var startDate = new Date(this.getPrevFri());
                            var endDate = new Date(this.getPrevFri());
                            startDate.setHours(this.Friday[i]['start_time'].split(':')[0],this.Friday[i]['start_time'].split(':')[1],0);
                            endDate.setHours(this.Friday[i]['end_time'].split(':')[0],this.Friday[i]['end_time'].split(':')[1],0);
                            var options = {
                            title: this.Friday[i]['course_name'],
                            startDate: startDate,
                            endDate: endDate,
                            location : this.Friday[i]['course_venue'],
                            reminders:{
                              first:30,
                              second:15
                            },
                            recurrence:  {
                    frequency: rec,
                    interval: 1,
                    endDate: new Date(new Date().getTime() + (90*24*60*60*1000)) // 90 days = 3months
                },
                            calendar:{
                              name:"Student Assistant - Class Schedule",
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
      }


//deletes a calendar
      deleteFromCal(){
        Calendar.deleteCalendar({
          name: "Student Assistant - Class Schedule"
          }).then(id => {
            // id is null if nothing was deleted
            console.log(`Deleted Calendar with id ${id}`);
          });

      }

      getPrevMon(){
        var prevMonday = new Date();
        prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
        return new Date( prevMonday);
      }

      getPrevTues(){
        var prevTues = new Date();
        prevTues.setDate(prevTues.getDate() - (prevTues.getDay() + 5) % 7);
        return prevTues;
      }

      getPrevWed(){
        var prevWed = new Date();
        prevWed.setDate(prevWed.getDate() - (prevWed.getDay() + 4) % 7);
        return prevWed;
      }

      getPrevThurs(){
        var prevThurs = new Date();
        prevThurs.setDate(prevThurs.getDate() - (prevThurs.getDay() + 3) % 7);
        return prevThurs;
      }

      getPrevFri(){
        var prevFri = new Date();
        prevFri.setDate(prevFri.getDate() - (prevFri.getDay() + 2) % 7);
        return prevFri;
      }

    }
