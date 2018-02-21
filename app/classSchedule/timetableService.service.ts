import { Injectable } from "@angular/core";

import { Courses,timetable } from "./timetableClass";

@Injectable()
export class TimeTableService {

   mytimetable: timetable[] = [
      {
          day: "Monday",
      courses:[{name:"Secure Networks", time:"3:00pm - 4:00pm",venue:"N1"},{name:"Software Engineering",  time:"3:00pm - 4:00pm" ,venue:"PB206"}]

    },
    {
        day: "Tuesday",
    courses:[{name:"Digital Signal Processing", time:"8:00am - 10:00am" ,venue:"N2"},{name:" Management",  time:"2:00pm - 4:00pm" ,venue:"N1"}]

  },

  {
      day: "Wednesday",
  courses:[{name:"Software Engineering", time:"2:00pm - 4:00pm" ,venue:"N1"},{name:" Secure Networks",  time:"5:00pm - 6:30pm" ,venue:"N1"}]

},

{
    day: "Thursday",
courses:[{name:"Software Engineering", time:"8:00am - 10:00am" ,venue:"N1"},{name:" Digital Signal Processing",  time:"12:00pm - 2:00pm" ,venue:"N1"}]

},

{
    day: "Friday",
courses:[{name:"", time:"",venue:""}]

},

  ];
//{id:"Tuesday", courses:["Digital Signal Processing"," Management"], time:["8:00am - 10:00am", "2:00pm - 4:00pm"]},
//{id:"Wednesday", courses:["Software Engineering"," Secure Networks"], time:["2:00pm - 4:00pm", "5:00pm - 6:00pm"]},
//{id:"Thursday", courses:["Software Engineering"," Digital Signal Processing"], time:["8:00am - 10:00am", "12:00pm - 2:00pm"]}




}
