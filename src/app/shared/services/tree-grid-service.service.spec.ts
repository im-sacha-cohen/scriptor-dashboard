import { TestBed } from '@angular/core/testing';

import { TreeGridServiceService } from './tree-grid-service.service';

describe('TreeGridServiceService', () => {
  let service: TreeGridServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeGridServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
