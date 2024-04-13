import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TripListComponent } from './trip-list/trip-list.component';
import { TripItemComponent } from './trip-item/trip-item.component';
import { TripFilterComponent } from './trip-filter/trip-filter.component';
import { TripAddComponent } from './trip-add/trip-add.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripsComponent } from './trips/trips.component';
import { ReviewsModule } from '../reviews/reviews.module';
import { TripPanelComponent } from './trip-panel/trip-panel.component';
import { TripPanelItemComponent } from './trip-panel-item/trip-panel-item.component';


@NgModule({
  declarations: [
    TripListComponent,
    TripItemComponent,
    TripFilterComponent,
    TripAddComponent,
    TripDetailsComponent,
    TripsComponent,
    TripPanelComponent,
    TripPanelItemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReviewsModule
  ],
  exports: [
    TripListComponent,
    TripFilterComponent,
    TripAddComponent
  ]
})
export class TripsModule { }
