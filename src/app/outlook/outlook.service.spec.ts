import { TestBed } from '@angular/core/testing';

import { OutlookService } from './outlook.service';

describe('OutlookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutlookService = TestBed.get(OutlookService);
    expect(service).toBeTruthy();
  });
});
