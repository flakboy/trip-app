import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class HistoryModule { }
