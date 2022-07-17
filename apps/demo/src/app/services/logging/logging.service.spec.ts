import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
  });

  it('should log a message', () => {
    const msg = '123';
    spyOn(console, 'log');

    service.log(msg);

    expect(console.log).toHaveBeenCalledWith(msg);
  });

  it('should create a browser alert', () => {
    const msg = 'ABC';
    spyOn(console, 'error');

    service.error(msg);

    expect(console.error).toHaveBeenCalledWith(msg);
  });
});
