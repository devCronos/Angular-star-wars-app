import { LogService } from "./log.service";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map';

@Injectable()
export class StarWarsService {
  private characters = [
    {name: 'Luke Skywalker', side: 'none'},
    {name: 'Darth Wader', side: 'none'},
  ];
  private tabs = ['none', 'all', 'light', 'dark'];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: Http

  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    this.http.get('https://swapi.co/api/people/')
    .map((response: Response) => {
      const data = response.json();
      const extractedChars = data.results;
      const chars = extractedChars.map((char) => ({name: char.name,side: 'none'}) )
      return chars;
    })
    .subscribe(
      (data) => {
        this.characters = data;
        this.charactersChanged.next();
      }
    );
  }

  getTabs() {
    return this.tabs;
  }
  getCharacters(chosenList) {
    // tslint:disable-next-line: one-line
    if (chosenList === 'all'){
      return this.characters.slice();
    }
    return this.characters.filter((char) => char.side === chosenList);
  }
  findCharacterPosition(nameToFind){
    return this.characters.findIndex((char) => char.name === nameToFind);
  }
  onSideChosen(charInfo) {
    const pos = this.findCharacterPosition(charInfo.name);
    this.characters[pos].side = charInfo.side;
    // emit a new event with the subject
    // will listen to it in list
    this.charactersChanged.next();

    this.logService.writeLog(`changed side of ${charInfo.name}`)
  }
  addCharacter(name, side) {
    const pos = this.findCharacterPosition(name);
    if (pos === -1) {
      const newChar = {name, side};
      this.characters.push(newChar);
    } else {
      alert("Already in the data")
    }
  }

}
