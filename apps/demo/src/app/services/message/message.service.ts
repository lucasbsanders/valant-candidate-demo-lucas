import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message: string = '';

  constructor() { }

  public setMessage(msg: string) {
    this.message = msg;
  }

  public setAlert(msg: string) {
    this.setMessage(msg);
    setTimeout(() => alert(msg), 50);
  }

  public setCoords(i: number, j: number) {
    this.message = `Current Coordinates: [${i}, ${j}]`;
  }
}
