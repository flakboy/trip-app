import { Component } from '@angular/core';
import ITrip from '../shared/ITrip';
import { TripManagerService } from 'src/app/trip-manager.service';


@Component({
  selector: 'app-trip-panel',
  templateUrl: './trip-panel.component.html',
  styleUrls: ['./trip-panel.component.css']
})
export class TripPanelComponent {
  trips: ITrip[] = [];

  constructor(private tripMgr: TripManagerService) {}

  ngOnInit(): void {
    this.tripMgr.trips.subscribe(data => {
      this.trips = data;
    })
  }
}
