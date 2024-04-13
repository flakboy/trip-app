import { Component, Input, OnInit } from '@angular/core';
import { TripManagerService } from 'src/app/trip-manager.service';
import ITrip from '../shared/ITrip';

@Component({
  selector: 'app-trip-panel-item',
  templateUrl: './trip-panel-item.component.html',
  styleUrls: ['./trip-panel-item.component.css']
})
export class TripPanelItemComponent implements OnInit{
  @Input() trip!: ITrip;
  editedTrip!: ITrip;
  editMode: boolean = false;

  constructor(private tripMgr: TripManagerService){}

  ngOnInit(): void {
    this.trip = JSON.parse(JSON.stringify(this.trip));
    this.editedTrip = JSON.parse(JSON.stringify(this.trip));
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    let {
      name,
      country,
      startDate,
      endDate,
      desc,
      price,
      thumbnail,
      available,
      images
    } = this.editedTrip;
    this.tripMgr.updateTripInfo(this.editedTrip.id, {
      name,
      country,
      startDate,
      endDate,
      desc,
      price,
      thumbnail,
      available,
      images,
    });
  }

  removeTrip() {
    this.tripMgr.removeTrip(this.trip.id);
  }
}
