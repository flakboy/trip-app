import { TestBed } from '@angular/core/testing';

import { TripManagerService } from './trip-manager.service';

describe('TripManagerService', () => {
  let service: TripManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
