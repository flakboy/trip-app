import { Component, Input, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import IReview from '../shared/IReview';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() tripId!: string;

  reviews = [] as IReview[];

  constructor(private reviewSrvc: ReviewsService) {
  }

  ngOnInit() {
    // this.reviewSrvc.getReviewsById(this.tripId).subscribe(data => {
    //   this.reviews = data;
    // })
    this.fetchReviews();
  }

  async fetchReviews() {
    this.reviews = await this.reviewSrvc.getReviewsById(this.tripId);
  }

}
