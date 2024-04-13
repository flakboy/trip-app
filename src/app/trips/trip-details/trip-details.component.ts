import { Component, OnInit } from '@angular/core';
import { TripManagerService } from 'src/app/trip-manager.service';
import ITrip from '../shared/ITrip';


import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  info: ITrip | undefined = undefined;
  id!: string;
  selectedAmount: number = 0;

  constructor(tripMgr: TripManagerService, private route: ActivatedRoute, private shoppingCart: ShoppingCartService) {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get("id");
      tripMgr.trips.subscribe(data => {
        if (id !== null) {
          this.id = id;
          this.info = tripMgr.getTripInfo(id);
        }
      })
    });
    if (this.info !== undefined) {
      let data = this.shoppingCart.getSelectedById(this.info.id);
      this.selectedAmount = data.amount;
    }
  }

  ngOnInit(): void {
  }

  
  increaseSelectedAmount(): void {
    if (this.info !== undefined && this.selectedAmount + 1 <= this.info.available) {      
      this.shoppingCart.updateSelected({id: this.info.id, newCount: this.selectedAmount + 1})

      this.selectedAmount++;

    }
  }

  decreaseSelectedAmount(): void {
    if (this.selectedAmount - 1 >= 0) {
      this.selectedAmount--;
      if (this.info !== undefined)
        this.shoppingCart.updateSelected({id: this.info.id, newCount: this.selectedAmount})
    }
  }
}
