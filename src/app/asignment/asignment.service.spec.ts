import { TestBed, inject } from '@angular/core/testing';
import { AsignmentService } from './asignment.service';

describe('SpringAsignmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsignmentService]
    });
  });

  it('should be created', inject([AsignmentService], (service: AsignmentService) => {
    expect(service).toBeTruthy();
  }));
});
