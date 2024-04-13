import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import ITrip from './trips/shared/ITrip';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'; 
import { HistoryService } from './history/history.service';

@Injectable({
  providedIn: 'root'
})

export class TripManagerService {  
  trips: BehaviorSubject<ITrip[]> = new BehaviorSubject([] as ITrip[]);
  newId: number = 0;
  countries: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);
  private tripsCollection: AngularFirestoreCollection;

  data: Observable<ITrip[]>;

  constructor(
    // private http: HttpClient,
    private db: AngularFirestore,
    private history: HistoryService
  ) {
    // this.http.get<ITrip[]>("/assets/trips.json").subscribe(data => {
    //   this.trips.next(data);

    //   let lastId = this.newId;
    //   data.forEach(item => {
    //     lastId = Math.max(this.newId, item.id);
    //   })
    //   this.newId = lastId + 1;
    // });

    this.tripsCollection = this.db.collection<ITrip>("trips");


    //https://stackoverflow.com/questions/46900430/firestore-getting-documents-id-from-collection
    this.data = this.tripsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ITrip;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );
    
    this.data.subscribe(data => {
      this.trips.next(data);
    })

    this.trips.subscribe(data => {
      this.getUniqueCountries(data);
    })
  }

  removeTrip(id: string): void {
    // let elemIndex: number = this.trips.value.findIndex(item => item.id === id);
    // let tripsCopy: ITrip[] = JSON.parse(JSON.stringify(this.trips.value));
    // if (elemIndex > -1) {
    //   tripsCopy.splice(elemIndex, 1);
    // }
    // this.trips.next(tripsCopy);
    this.tripsCollection.doc(id).delete();
  }
  
  addTrip(trip:
     {
      name: string;
      country: string;
      startDate: string;
      endDate: string;
      desc: string;
      price: number;
      thumbnail: string;
      available: number;
    }
  ): void {
    let tripsCopy: ITrip[] = JSON.parse(JSON.stringify(this.trips.value));
    const dane = { name: 'GR', item: 'cos tam dodaje' };
    this.tripsCollection.add({images: [], ...trip});
    // tripsCopy.push({id: this.newId, images: [], ...trip});
    // this.trips.next(tripsCopy);  
    // this.newId++;
  }

  private getUniqueCountries(data: ITrip[]) {
    let countries = new Set();
    for (let item of data) {
      countries.add(item.country);
    }

    this.countries.next([...countries] as string[]);
  }

  getTripInfo(id: string): ITrip | undefined {
    let trip = this.trips.getValue().find(item => item.id === id);
    // console.log(this.trips.getValue());
    if (trip !== undefined){
      return JSON.parse(JSON.stringify(trip));
    }
    return undefined;
  }
  
  updateTripInfo(id: string, newData: {}) {
    this.tripsCollection.doc(id).update(newData);
  }

  buyTrip(id: string, amount: number) {
    let trip = this.tripsCollection.doc(id).ref.get().then(doc => {
      if (doc.exists) {
        let amountLeft = doc.data()!["available"];
        if (amount <= amountLeft) {
          this.tripsCollection.doc(id).update({available: amountLeft - amount});
          let tripInfo = this.getTripInfo(id);
          if (tripInfo !== undefined) {
            this.history.addEntry(id, amount, tripInfo);
          }
        }
      } else {
        console.log("Dokument nie istnieje!")
      }
    }).catch(err => {
      console.error("Błąd komunikacji z serwerem", err);
    });
    // this.tripsCollection.doc(id).update(newData);
  }
}
