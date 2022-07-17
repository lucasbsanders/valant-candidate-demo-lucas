import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValantDemoApiClient } from '../api-client/api-client';

@Injectable({
  providedIn: 'root',
})
export class MazeService {

  constructor(private httpClient: ValantDemoApiClient.Client) {}

  public getMaze(): Observable<string[][]> {
    return this.httpClient.mazeAll();
  }

  public saveMaze(maze: string[][]): Observable<string[][]> {
    return this.httpClient.maze(maze);
  }

  public isValidMaze(maze: string[][]): boolean {
    let s = false, e = false;
    const len = maze[0].length;

    for (let i=0;i<maze.length;i++) {
      if (len !== maze[i].length)
        return false;

      for (let j=0;j<len;j++) {
        const val = maze[i][j];
        if ((val === 'S' && s) || (val === 'E' && e))
          return false;
        else if (val === 'S') s = true;
        else if (val === 'E') e = true;
        else if (val !== 'X' && val !== 'O')
          return false;
      }
    }

    return s && e;
  }

  public getMazeStartCoords(maze: string[][]) {
    if (maze) {
      for (let i=0;i<maze.length;i++) {
        for (let j=0;j<maze[i].length;j++) {
          if (maze[i][j] === 'S') {
            return [i, j];
          }
        }
      }
    }

    return [-1, -1];
  }

}
