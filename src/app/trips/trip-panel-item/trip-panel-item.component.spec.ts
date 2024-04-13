import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPanelItemComponent } from './trip-panel-item.component';

describe('TripPanelItemComponent', () => {
  let component: TripPanelItemComponent;
  let fixture: ComponentFixture<TripPanelItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripPanelItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPanelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
