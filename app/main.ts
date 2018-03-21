// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
//ApplicationSettings is for simple local storage
import * as ApplicationSettings from "application-settings";

const firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
  persist:true,
  onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
  console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
  if (data.loggedIn) {
  console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
//  console.log("it worked "+ user.userAuth);
//  user.userAuth=data.user.uid;
  //console.log("it worked "+ user.userAuth);
  ApplicationSettings.setNumber("authenticated",23);
  ApplicationSettings.setString("userID",data.user.uid);
  ApplicationSettings.setString("userEmail", data.user.email);

  console.log(ApplicationSettings.getNumber("authenticated"));
  console.log(ApplicationSettings.getString("userID"));

  }
 else{
  ApplicationSettings.setNumber("authenticated",0);
  console.log(ApplicationSettings.getNumber("authenticated"));
  ApplicationSettings.setString("userID","");
  ApplicationSettings.setString("userEmail", "");
 }
}
}).then(
  instance => {
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);

// A traditional NativeScript application starts by initializing global objects, setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization: modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together, so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);
