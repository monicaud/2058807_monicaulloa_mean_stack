import { TestBed } from '@angular/core/testing';

import { ShareTaskService } from './share-task.service';

describe('ShareTaskService', () => {
  let service: ShareTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
