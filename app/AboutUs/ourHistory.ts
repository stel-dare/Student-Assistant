
export class EkuaResume{
  schoolHistory(){
    //console.log('Akua school history');
    var history = "My name is Akua. I am one of the only two ladies in computer engineering year 4 class of 2018";
  }

  familyHistory(){

    //console.log('Akua family history');
    var family ="Am the last born of my parents. I have a twin.";

  }

  hobbies(){

    console.log('Akua hobbies');
  }
}

export class StellaResume{

  schoolHistory(){
    //console.log('stella school history');
    var history = "My name is Stella. I am one of the only two ladies in computer engineering year 4 class of 2018";
  }

  familyHistory(){
    console.log('stella family history');
  }

  hobbies(){
    console.log('stella hobbies');

  }

}


export class AboutThisProject{
  choosingThisProject(){
    console.log('it was awesome at first');
  }

  challenges(){
    console.log('very challenging');
  }

  experiences(){
    console.log('so much experience');
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

  public seeAboutUs(){
    this.aboutEkua.schoolHistory();
    this.aboutEkua.hobbies();
    this.aboutStella.schoolHistory();
    this.aboutStella.hobbies();
  }

  public projectDifficulty(){
    this.theProject.challenges();
    this.theProject.experiences();
  }

}
