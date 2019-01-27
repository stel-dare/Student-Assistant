export class Courses{
    name: string;
    time: string;
    venue:string;
}

export class timetable{
    day: string;
    courses: Courses[];
}
