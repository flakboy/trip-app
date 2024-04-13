import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserManagerItemComponent } from './user-manager-item/user-manager-item.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserManagerComponent,
    UserManagerItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserManagerModule { }
