import { Component, Input, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import IReview from '../shared/IReview';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {

  @Input() data!: IReview;

  constructor() {

  }

  ngOnInit(): void {
  }

}
