import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CandidatesService } from './candidates.service';

describe('CandidatesService', () => {
  let service: CandidatesService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CandidatesService],
    });

    service = TestBed.inject(CandidatesService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

});
