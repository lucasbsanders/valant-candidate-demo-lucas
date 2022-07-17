import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message = '';

  constructor() { }

  public setMessage(msg: string) {
    this.message = msg;
  }

  public setAlert(msg: string) {
    this.setMessage(msg);
    setTimeout(() => alert(msg), 50);
  }

}
