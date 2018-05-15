import { Component, OnInit,NgZone } from "@angular/core";
//import { Observable } from 'rxjs/Observable';

import { Router,ActivatedRoute } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";
import { CourseService } from "../courses/courseService.service";

const firebase = require("nativescript-plugin-firebase");
import * as ApplicationSettings from "application-settings";

@Component({
    selector: "ns-chat",
    moduleId: module.id,
    templateUrl: "./forumChat.component.html",
    styleUrls: ['./forumChat.component.css']
})
export class ForumChatComponent implements OnInit {

    post:any;
    message="message";
    sender = "sender";
    Time = "time";
    comment="";
    messageKey = "";
    replyCount = 0;
    comments=[];
    finalComments=[];
    constructor(private router: Router , private zone: NgZone,  private routerExtensions: RouterExtensions,private route: ActivatedRoute,private courseService:CourseService) {
      this.route.params.subscribe((params) => {
        this.post=params["post"];
          });
          var something = JSON.parse(this.post);

          firebase.getValue('/forum/' + this.courseService.checkState() + '/replies/' + something.key)
              .then((result) => {
              //  console.log(JSON.stringify(result)
              for(var key in result.value){
                this.comments.push({comment:result.value[key].comment,sender:result.value[key].sender,Time:result.value[key].time});
              }
              this.finalComments=this.comments.sort(this.compare);
              this.comments=[];
              })
              .catch(error => console.log("Error: " + error));

     }

    ngOnInit(): void {
      var something = JSON.parse(this.post);
      this.message = something.message;
      this.sender = something.sender;
      this.Time = something.Time;
      this.messageKey = something.key;
      this.replyCount = something.replies;

      firebase.addValueEventListener( (result) => {
        this.zone.run( () => {
        for(var key in result.value){
          this.comments.push({comment:result.value[key].comment,sender:result.value[key].sender,Time:result.value[key].time});
        }
      //  console.log(NgZone.isInAngularZone());
        this.finalComments=this.comments.sort(this.compare);
        //console.log(JSON.parse(JSON.stringify(this.finalPost)) + "\n"+"\n");
        this.comments=[];


      });  }, '/forum/' + this.courseService.checkState() + '/replies/' + this.messageKey);
    }
    //Nav
    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

    postComment(){
      //push Comment firebase.push(
      firebase.push(
           '/forum/' + this.courseService.checkState() + '/replies/' + this.messageKey,
           {
          sender:ApplicationSettings.getString("userEmail"),
          comment: this.comment,
          time:firebase.ServerValue.TIMESTAMP
           }
       ).then(
            (result) => {
             console.log("created key: " + result.key);
             this.replyCount++ ;
             this.comment = "";
             firebase.update(
             '/forum/' + this.courseService.checkState() + '/messages/'+this.messageKey,
             {Replies: this.replyCount++ }
         );
           }
       );

    }

    compare(a,b) {
   if (a.Time < b.Time)
   return -1;
   if (a.Time > b.Time)
   return 1;
   return 0;
   }


}
