import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { Color } from "color";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";
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


  TaskArray=[];

  chosenDate:any;
  chosenTime:any;
  finalDate:any;
//VArriables for ngOnInit
taskFire:any;
finalDateFire:any;


    constructor(private router:Router ,  private routerExtensions: RouterExtensions) { }


    ngOnInit(): void {
      //checks database to load all tasks
      firebase.getValue( '/Tasks/'+ApplicationSettings.getString("userID"))
         .then((result) =>{
           console.log(JSON.stringify(result));

           for (var key in result.value) {
        this.taskFire = result.value[key].Task;
        this.finalDateFire = result.value[key].DateOfTask + "  |  " + result.value[key].TimeOfTask;
        this.TaskArray.push({task:this.taskFire,color:this.colors[Math.floor(Math.random() * 19)], date: this.finalDateFire, key:key});

     }
         } )
         .catch(error => console.log("Error: " + error));

    }




    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

    collapseTasks(){
      this.collapseTask = true;
    }

    onPickerLoaded(args) {
    let datePicker = <DatePicker>args.object;

    datePicker.year = 2018;
    datePicker.month = 3;
    datePicker.day = 1;
    datePicker.minDate = new Date(2018, 2,1);
    datePicker.maxDate = new Date(2045, 4, 12);
}

onDateChanged(args) {
    console.log("Date changed" + args.toString());
    console.log("New value: " + args.value.toString());
    console.log("Old value: " + args.oldValue.toString());
    this.chosenDate=args.value.toString().slice(0,15);
    console.log(this.chosenDate);


}


onTimePickerLoaded(args) {
    let timePicker = <TimePicker>args.object;

    timePicker.hour = 9;
    timePicker.minute = 25;

}

onTimeChanged(args) {
    console.log(args.value);
    this.chosenTime=args.value.toString();
    this.chosenTime=args.value.toString().slice(16,24);
    console.log(this.chosenTime);

}




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
     {Task:this.taskName, DateOfTask: this.chosenDate,  TimeOfTask:this.chosenTime}
 ).then(
       (result) => {
        console.log("created key: " + result.key);
        this.TaskArray.push({task:this.taskName,color:new Color (this.colors[Math.floor(Math.random() * 19)]), date: this.finalDate ,key:result.key});
        console.log(JSON.stringify(this.TaskArray));
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
