import { Component, OnInit } from '@angular/core';
import { TripManagerService } from 'src/app/trip-manager.service';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent implements OnInit {

  constructor(private tripMgr: TripManagerService) { }

  inputValues = {
    name: "",
    desc: "",
    country: "",
    price: 99999,
    startDate: "1970-01-01",
    endDate: "1970-01-01",
    available: 0,
    thumbnail: ""
  }

  ngOnInit(): void {
  }

  addTrip() {
    this.tripMgr.addTrip(this.inputValues);
  }
}
