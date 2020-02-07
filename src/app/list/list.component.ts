import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { StarWarsService } from 'app/star-wars.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  characters: {}[]
  loadedSide = 'all';
  swService: StarWarsService
  activeRoute: ActivatedRoute
  subscription: Subscription

  constructor(swService: StarWarsService, activeRoute: ActivatedRoute) {
    this.activeRoute = activeRoute
    this.swService = swService;
  }

  ngOnInit() {
    
    this.activeRoute.params.subscribe(
      (params) => {
        this.characters = this.getChars(params.side);
        this.loadedSide = params.side;
      },
      (error) => {
        // on error but this will never error
      },
      () => {
        // on complete but this will never end
      }
    );
    this.subscription = this.swService.charactersChanged.subscribe(
      () => {
        this.characters = this.getChars(this.loadedSide);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getChars(side) {
    return this.characters = this.swService.getCharacters(side);
  }


}
