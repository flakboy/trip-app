import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HistoryService } from '../history.service';
import IHistoryEntry from '../shared/IHistoryEntry';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  entries: IHistoryEntry[] = [];

  constructor(private history: HistoryService, private auth: AuthService) { }
  todayDate = (new Date()).toJSON().split("T")[0];


  ngOnInit(): void {
    this.fetchHistoryEntries()
  }

  async fetchHistoryEntries() {
    this.entries = await this.history.getUserHistory(this.auth.getUserData().getValue().uid)
  }

}
