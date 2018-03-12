import { Component, OnInit , ElementRef,ViewChild} from "@angular/core";

import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

//import { Router } from "@angular/router";
//I used the routerExtensions instead of router because i wanted to use clearHistory
import { RouterExtensions  } from "nativescript-angular/router";

const firebase = require("nativescript-plugin-firebase");

//ApplicationSettings is for simple local storage
import * as ApplicationSettings from "application-settings";

import * as dialogs from "ui/dialogs";



@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email:string = "stelladare@ymail.com";
password:string = "stella1994";
confirmPassword:string="";
@ViewChild("container") container : ElementRef;
isLoggingIn = true;


    constructor(private page: Page , private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
      this.page.actionBarHidden = true;
      this.page.backgroundImage = "res://loginback";
    }
//************EMAIL LOGIN***8888888
    submit(){
    //7777777777777777When logging in with existing account
    if(this.isLoggingIn)
    {
      firebase.login(
          {
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
              email: this.email,
              password: this.password
            }
          })
          .then(result => {JSON.stringify(result);
          this.routerExtensions.navigate(["/home"], { clearHistory: true });
          ApplicationSettings.setNumber("authenticated",23);
}
        )
          .catch(error => {
            console.log("He is laughing at me "+error);
            dialogs.alert({
              title: "Login Unsuccessful",
              message: "Password or email is incorrect",
              okButtonText: "OK"
            });

          });
        }

        //99999999999999999999 Creating new account
        else if(this.confirmPassword!="" && this.password===this.confirmPassword)
        {

          firebase.createUser({
  email: this.email,
  password: this.password
}).then(
    (result) => {
      console.log(result);
      dialogs.alert({
        title: "User created",
        message: "userid: " + result.key,
        okButtonText: "Nice!"
      });

      this.routerExtensions.navigate(["/home"], { clearHistory: true });
      ApplicationSettings.setNumber("authenticated",23);

    },
    function (errorMessage) {
      dialogs.alert({
        title: "No user created",
        message: errorMessage,
        okButtonText: "OK, got it"
      })
    }
);

        }

  }


    toggleDisplay(){
    this.isLoggingIn = !this.isLoggingIn;
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("#c0cae5") : new Color("#58e7dc"),
      duration: 300
    });
    }


//555555555 GOOGLE LOGIN
    googleLogin(){

      firebase.login({
  type: firebase.LoginType.GOOGLE,

}).then(
    (success)=> {
      JSON.stringify(success);
      console.log(success);
      this.routerExtensions.navigate(["/home"], { clearHistory: true });
      ApplicationSettings.setNumber("authenticated",23);
      //this.IsProcessing = false;
      //this.routerExtensions.navigate(["/home"], { clearHistory: true });

},
     function(errorMessage){
      console.log(errorMessage);
      //this.IsProcessing = false;
    //  alert("Error");
    dialogs.alert({
      title: 'Login Unsuccessful',
      message: 'Unable to log in.Please check your network',
      okButtonText: 'OK'
    });

    }
);

//if(ApplicationSettings.getNumber("authenticated")===23){

//this.IsProcessing = true

    }



    logOut(){
      firebase.logout();
    }
}
