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





}
