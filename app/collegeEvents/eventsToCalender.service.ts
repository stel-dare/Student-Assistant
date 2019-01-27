import { Injectable } from "@angular/core";
import { Couchbase } from 'nativescript-couchbase';



@Injectable()
export class EventsToCalender {
  //for databese refrence
  private database: any;

  public constructor() {
    //database refrence
      this.database = new Couchbase("events-database");
}

    //gets whole database
    public getDatabase() {
        return this.database;
    }

      //gets document(object) in database
      //returns the value of a key
    public getDocument(docId: string) {
        return this.database.getDocument(docId);
    }

    //creates a document(object) in the database
    public createDocument(data: any, docId: string) {
        return this.database.createDocument(data, docId);
    }

    //updates document(object) in database
    public updateDocument(docId: string, data: any) {
        return this.database.updateDocument(docId, data);
    }

    //deletes document(object) in database
    public deleteDocument(docId: string) {
        return this.database.deleteDocument(docId);
    }

}
