import { TestBed } from '@angular/core/testing';

import { MockClientService } from './mock-client.service';

describe('MockClientService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
