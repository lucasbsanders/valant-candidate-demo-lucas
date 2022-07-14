import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  editMode: boolean = false;
  
  constructor() { }
}
