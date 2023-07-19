import { TestBed } from '@angular/core/testing';

import { TreeGridService } from './tree-grid-service.service';

describe('TreeGridService', () => {
  let service: TreeGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
