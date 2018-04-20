import { Component, OnInit,Input, ChangeDetectionStrategy } from "@angular/core";

import { Router , ActivatedRoute } from "@angular/router";
//This routerExtensions is for navigating to a previous page.
//It seems to be faster
import { RouterExtensions  } from "nativescript-angular/router";

import { CourseService } from "../courses/courseService.service";
import { ReccBooksService  } from "./reccommendedBooksService.service";

//import * as elementRegistryModule from 'nativescript-angular/element-registry';
//elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);


@Component({
    selector: "ns-courseDetail",
    moduleId: module.id,
    templateUrl: "./courseDetail.component.html",
    styleUrls: ['./courseDetail.component.css']

})
export class CourseDetailComponent implements OnInit {

        courseNameReceived : string;
        courseIdReceived:string;
        outline = [];
      //  finalOutline = [];
      //  received = 'hello there';
        //book:any;
      //  pTest = "Loading...";
        Loading =true;
        booksArrary=[];
        displayBooks=[];
        title:string;
        authors:string;
        imageLink:string;
        previewLink:string;
        textSnippet:string;


    constructor(private router: Router, private route: ActivatedRoute ,  private routerExtensions: RouterExtensions, private CourseService:CourseService, private reccBooksService:ReccBooksService) {
        this.route.params.subscribe((params) => {
          this.courseNameReceived=params["nameCourse"];
          this.courseIdReceived = params["courseCode"];


        });



   }

    ngOnInit(): void {

      this.outline = this.CourseService.getOutlineFromFirebase(this.courseIdReceived);

//for fetching recommended books from server
//when promise is returned the json is looped and the needed infomation is fetched and pushed
  this.reccBooksService.getBooks(this.courseNameReceived)
.then((book) => {
 for(var i=0; i<book['items'].length; i++){
 book['items'][i]['volumeInfo']['title'] ? this.title = book['items'][i]['volumeInfo']['title'] : this.title = "There is no title for this book";
 book['items'][i]['volumeInfo']['authors'] ? this.authors = book['items'][i]['volumeInfo']['authors'][0] : this.authors = "There is no author for this book";
 book['items'][i]['volumeInfo']['imageLinks']? this.imageLink = book['items'][i]['volumeInfo']['imageLinks']['thumbnail'] : this.imageLink = "There is no image for this book";
 book['items'][i]['volumeInfo']['previewLink'] ? this.previewLink = book['items'][i]['volumeInfo']['previewLink'] : this.previewLink = "There is no preview link for this book";
 book['items'][i]['volumeInfo']['description'] ? this.textSnippet = book['items'][i]['volumeInfo']['description'] : this.textSnippet = "There is no description for this book";
//pushes book details into booksArray
 this.booksArrary.push({
 title:this.title,
 author:this.authors,
 imageLink:this.imageLink ,
 previewLink: this.previewLink,
 bookDescription:this.textSnippet

});

}
//updates the view
this.Loading = false;
this.displayBooks = this.booksArrary;
//this.pTest ="done loading";

})
.catch((err) => {
 console.log(err);
 alert("Network error...Please try again later");
})

//console.log(this.pTest);


   }


    //Navigation
    goBackPage(){
    this.routerExtensions.backToPreviousPage();

    }

}
