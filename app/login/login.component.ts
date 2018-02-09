import { Component, OnInit , ElementRef,ViewChild} from "@angular/core";

import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

import { Router } from "@angular/router";



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

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private page: Page , private router: Router) { }

    ngOnInit(): void {
      this.page.actionBarHidden = true;
      this.page.backgroundImage = "res://loginback";
    }

    submit(){
      alert("you are using " + this.email);
      this.router.navigate(["/home"]);
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
