import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValantDemoApiClient } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class MazeService {

  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getMaze(): Observable<any[]> {
    return this.httpClient.mazeAll();
  }

  public getMoves(): Observable<any[]> {
    return this.httpClient.moves();
  }

  public saveMaze(maze: string[][]): Observable<any> {
    return this.httpClient.maze(maze);
  }

  public getMazeStartCoords(maze: string[][]) {
    if (maze) {
      for (var i=0;i<maze.length;i++) {
        for (var j=0;j<maze[i].length;j++) {
          if (maze[i][j] === 'S') {
            return [i, j];
          }
        }
      }
    }

    return [-1, -1];
  }

}
