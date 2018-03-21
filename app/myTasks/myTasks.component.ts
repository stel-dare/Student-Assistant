import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { Color } from "color";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";

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
  taskName:string="Nameless Task";
  taskColor:string;
  colors=["#4f2729","#d2575e","#c03ea2" ,"#833ec0", "#1c3ad7","#ffc0cb", "#008080","#ffd700", "#0000ff", "#ffa500",
"#800080", "#003366","#f6546a","#ff00ff", "#0e2f44", "#808080" ,"#daa520", "#000080", "#000080"];

  //TaskArray = [{task:"eat",color:new Color("red"), date:"March"}];
  TaskArray=[];

  chosenDate:any = "June";
  chosenTime:any;
  finalDate:any;



    constructor(private router:Router ,  private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

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
  this.collapseTask = false;

  this.finalDate = this.chosenDate + " | " + this.chosenTime;

  if(this.taskName===""){
    this.taskName="Nameless Task";
  }
 this.TaskArray.push({task:this.taskName,color:new Color (this.colors[Math.floor(Math.random() * 19)]), date: this.finalDate });
  this.taskName="";

//  this.taskColor=this.colors[Math.floor( Math.random() * 5)];
}


}
