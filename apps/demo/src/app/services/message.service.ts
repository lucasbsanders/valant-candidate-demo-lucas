import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: string = '';

  constructor() { }

  public setCoords(i: number, j: number) {
    this.message = `Current location: [${i}, ${j}]`;
  }
}
