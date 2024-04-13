import { Injectable } from '@angular/core';
// import { TripManagerService } from '../trip-manager.service';
import {BehaviorSubject} from "rxjs";
import IHistoryEntry from './shared/IHistoryEntry';
import ITrip from '../trips/shared/ITrip';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AuthService} from '../shared/services/auth.service';

import { getDocs } from "firebase/firestore"; 
import { collection, query, where } from "firebase/firestore";

import { getCountFromServer } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  historyEntries: BehaviorSubject<IHistoryEntry[]>;

  constructor(private db: AngularFirestore, private auth: AuthService) {
    this.historyEntries = new BehaviorSubject([
      // {
      //   id: "123124adads",
      //   purchaseDate: "2022-09-16",
      //   reservedAmount: 20,
      //   country: "Poland",
      //   startDate: "2022-10-10",
      //   endDate: "2022-10-12",
      //   totalPrice: 31400,
      //   name: "Wycieczka po Toruniu"
      // },
      // {
      //   id: "xdxdasdasf12",
      //   purchaseDate: "2022-07-26",
      //   reservedAmount: 10,
      //   country: "Poland",
      //   startDate: "2023-10-10",
      //   endDate: "2023-10-12",
      //   totalPrice: 21400,
      //   name: "Wycieczka do Wadowic"
      // },
    ] as IHistoryEntry[]);
  }

  async getUserHistory(uid: string) {
    console.log("aaaaaaaaaaa");
    const collectionRef = collection(this.db.firestore, "history");

    const q = query(collectionRef, where("userId", "==", uid));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(item => item.data() as IHistoryEntry);    
  }

  addEntry(tripId: string, amount: number, trip: ITrip ): void {
    if (trip !== undefined) {
      let entry = {
        tripId: tripId,
        userId: this.auth.getUserData().getValue().uid,
        reservedAmount: amount,
        purchaseDate: (new Date).toJSON().split("T")[0],
        country: trip.country,
        startDate: trip.startDate,
        endDate: trip.endDate,
        totalPrice: amount * trip.price,
        name: trip.name
      }

      // let data = JSON.parse(JSON.stringify(this.historyEntries.getValue()));
      // data = [...data, entry];
      // this.historyEntries.next(data);
      this.db.collection("history").add(entry);
    }
  }

  async didUserReviewTrip(userId: string, tripId: string) {
    const q = query(collection(this.db.firestore, 'reviews'), where('tripId', '==', tripId), where('userId', '==', userId));

    // const querySnapshot = await getDocs(q);
    const querySnapshot = await getCountFromServer(q);
    
    return querySnapshot.data().count > 0;
  }

  async didUserBuyTrip(userId: string, tripId: string) {
    const q = query(collection(this.db.firestore, 'history'), where('tripId', '==', tripId), where('userId', '==', userId));

    // const querySnapshot = await getDocs(q);
    const querySnapshot = await getCountFromServer(q);
    
    return querySnapshot.data().count > 0;
  }
}
