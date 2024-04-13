import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history/history.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TripAddComponent } from './trips/trip-add/trip-add.component';
import { TripDetailsComponent } from './trips/trip-details/trip-details.component';
import { TripsComponent } from './trips/trips/trips.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ManagerGuard } from './guard/manager.guard';
import { UserManagerComponent } from './admin/user-manager/user-manager.component';
import { TripPanelComponent } from './trips/trip-panel/trip-panel.component';
import { AdminGuard } from './guard/admin.guard';
import { ClientGuard } from './guard/client.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'offers', component: TripsComponent },
  { path: 'add-trip', component: TripPanelComponent, canActivate: [ManagerGuard] },
  { path: 'cart', component: CartComponent, canActivate: [ClientGuard] },
  { path: '404', component: NotFoundComponent },
  { path: 'details/:id', component: TripDetailsComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manage-users', component: UserManagerComponent, canActivate: [AdminGuard] },

  { path: '**', redirectTo: "404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
