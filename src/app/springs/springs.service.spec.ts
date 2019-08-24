import { TestBed, inject } from '@angular/core/testing';

import { SpringsService } from "./springs.service";

describe('SpringsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpringsService]
    });
  });

  it('should be created', inject([SpringsService], (service: SpringsService) => {
    expect(service).toBeTruthy();
  }));
});
