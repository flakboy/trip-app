import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripManagerService } from 'src/app/trip-manager.service';
import IFilterOptions from 'src/app/shared/IFilterOptions';

@Component({
  selector: 'app-trip-filter',
  templateUrl: './trip-filter.component.html',
  styleUrls: ['./trip-filter.component.css']
})
export class TripFilterComponent implements OnInit {
  @Input() limits = {
    minDate: "1970-01-01",
    maxDate: "2038-01-18",
    minPrice: 0,
    maxPrice: 1000000,
  }

  @Output() filtersModified = new EventEmitter();

  @Input() selectedOptions: IFilterOptions = {
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    maxRating: 5,
    countries: [],
    minDate: "1970-01-01",
    maxDate: "2038-01-18",
  }

  countries: string[] = [];

  constructor(tripMgr: TripManagerService) {
    tripMgr.countries.subscribe(data => {
      this.countries = JSON.parse(JSON.stringify(data));
    })
  }



  ngOnInit(): void {
  }

  updateFilters() {
    this.filtersModified.emit(this.selectedOptions);
  }
}
