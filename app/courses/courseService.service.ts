import { Injectable } from "@angular/core";

import { Courses } from "./courses";

@Injectable()
export class CourseService {

myCourses:Courses[] =[
{id:"0", name:"Computer Networking"},

{id:"1", name:"Artificial Inteligence"},

{id:"2", name:"Distributed Systems"},

{id:"3", name:"Computer Graphics"},

{id:"4", name:"Computer Architecture"},

{id:"5", name:"Economics and Management"},

{id:"6", name:"Digital Signal Processing"},

{id:"7", name:"Secure Networks"},

{id:"8", name:"Software Engineering"}


];


}
