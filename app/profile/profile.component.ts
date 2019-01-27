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
//Setting profile variable start
  user:string;
  userEmail:string=ApplicationSettings.getString("userEmail");
  userUid:string = ApplicationSettings.getString("userID");
  //Allerting user to update profile
  updateProfileMessage : string ="";
  //toggling user warning message
  profileSettings = false;
  //for collapsing profile
  collapseProfile=false;
//ListPicker indices
  programme:string="";
  semester:string="";
  year:string="";
//Setting profile variable end

//ListPicker variables start
yearIndex:number;
programmeIndex:number;
semesterIndex:number;
selectedIndex=0;
ProgrammArray: Array<string> = ["Please wait","As the programs", "load"];
YearArray: Array<string> = ["4","3","2","1"];
SemesterArray: Array<string> = ["2","1"];
//ListPicker variables end
//This updates the ProgrammArray for the ListPicker when data is fetched from firebase
updatedProgrammArray: Array<string> = [];






    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
//Gets the user's profile settings if set...if not, tells the user to set them

    firebase.getValue('/Users/'+this.userUid)
  .then((result) =>{
    console.log(JSON.stringify(result));
    if(result.value===null){
      this.updateProfileMessage = "Please Update Your profile";
      ApplicationSettings.setString("profileSettings","notSet");
      //This stores user profile settings in application settings so i
      //can use them in course component
      ApplicationSettings.setString("userProgram",'');
      ApplicationSettings.setString("userYear",'');
      ApplicationSettings.setString("userSemester",'');
      //For the warning label
      this.profileSettings = true;
      console.log(ApplicationSettings.getString("profileSettings"));


    }

    else{
      this.programme = result.value.Programme;
      this.year = result.value.Year;
      this.semester = result.value.Semester;
      //This stores user profile settings in application settings so i
      //can use them in course component
      ApplicationSettings.setString("userProgram",this.programme);
      ApplicationSettings.setString("userYear",this.year);
      ApplicationSettings.setString("userSemester",this.semester);

    }


  })
  .catch(error => console.log("Error: " + error));



    }




    goBackPage(){
      //goes back to previuos page
    this.routerExtensions.backToPreviousPage();

    }


//collapseProfileButton - this collapses the the first update button in the profile
//section and updates the program ListPicker from the database

    collapseProfileButton(){
    this.collapseProfile = true;
    firebase.getValue('/programs')
    .then((result) => {
      for (var key in result.value) {
    var program = result.value[key].name;
    this.updatedProgrammArray.push(program);
}
    this.ProgrammArray = this.updatedProgrammArray;


    })
    .catch(
      (error) => {
        console.log("Error: " + error);
        alert("Error: " + error);
      });
}



    //xxxxxxxxxListPicker methods for respective listpickersxxxxxxxxxxxxxxx

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

//xxxxxxxxxListPicker methods for respective listpickers end xxxxxxxxxxxxxxx





//this method updates the profile of the user
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
 //This stores user profile settings in application settings so i
 //can use them in course component
 ApplicationSettings.setString("userProgram",this.programme);
 ApplicationSettings.setString("userYear",this.year);
 ApplicationSettings.setString("userSemester",this.semester);
 console.log(ApplicationSettings.getString("profileSettings"));
 console.log("changed program "+ this.programme);

}

}
