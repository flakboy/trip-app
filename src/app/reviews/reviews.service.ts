import { Injectable } from '@angular/core';
import IReview from './shared/IReview';
// import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { getDocs, collection, query, where } from "firebase/firestore"; 

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private af: AngularFirestore) { }

  // private posts: Map<number, IReview[] >= new Map();
  // private posts: Map<string, BehaviorSubject<IReview[]>>= new Map();


  addReview(review: IReview): void {
    // if (this.posts.has(review.tripId)) {
    //   let data = this.posts.get(review.tripId);
    //   this.posts.get(review.tripId)!.next([...JSON.parse(JSON.stringify(data!.getValue())), JSON.parse(JSON.stringify(review))]);

    // } else {
    //   this.posts.set(review.tripId, new BehaviorSubject([{...review}]));
    // }
    this.af.collection("reviews").add(review);
  };

  async getReviewsById(tripId: string): Promise<IReview[]> {
    // this.af.collection("reviews").do
    const collectionRef = collection(this.af.firestore, "reviews");

    const q = query(collectionRef, where("tripId", "==", tripId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(item => item.data() as IReview);  


    // if (this.posts.has(id)) {
    //   return this.posts.get(id)!;
    // } else {
    //   this.posts.set(id, new BehaviorSubject([] as IReview[]))
    //   //pobierz z backendu
    //   return this.posts.get(id)!;
    // }
  };
}
