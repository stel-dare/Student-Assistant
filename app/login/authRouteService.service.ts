import { Injectable } from "@angular/core";
import { Router , CanActivate} from "@angular/router";
//import { authService } from "./authService.service";
import * as ApplicationSettings from "application-settings";


@Injectable()
export class AuthRoute implements CanActivate {
  constructor(private router: Router) {}
canActivate(){
//  if(this.authService.userAuth!=""){
//    return true;
//  }

  if(ApplicationSettings.getNumber("authenticated")===23){
    return true;
  }

  else {
    this.router.navigate(["/login"]);
    return false;
  }
}


}
