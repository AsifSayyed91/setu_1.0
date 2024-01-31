import { TestBed } from '@angular/core/testing';

import { AccountRegisterOtpService } from './account-register-otp.service';

describe('AccountRegisterOtpService', () => {
  let service: AccountRegisterOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountRegisterOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
