import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {EnvService} from './env.service';

describe('EnvService', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: []
    });
  }));

  it('should be created', () => {
    const service: EnvService = TestBed.inject(EnvService);
    expect(service).toBeDefined();
  });
});
