import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFormComponent } from './review-form/review-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewItemComponent } from './review-item/review-item.component';
import { ReviewListComponent } from './review-list/review-list.component';


@NgModule({
  declarations: [
    ReviewFormComponent,
    ReviewItemComponent,
    ReviewListComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    ReviewFormComponent, ReviewListComponent
  ]
})
export class ReviewsModule { }
