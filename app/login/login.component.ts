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

  //VAriables
email:string = "stelladare@ymail.com";
password:string = "stella1994";
confirmPassword:string="";
isProcessing= false;
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
      this.isProcessing = true;
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
            this.isProcessing = false;

            dialogs.alert({
              title: "Login Unsuccessful",
              message: error,
              okButtonText: "OK"
            });

          });
            //activity indicator

        }

        //99999999999999999999 Creating new account
        else if(this.confirmPassword!="" && this.password===this.confirmPassword)
        {

          this.isProcessing = true;

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
     (errorMessage) => {
      this.isProcessing = false;
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

    this.isProcessing = true;
/*
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
     (errorMessage) => {
      console.log(errorMessage);
      this.isProcessing = false;
      //this.IsProcessing = false;
    //  alert("Error");

/* //producing runtime errors
    dialogs.alert({
      title: 'Login Unsuccessful',
      message: errorMessage,
      okButtonText: 'OK'
    });


  }
);
*/
firebase.login({
  type: firebase.LoginType.GOOGLE,
  // Optional
}).then(
    (success)=> {
      JSON.stringify(success);
      console.log(success);
    //  ApplicationSettings.setNumber("authenticated",23);
      //this.IsProcessing = false;
      //this.routerExtensions.navigate(["/tabView"], { clearHistory: true });

}

).catch(     (errorMessage) => {
      console.log(errorMessage);
    //  this.IsProcessing = false;

});
    }



    logOut(){
      firebase.logout();
    }
}
