
export class EkuaResume{
  schoolHistory(){
    //console.log('Akua school history');
    var history = `My name is Akua. I schooled in Koforidua Sensior Technical School.
    I was the only girl in my class. After school I stayed home for a year and applied to KNUST.
    I was then admitted into KNUST to read Computer Engineering.
    Interestingly, am one of the only two girls in my class.
    `;

    return history;
  }

  familyHistory(){

    //console.log('Akua family history');
    var family = `I live with both my mum and dad at Koforidua. I have 3 elder brothers and
    2 elder sisters. I have a twin brother.`;
    return family;
  }

  hobbies(){

    //console.log('Akua hobbies');
    var hobbies = `Its had to say what my hobby is because i love to do a lot of things.
    What I love doing most is cooking. I also explore a lot of cooking recipes. its fun. And as the
    saying goes food is art so I express myself through food.`;

    return hobbies;
  }
}

export class StellaResume{

  schoolHistory(){
    //console.log('stella school history');
    var history = `Am Stella. I schooled in Fijai Senior High School Sekondi in the western region.
    I read Science. After school I stayed home for a year and applied to KNUST.
    I was then admitted into KNUST to read Computer Engineering.
    Interestingly, am one of the only two girls in my class.
    It was challenging at first but I got accustomed to the whole environment. Being among about 50
    boys is really interesting. Trust me.
    `;

    return history;
  }

  familyHistory(){
    //console.log('stella family history');
    var family = `I live with both my mum and dad in Takoradi. I am the eldest of three children.
    I have one brother and one sister`;
    return family;
  }

  hobbies(){
    //console.log('stella hobbies');
    var hobbies = `Well I dont know if its a hobby or not but I love watching movies with
    challenging story lines. Maybe its because I love reading too.`;

    return hobbies;

  }

}


export class AboutThisProject{
  choosingThisProject(){
  //  console.log('it was awesome at first');
  var whyThisProject = `Well the funny thing is we didnt even know what to work on.
  Eventually we got this idea that was furthur expanded by our project supervisor.
  It has been fun so far. `;

  return whyThisProject;
  }

  challenges(){
  //  console.log('very challenging');
  var challenges = `Well this project has been very challenging.
  At first we struggled before we got the course content from the departments.
  Most importantly we were most amateurs in the software world so our pace was a bit slow
  but we finished eventually. As we have plans on improving this project, We would update this section as
  the challenges increase`;

  return challenges;
  }

  experiences(){
    //console.log('so much experience');
    var experiences =`We have had so many experiences in this project`;
    return experiences;
  }
}



export class aboutUsFacade{

  private aboutEkua : EkuaResume;
  private aboutStella : StellaResume;
  private theProject : AboutThisProject;

  constructor(aboutEkua : EkuaResume, aboutStella : StellaResume,theProject : AboutThisProject){
    this.aboutEkua = aboutEkua;
    this.aboutStella = aboutStella;
    this.theProject = theProject;
  }

  public seeAboutAkua(){
    var schoolHistory=this.aboutEkua.schoolHistory();
    var hobbies = this.aboutEkua.hobbies();
   return[schoolHistory,hobbies];
  }

  public seeAboutStella(){
  var schoolHistory =  this.aboutStella.schoolHistory();
  var hobbies =  this.aboutStella.hobbies();
  return[schoolHistory,hobbies];
  }

  public projectDifficulty(){
  var challenges=  this.theProject.challenges();
  var experiences =  this.theProject.experiences();
  console.log("sent");
  return[challenges,experiences];

  }

  public aboutProject(){
    var project = this.theProject.choosingThisProject();
    return project;
  }

}
