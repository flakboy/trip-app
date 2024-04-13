import { Component } from '@angular/core';
// import ICartInfo from 'src/app/shared/ICartInfo';
import IFilterOptions from 'src/app/shared/IFilterOptions';
import { TripManagerService } from './trip-manager.service';
import ITrip from './trips/shared/ITrip';
import { ShoppingCartService } from './trips/shopping-cart.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  trips: ITrip[] = [];
  filtered: ITrip[] = [];

  filterBounds = {
    maxPrice: 100000,
    minPrice: 0,
    maxDate: "2038-04-18",
    minDate: "1970-01-01",
    rating: 0
  }

  filterOptions = {
    maxPrice: 100000,
    minPrice: 0,
    maxDate: "2038-04-18",
    minDate: "1970-01-01",
    minRating: 0,
    maxRating: 0,
    countries: []
  }
  selectedCount: number = 0;
  totalValue: number = 0;

  user: any = null;

  constructor(private tripMgr: TripManagerService, private cartService: ShoppingCartService, public auth: AuthService) { 
    this.tripMgr.trips.subscribe(data => {
      this.trips = data;
      this.getFilterBounds();
      this.filtered = this.trips;
    });

    cartService.selectedTrips.subscribe(data => {
      let totalReserved = 0;
      for (let item of data) {
        totalReserved += item.amount;
      }
      this.selectedCount = totalReserved;
    });
    cartService.total.subscribe(data => {
      this.totalValue = data;
    })

    auth.getUserData().subscribe(data => {
      // console.log(data);
      this.user = data;
    })
  }

  ngOnInit(): void {
  }

  getFilterBounds() {
    let maxPrice = 0;
    let minPrice = Infinity;
    let minDate = "2038-04-18";
    let maxDate = "1970-01-01";

    for (let item of this.trips) {
      if (item.price / 100 > maxPrice) {
        maxPrice = item.price / 100;
      } else if (item.price / 100 < minPrice) {
        minPrice = item.price / 100
      }

      if (item.endDate > maxDate) {
        maxDate = item.endDate;
      } else if (item.startDate < maxDate) {
        minDate = item.endDate;
      }
    }

    this.filterBounds = {
      maxDate: maxDate,
      minDate: minDate,
      maxPrice: maxPrice,
      minPrice: minPrice,
      rating: this.filterBounds.rating
    }
  }

  updateFilterValues() {
    
  }

  filterTrips(options: IFilterOptions) {
    let { minDate, maxDate, minPrice, maxPrice, minRating, maxRating } = options;
    
    let isBeforeMaxDate = (item: ITrip) => {
      if (maxDate.length > 0) {
        return item.endDate <= maxDate;
      } else {
        return true;
      }
    }

    let isAfterMinDate = (item: ITrip) => {
      if (maxDate.length > 0) {
        return item.startDate >= minDate;
      } else {
        return true;
      }
    }

    let isInPriceRange = (item: ITrip) => {
      if (minPrice <= item.price / 100 && item.price / 100 <= maxPrice) {
        return true;
      } else {
        return false;
      }
    }

    this.filtered = this.trips.filter(item => isBeforeMaxDate(item) && isAfterMinDate(item) && isInPriceRange(item));
  }
}
