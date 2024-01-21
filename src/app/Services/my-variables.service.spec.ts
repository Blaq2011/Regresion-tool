import { TestBed } from '@angular/core/testing';

import { MyVariablesService } from './my-variables.service';

describe('MyVariablesService', () => {
  let service: MyVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
