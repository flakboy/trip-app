import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TripManagerService } from '../trip-manager.service';
import { ShoppingCartService } from '../trips/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  selectedTrips: {amount: number, name: string, price: number, id: string}[] = [];
  total: number = 0;
  selectedCount = 0;

  constructor(private cartService: ShoppingCartService, private tripMgr: TripManagerService) {
  }

  ngOnInit(): void {
    this.cartService.selectedTrips.subscribe(data => {
      this.selectedTrips = data;
      this.selectedCount = this.selectedTrips.reduce((acc, item) => {
          return acc + item.amount;
      }, 0)
    })
    this.cartService.total.subscribe(data => {
      this.total = data;
    })
  }

  buyTrip(id: string): void {
    this.tripMgr.buyTrip(id, this.selectedCount);
    this.cartService.updateSelected({id: id, newCount: 0});
  }
}
