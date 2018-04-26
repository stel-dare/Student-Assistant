import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { Color } from "color";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";
import * as Calendar from "nativescript-calendar";
const firebase = require("nativescript-plugin-firebase");

import { DatePicker } from "ui/date-picker";
import { TimePicker } from "ui/time-picker";

@Component({
    selector: "ns-tasks",
    moduleId: module.id,
    templateUrl: "./myTasks.component.html",
    styleUrls: ['./myTasks.component.css']
})
export class MyTasksComponent implements OnInit {

  collapseTask= false;
  taskName:string;
  taskColor:string;
  colors=["#4f2729","#d2575e","#c03ea2" ,"#833ec0", "#1c3ad7","#ffc0cb", "#008080","#ffd700", "#0000ff", "#ffa500",
"#800080", "#003366","#f6546a","#ff00ff", "#0e2f44", "#808080" ,"#daa520", "#000080", "#000080"];

//The array displayed in the view
  TaskArray=[];
//Variables for date and timepicker
  chosenDate:any;
  chosenTime:any;
  finalDate:any;
//VArriables for ngOnInit
taskFire:any;
finalDateFire:any;

//variables for calender and local notifications

endDate = new Date();



    constructor(private router:Router ,  private routerExtensions: RouterExtensions) { }


    ngOnInit(): void {
    //Used to sort data according tpo the timestamp
    function  compare(a,b) {
     if (a.timeStamp < b.timeStamp)
     return -1;
     if (a.timeStamp > b.timeStamp)
     return 1;
     return 0;
     }


//checks database to load all tasks
      firebase.getValue( '/Tasks/'+ApplicationSettings.getString("userID"))
         .then((result) =>{
           console.log(JSON.stringify(result));

           for (var key in result.value) {
        this.taskFire = result.value[key].Task;
        this.finalDateFire = result.value[key].DateOfTask + "  |  " + result.value[key].TimeOfTask;
        this.TaskArray.push({task:this.taskFire,color:this.colors[Math.floor(Math.random() * 19)], date: this.finalDateFire, key:key, timeStamp:result.value[key].updateTs});

     }
     this.TaskArray=this.TaskArray.sort(compare);

         } )
         .catch(error => console.log("Error: " + error));

    }




    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }
//USed to collapse the plus
    collapseTasks(){
      this.collapseTask = true;
    }

    //Date picker and time picker functions

    onPickerLoaded(args) {
    let datePicker = <DatePicker>args.object;

   datePicker.year = 2018;
    datePicker.month = 3;
    datePicker.day = 1;
    datePicker.minDate = new Date(2018, 2,1);
    datePicker.maxDate = new Date(2045, 4, 12);
}

onDateChanged(args) {

  //this varriable endDAte is used to add the end date of a task to the calender
    this.endDate = args.value;

    console.log("Date changed" + args.toString());
    console.log("New value: " + args.value.toString());
    console.log("Old value: " + args.oldValue.toString());
    this.chosenDate=args.value.toString().slice(0,15);
    console.log(this.chosenDate);
    console.log("start time date " + this.endDate );


}


onTimePickerLoaded(args) {
    let timePicker = <TimePicker>args.object;

   timePicker.hour = 9;
   timePicker.minute = 25;

}

onTimeChanged(args) {
  let timePicker = <TimePicker>args.object;
    console.log( timePicker.hour);
//    this.endHour = timePicker.hour;
//    this.endMin = timePicker.minute;
    //console.log(args.value.minute);
    //sets the endDAte with the appropriate time
    this.endDate.setHours(timePicker.hour,timePicker.minute,0);
    console.log("start time " + this.endDate );
    this.chosenTime=args.value.toString();
    this.chosenTime=args.value.toString().slice(16,24);
    console.log(this.chosenTime);

}


//This pushes the user's task to firebase

addTasks(){
  //THis function seems to do a lot of things
  this.collapseTask = false;
  this.finalDate = this.chosenDate + "  |  " + this.chosenTime;

  if(this.taskName===""){
    this.taskName="Nameless Task";
  }


//It pushes to firebase before displaying
//I used this method because I needed to store the unique key
//There are two distinct arrays
//One from firebase and one called Task array
  firebase.push(
     '/Tasks/'+ApplicationSettings.getString("userID"),
     {Task:this.taskName, DateOfTask: this.chosenDate,  TimeOfTask:this.chosenTime, updateTs: firebase.ServerValue.TIMESTAMP}
 ).then(
       (result) => {
        console.log("created key: " + result.key);
        this.TaskArray.push({task:this.taskName,color:new Color (this.colors[Math.floor(Math.random() * 19)]), date: this.finalDate ,key:result.key, timeStamp:firebase.ServerValue.TIMESTAMP});
        console.log(JSON.stringify(this.TaskArray));
      //  var end = this.startDate.setHours(this.endHour);
  //      console.log("end time " + end);
        //adding task to user's calender
        var options = {
        title: this.taskName,
        //startDate: new Date(new Date().getTime()),
        //got confused with this for a while
        //the start date is supposed to be the date the user chooses
        //and the end date is how long the user should be reminded
        startDate: this.endDate,
        endDate: new Date(this.endDate.getTime() + (2*60*60*1000)),
       //endDate: new Date(new Date().getTime() + (2*60*60*1000)),
        reminders:{
          first:30,
          second:15

        },
        calendar:{
          name:"My Tasks",
          color:'#FF0000',
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

       this.taskName="";
      }
  );



}
//TAkes the index from ngFOr and uses splice to remove it from the array
//Takes unique Id from taskArray and removes it from firebase
deleteTask(index:any,uniqueID:any){
  this.TaskArray.splice(index,1);
  firebase.remove('/Tasks/'+ ApplicationSettings.getString("userID") + '/' + uniqueID );

}


}
