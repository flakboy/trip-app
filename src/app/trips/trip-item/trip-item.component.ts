import { Component, Input, OnInit } from '@angular/core';
import { TripManagerService } from 'src/app/trip-manager.service';
import ITrip from '../shared/ITrip';
import { ShoppingCartService } from '../shopping-cart.service';
import { TripItemVariant } from './StyleFlag';

@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.css']
})

export class TripItemComponent implements OnInit {

  @Input() entry: ITrip = {
    name: "",
    country: "",
    available: 0,
    startDate: "1970-01-01",
    endDate: "1970-01-01",
    desc: "",
    price: 0,
    thumbnail: "",
    id: "",
    images: []
  };

  public modifiers = TripItemVariant;
  @Input() styleModifier: TripItemVariant = TripItemVariant.DEFAULT;


  selectedAmount: number = 0;
  constructor(private shoppingCart: ShoppingCartService, private tripMgr: TripManagerService) { }
  

  ngOnInit(): void {
    let data = this.shoppingCart.getSelectedById(this.entry.id);
    this.selectedAmount = data.amount;
  }

  increaseSelectedAmount(): void {
    if (this.selectedAmount + 1 <= this.entry.available) {      
      this.shoppingCart.updateSelected({id: this.entry.id, newCount: this.selectedAmount + 1})

      this.selectedAmount++;

    }
  }

  decreaseSelectedAmount(): void {
    if (this.selectedAmount - 1 >= 0) {
      this.selectedAmount--;

      this.shoppingCart.updateSelected({id: this.entry.id, newCount: this.selectedAmount})
    }
  }

  // remove(): void {
  //   this.tripMgr.removeTrip(this.entry.id);
  // }
}
