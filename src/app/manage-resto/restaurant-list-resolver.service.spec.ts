import { TestBed } from '@angular/core/testing';

import { RestaurantListResolverService } from './restaurant-list-resolver.service';

describe('RestaurantListResolverService', () => {
  let service: RestaurantListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
