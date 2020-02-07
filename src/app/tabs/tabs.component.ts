import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'app/star-wars.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  tabs = [];

  swService: StarWarsService

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {
    this.getTabs();
  }

  getTabs() {
    this.tabs = this.swService.getTabs();
    return this.tabs;
  }


}
