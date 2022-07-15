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

  public saveMaze(maze: string[][]): Observable<any> {
    return this.httpClient.maze(maze);
  }

  public isValidMaze(maze: string[][]): boolean {
    var s = false, e = false;
    var len = maze[0].length;

    for (var i=0;i<maze.length;i++) {
      if (len !== maze[i].length)
        return false;

      for (var j=0;j<len;j++) {
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
