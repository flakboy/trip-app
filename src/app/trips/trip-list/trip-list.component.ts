import { Component, OnInit, Input, OnChanges } from '@angular/core';
import ITrip from '../shared/ITrip';
import { TripItemVariant } from '../trip-item/StyleFlag';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnChanges {
  @Input() trips: ITrip[] = [];
  cheapestTrip!: ITrip; 
  mostExpensiveTrip!: ITrip; 

  public modifiers = TripItemVariant;
  constructor() {}

  ngOnChanges(): void {
    this.findMaxAndMinPrice();
  }

  findMaxAndMinPrice(): void {
    this.cheapestTrip = this.trips[0];
    this.mostExpensiveTrip = this.trips[0];
    for (let item of this.trips) {
      if (item.price < this.cheapestTrip.price) {
        this.cheapestTrip = item;
      } else if (item.price > this.mostExpensiveTrip.price) {
        this.mostExpensiveTrip = item;
      }
    }
  }
}
