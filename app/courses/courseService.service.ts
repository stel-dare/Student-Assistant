import { Injectable } from "@angular/core";

import * as ApplicationSettings from "application-settings";

const firebase = require("nativescript-plugin-firebase");

import { Courses } from "./courses";

@Injectable()
export class CourseService {
//used be checkIfProfileUpdated() to set a boolean
updated:boolean;

//used by convertToAppropriateYear() to make it match database path
year: string;
//used by convertToAppropriateSem() to make it match database path
semester:string;
//used be getCoursesFromFirebase()
myCourses:Courses[] =[];
myOutline=[];
myTopic=[];
//myTimetable = [];
Monday = [];
Tuesday = [];
Wednesday = [];
Thursday = [];
Friday = [];


//checking the state of the user
checkState(){
  var state = ApplicationSettings.getString("userProgram") +" " +ApplicationSettings.getString("userYear") +" "+  ApplicationSettings.getString("userSemester");
  return state;
}
//converts year chosen by user into database path
convertToAppropriateYear(){
if(ApplicationSettings.getString("userYear")==='1') this.year="yearOne";
if(ApplicationSettings.getString("userYear")==='2') this.year="yearTwo";
if(ApplicationSettings.getString("userYear")==='3') this.year="yearThree";
if(ApplicationSettings.getString("userYear")==='4') this.year="yearFour";

}
//converts sem chosen by user into database path
convertToAppropriateSem(){
  if( ApplicationSettings.getString("userSemester")==='1') this.semester="semOne";
  if( ApplicationSettings.getString("userSemester")==='2') this.semester="semTwo";
}


//checks if user has updated profile
checkIfProfileUpdated(){
  if(ApplicationSettings.getString("userProgram")!="" && ApplicationSettings.getString("userYear")!="" && ApplicationSettings.getString("userSemester")!="")
{
this.updated = true;
return this.updated;
}

else {
  this.updated = false;
  return this.updated;
}

}

//gets user courses from database using user profile

getCoursesFromFirebase(){
  if(ApplicationSettings.getString("userProgram")!="" && ApplicationSettings.getString("userYear")!="" &&ApplicationSettings.getString("userSemester")!="")
{
var program = ApplicationSettings.getString("userProgram");
this.convertToAppropriateYear();
this.convertToAppropriateSem();
this.myCourses = [];

console.log(program + ' ' +this.year + ' ' +this.semester  );

firebase.getValue('/courses/'+ program +'/'+ this.year + '/' + this.semester)
.then((result) => {
  for (var key in result.value) {
    this.myCourses.push({id: result.value[key].courseCode,name:result.value[key].courseName,level:result.value[key].courseDifficulty});

  }



})
.catch(
  (error) => {
    console.log("Error: " + error);
    alert("Error: " + error);
  });

return this.myCourses;

}

else{
  this.myCourses = [];
  return this.myCourses;

}

}

 compare(a,b) {
if (a.Time < b.Time)
return -1;
if (a.Time > b.Time)
return 1;
return 0;
}



getOutlineFromFirebase(courseID){
var program = ApplicationSettings.getString("userProgram");
this.convertToAppropriateYear();
this.convertToAppropriateSem();
firebase.getValue('/outlines/'+ program +'/'+ this.year + '/' + this.semester + '/' + courseID )
.then((result) => {
  this.myOutline=[];
  for (var key in result.value) {
    this.myOutline.push({topic:result.value[key].topic, Time:result.value[key].timeStamp});
}

  this.myTopic = this.myOutline.sort(this.compare);
})
.catch(
  (error) => {
    console.log("Error: " + error);
    alert("Error: " + error);
  });

  console.log("This is returned " + this.myTopic );
  return this.myTopic;



}
/*

getTimetableFromFirebase(){

  var program = ApplicationSettings.getString("userProgram");
  this.convertToAppropriateYear();
  this.convertToAppropriateSem();
  //this.myTimetable = [];

  //console.log(program + ' ' +this.year + ' ' +this.semester  );

  firebase.getValue('/timetable/'+ program +'/'+ this.year + '/' + this.semester)
  .then((result) => {
    this.Monday=[];
    this.Tuesday=[];
    this.Wednesday=[];
    this.Thursday = [];
    this.Friday = [];
  //  console.log(JSON.stringify(result.value));
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

    this.Monday = this.Monday.sort(this.compare);
    this.Tuesday = this.Tuesday.sort(this.compare);
    this.Wednesday = this.Wednesday.sort(this.compare);
    this.Thursday = this.Thursday.sort(this.compare);
    this.Friday = this.Friday.sort(this.compare);

    //console.log(JSON.stringify(result.value));
  //  this.myTimetable = result.value;

}

  })
  .catch(
    (error) => {
      console.log("Error: " + error);
      alert("Error: " + error);
    });

 return [this.Monday,this.Tuesday,this.Wednesday,this.Thursday,this.Friday];

}


*/

getTimetableFromFirebase(){

  var program = ApplicationSettings.getString("userProgram");
  this.convertToAppropriateYear();
  this.convertToAppropriateSem();
  //this.myTimetable = [];

  //console.log(program + ' ' +this.year + ' ' +this.semester  );

  return firebase.getValue('/timetable/'+ program +'/'+ this.year + '/' + this.semester);

}

}
