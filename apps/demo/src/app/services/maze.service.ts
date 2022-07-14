import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValantDemoApiClient } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class MazeService {

  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getMaze(): Observable<any[]> {
    return this.httpClient.maze();
  }

  public getMoves(): Observable<any[]> {
    return this.httpClient.moves();
  }

  public validateMaze(mazeInput: string[][]) {
    var foundS = false, foundE = false;

    for (var i=0;i<mazeInput.length;i++) {
      for (var j=0;j<mazeInput[i].length;j++) {
        const value = mazeInput[i][j];
        const letters = ["S", "E", "X", "O"];
      
        if (!letters.includes(value) ||
          (value === "S" && foundS) ||
          (value === "E" && foundE))
          return false;

        if (value === "S") foundS = true;
        if (value === "E") foundE = true;

      }
    }

    return true;
  } 
}
