import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'app/star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  tabs;
  defaultName = "Obi-Wan";
  swService: StarWarsService

  constructor(swService: StarWarsService) {
    this.swService = swService;

  }

  ngOnInit() {
    this.getTabs();
  }

  getTabs() {
    this.tabs = this.swService.getTabs().filter((item)=>item !== 'all');
    return this.tabs;
  }
  onSubmit(form) {
    if (form.invalid) {
      return
    }
    console.log(form.value);
    this.swService.addCharacter(form.value.name, form.value.side)
  }


}
