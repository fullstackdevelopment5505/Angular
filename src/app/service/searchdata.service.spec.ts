import { TestBed } from '@angular/core/testing';

import { SearchdataService } from './searchdata.service';

describe('SearchdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchdataService = TestBed.get(SearchdataService);
    expect(service).toBeTruthy();
  });
});
