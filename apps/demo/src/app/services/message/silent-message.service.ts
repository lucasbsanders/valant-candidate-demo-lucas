import { MessageService } from './message.service';

export class SilentMessage implements MessageService {

  public message = 'Message';

  public setMessage() {}
  public setAlert() {}
}
