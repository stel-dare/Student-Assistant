import { Component, OnInit , ElementRef,ViewChild} from "@angular/core";

import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

//import { Router } from "@angular/router";
//I used the routerExtensions instead of router because i wanted to use clearHistory
import { RouterExtensions  } from "nativescript-angular/router";



@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email:string = "stelladare2@gmail.com";
@ViewChild("container") container : ElementRef;
isLoggingIn = true;


    constructor(private page: Page , private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
      this.page.actionBarHidden = true;
      this.page.backgroundImage = "res://loginback";
    }

    submit(){
      alert("you are using " + this.email);
      this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }

    toggleDisplay(){
    this.isLoggingIn = !this.isLoggingIn;
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("#c0cae5") : new Color("#58e7dc"),
      duration: 300
    });
    }
}
