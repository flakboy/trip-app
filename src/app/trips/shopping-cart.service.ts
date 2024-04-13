import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ICartInfo from 'src/app/shared/ICartInfo';
import { HistoryService } from '../history/history.service';
import { TripManagerService } from '../trip-manager.service';
import ITrip from './shared/ITrip';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  //łączna cena wszystkich zarezerwowanych wycieczek
  total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  private selected: Map<string, number> = new Map();
  selectedTrips = new BehaviorSubject<ICartInfo[]>([]);

  private trips: Map<string, ITrip> = new Map();

  cartInfo = new BehaviorSubject(new Map());

  constructor(tripMgr: TripManagerService, history: HistoryService) {
    tripMgr.trips.subscribe(data => {
      for (let entry of data) {
        this.trips.set(entry.id, entry);
      }
    })
  }

  updateSelected(data: {id: string, newCount: number}) {
    this.selected.set(data.id, data.newCount);
    let copy: ICartInfo[] = [];
    let total: number = 0;
    for (let [key, value] of this.selected) {
      if (value > 0) {
        let entry = {
          amount: value,
          name: this.trips.get(key)!.name,
          price: this.trips.get(key)!.price,
          id: data.id
        };
        copy.push(entry);
        total += value * this.trips.get(key)!.price;
      }
    }

    this.selectedTrips.next(copy);
    this.total.next(total);
  }

  getSelectedById(id: string) {
    return ({
      id: id,
      amount: this.selected.get(id) !== undefined ? this.selected.get(id)! : 0
    });
  }
}
