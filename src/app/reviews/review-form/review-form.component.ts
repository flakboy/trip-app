import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HistoryService } from 'src/app/history/history.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReviewsService } from '../reviews.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() tripId!: string;
  constructor(
    private formBuilder: FormBuilder, 
    private reviewsSrvc: ReviewsService, 
    public auth: AuthService, 
    private history: HistoryService,
    private af: AngularFirestore
  ) { }
  form!: FormGroup;
  inputErrors: string[] = [];
  formEnabled: boolean = false;
  isUserPermitted: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "username": [this.auth.getUserName(), Validators.required],
      "title": [null, Validators.required],
      "rating": [null, Validators.required],
      "comment": [null, [Validators.required, Validators.min(20), Validators.max(500)]],
      "date": [null],
    });

    // this.history.didUserReviewTrip(this.auth.getCurrentUserId(), this.tripId).then(data => {
    //   this.reviewAlreadyPublished = data;
    // });

    this.setUserPermission();
  }

  async setUserPermission() {
    Promise.all([
      this.history.didUserReviewTrip(this.auth.getCurrentUserId(), this.tripId),
      this.history.didUserBuyTrip(this.auth.getCurrentUserId(), this.tripId),
    ]).then((results) => {
      this.isUserPermitted = !results[0] && results[1];
    })
  }

  isFieldValid(field: string) {
    if (this.form.get(field) !== null && this.form.get(field) !== undefined) {
      return this.form!.get(field)!.valid;
    }
    return undefined
  }

  onSubmit() {
    this.inputErrors = [];
    if (this.form.valid) {
      // console.log('form submitted');
      this.reviewsSrvc.addReview({
        userId: this.auth.getCurrentUserId(),
        name: this.form.controls['title'].value,
        username: this.form.controls['username'].value,
        tripId: this.tripId,
        rating: this.form.controls['rating'].value,
        comment: this.form.controls['comment'].value,
        purchaseDate: this.form.controls['date'].value,
      });
      this.form.reset();
    } else {

      for (let key of Object.keys(this.form.controls)) {
        let errors = this.form.controls[key].errors;
        if (errors !== null) {
          if (errors.hasOwnProperty("required")) {
            this.inputErrors.push(`Pole ${key} jest wymagane!`);
          }
        }
      }

      let comment = this.form.controls["comment"];
      if (comment.errors !== null && comment.errors.hasOwnProperty("minlength")) {
        this.inputErrors.push(`Minimalna długość komentarza to ${comment.errors!["minlength"].requiredLength}!`);
      }
      
      if (comment.errors !== null && comment.errors.hasOwnProperty("maxlength")) {
        this.inputErrors.push(`Maksymalna długość komentarza to ${comment.errors!["maxlength"].requiredLength}!`);
      }
    }
    window.location.reload();
  }

}
