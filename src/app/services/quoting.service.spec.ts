/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuotingService } from './quoting.service';

describe('Service: Quoting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuotingService]
    });
  });

  it('should ...', inject([QuotingService], (service: QuotingService) => {
    expect(service).toBeTruthy();
  }));
});
