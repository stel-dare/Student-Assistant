import { Component, OnInit } from "@angular/core";

import { RouterExtensions  } from "nativescript-angular/router";

import { ListPicker } from "ui/list-picker";

import * as ApplicationSettings from "application-settings";

const firebase = require("nativescript-plugin-firebase");


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:string;
  userEmail:string=ApplicationSettings.getString("userEmail");
  userUid:string = ApplicationSettings.getString("userID");
  programme:string="";
  semester:string="";
  year:string="";
  //Allerting user to update profile
  updateProfileMessage : string ="";
  //toggling user warning message
  profileSettings = false;
  //for collapsing profile
  collapseProfile=false;
//ListPicker indices
yearIndex:number;
programmeIndex:number;
semesterIndex:number;
  selectedIndex=0;


   ProgrammArray: Array<string> = ["Computer Engineering","ELectrical Engineering", "Telecom Engineering"];
   YearArray: Array<string> = ["4","3","2","1"];
   SemesterArray: Array<string> = ["2","1"];



    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
/*
      firebase.getCurrentUser()
    .then((user) => {
      console.log("User uid: " + user.uid);
      this.userEmail=user.email;
      this.userUid = user.uid;

      firebase.getValue('/Users/'+this.userUid)
    .then((result) =>{
      console.log(JSON.stringify(result));
      if(result.value===null){
        this.updateProfileMessage = "Please Update Your profile";
        ApplicationSettings.setString("profileSettings","notSet");
        //For the warning label
        this.profileSettings = true;
        console.log(ApplicationSettings.getString("profileSettings"));
      }

      else{
        this.programme = result.value.Programme;
        this.year = result.value.Year;
        this.semester = result.value.Semester;
      }


    })
    .catch(error => console.log("Error: " + error));




      }
    )
    .catch(error => console.log("Trouble in paradise: " + error));

    */

    firebase.getValue('/Users/'+this.userUid)
  .then((result) =>{
    console.log(JSON.stringify(result));
    if(result.value===null){
      this.updateProfileMessage = "Please Update Your profile";
      ApplicationSettings.setString("profileSettings","notSet");
      //For the warning label
      this.profileSettings = true;
      console.log(ApplicationSettings.getString("profileSettings"));
    }

    else{
      this.programme = result.value.Programme;
      this.year = result.value.Year;
      this.semester = result.value.Semester;
    }


  })
  .catch(error => console.log("Error: " + error));


    }




    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

    collapseProfileButton(){
    this.collapseProfile = true;

    }



    //xxxxxxxxxListPicker methodsxxxxxxxxxxxxxxx

    public programmeChanged(p) {
    console.log('programme selection: ' + p.selectedIndex);
    this.programmeIndex = p.selectedIndex;
}


public yearChanged(y) {
console.log('year selection: ' + y.selectedIndex);
this.yearIndex = y.selectedIndex;
}

public semesterChanged(s) {
console.log('semester selection: ' + s.selectedIndex);
this.semesterIndex = s.selectedIndex;
}






updatedProfile(){
  this.programme=this.ProgrammArray[this.programmeIndex];
  this.semester=this.SemesterArray[this.semesterIndex];
  this.year=this.YearArray[this.yearIndex];
  this.collapseProfile = false;
  this.profileSettings = false;
  firebase.setValue(
     '/Users/'+this.userUid,
     { Email: this.userEmail,  Programme:this.programme, Year:this.year, Semester:this.semester}
 );

 ApplicationSettings.setString("profileSettings","set");
 console.log(ApplicationSettings.getString("profileSettings"));

}

}
