import { Component, OnInit , ViewContainerRef,NgZone } from "@angular/core";

import { Router ,  NavigationExtras} from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";
//tag ModalComponent
import { ModalComponent } from "./tag.modal";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { CourseService } from "../courses/courseService.service";

const firebase = require("nativescript-plugin-firebase");
import * as ApplicationSettings from "application-settings";

@Component({
    selector: "ns-forumHome",
    //changeDetection: ChangeDetectionStrategy.OnPush,
    moduleId: module.id,
    templateUrl: "./forumHome.component.html",
    styleUrls: ['./forumHome.component.css']
})
export class ForumHomeComponent implements OnInit {
    //toggles message board and question form
    askQuestion = false;
    tag = "";
    question = "";
    posts =[];
    finalPost:Array<string>;

//get all messages
    constructor(private router: Router,  private zone: NgZone,private routerExtensions: RouterExtensions, private modal: ModalDialogService, private vcRef: ViewContainerRef ,private courseService:CourseService ) {
      firebase.getValue('/forum/' + this.courseService.checkState() + '/messages')
          .then((result) => {
          //  console.log(JSON.stringify(result)
          for(var key in result.value){
            this.posts.push({message:result.value[key].Message,tag:result.value[key].Tag,likes:result.value[key].Likes,replies:result.value[key].Replies,Time:result.value[key].TimeStamp,sender:result.value[key].Sender,key:key});
          }
          this.finalPost=this.posts.sort(this.compare);
          this.posts=[];
          })
          .catch(error => console.log("Error: " + error));
     }

//listen for changes
    ngOnInit(): void {
    firebase.addValueEventListener( (result) => {
      this.zone.run( () => {
      for(var key in result.value){
        this.posts.push({message:result.value[key].Message,tag:result.value[key].Tag,likes:result.value[key].Likes,replies:result.value[key].Replies,Time:result.value[key].TimeStamp,sender:result.value[key].Sender,key:key});
      }
      console.log(NgZone.isInAngularZone());
      this.finalPost = this.posts.sort(this.compare);
      console.log(JSON.parse(JSON.stringify(this.finalPost)) + "\n"+"\n");
      this.posts=[];


    });  }, '/forum/' + this.courseService.checkState() + '/messages');
    }

    public showModal() {
    let options = {
        context: {},
        fullscreen: true,
        viewContainerRef: this.vcRef
    };
    this.modal.showModal(ModalComponent, options).then(res => {
        console.log(res);
        this.tag = res;
    });
}

    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }


    goForumChat(){
      this.router.navigate(["/forumChat"]);
    }

    toggleQuestionForm(){
      this.askQuestion = !this.askQuestion;
    }

    postQuestion(){
      if(this.tag!=""){
      var group = this.courseService.checkState();
      firebase.push(
    '/forum/' + group + '/messages',
    {
      Message: this.question,
      Tag: this.tag,
      Likes: 0,
      Replies: 0,
      TimeStamp:firebase.ServerValue.TIMESTAMP,
      Sender:ApplicationSettings.getString("userEmail")

    }
).then(
     (result) => {
      console.log("created key: " + result.key);
      this.askQuestion = !this.askQuestion;
      this.tag = "";
      this.question = "";

    }
);
}

else alert("please add a tag");
    }

    compare(a,b) {
   if (a.Time < b.Time)
   return -1;
   if (a.Time > b.Time)
   return 1;
   return 0;
   }

   likePost(post:any){
    post.likes = post.likes +1;
    firebase.update(
    '/forum/' + this.courseService.checkState() + '/messages/'+post.key,
    {Likes: post.likes}
);
   }

   commentPost(p:any){
    //post.replies = post.replies +1;
    var post = JSON.stringify(p);
    this.router.navigate(["/forumChat",post]);
  //  this.router.navigate(["/courseDetail", this.nameCourse,this.courseCode]);
   }

}
