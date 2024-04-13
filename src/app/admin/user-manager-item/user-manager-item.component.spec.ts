import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerItemComponent } from './user-manager-item.component';

describe('UserManagerItemComponent', () => {
  let component: UserManagerItemComponent;
  let fixture: ComponentFixture<UserManagerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagerItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
