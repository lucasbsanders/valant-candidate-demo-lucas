import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should set message', () => {
    const msg = 'ABC';

    service.setMessage(msg);

    expect(service.message).toBe(msg);
  });

  it('should create a browser alert', () => {
    const msg = '123';
    spyOn(window, 'alert');

    service.setAlert(msg);

    expect(service.message).toBe(msg);
    setTimeout(() => expect(window.alert).toHaveBeenCalledWith(msg), 100);
  });
});
