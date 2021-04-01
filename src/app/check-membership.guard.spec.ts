import { TestBed, async, inject } from '@angular/core/testing';

import { CheckMembershipGuard } from './check-membership.guard';

describe('CheckMembershipGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckMembershipGuard]
    });
  });

  it('should ...', inject([CheckMembershipGuard], (guard: CheckMembershipGuard) => {
    expect(guard).toBeTruthy();
  }));
});
