
export class EkuaResume{
  schoolHistory(){
    console.log('Akua school history');
  }

  familyHistory(){

    console.log('Akua family history');

  }

  hobbies(){

    console.log('Akua hobbies');
  }
}

export class StellaResume{

  schoolHistory(){
    console.log('stella school history');
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
