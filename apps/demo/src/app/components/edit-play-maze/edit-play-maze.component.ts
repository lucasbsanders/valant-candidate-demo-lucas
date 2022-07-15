import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../../services/logging/logging.service';
import { MazeService } from '../../services/maze.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'valant-edit-play-maze',
  templateUrl: './edit-play-maze.component.html',
  styleUrls: ['./edit-play-maze.component.less']
})
export class EditPlayMazeComponent implements OnInit {

  public maze: string[][];
  public editOrPlay = false;
  public isValidMaze = false;
  public showInput = false;

  public get message() {
    return this.messageService.message;
  }

  constructor(private mazeService: MazeService,
    private messageService: MessageService,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.getMaze();
  }

  public toggleEditOrPlay() {
    this.editOrPlay = !this.editOrPlay;
    this.messageService.message = '';
    
    if (this.editOrPlay)
      this.messageService.message = 'Click any box to edit';
    else {
      this.showInput = false;
      this.saveMaze();
    }
  }

  public mazeChange(maze: string[][]) {
    this.maze = maze;
    this.isValidMaze = this.checkValidMaze(maze);
  }

  private checkValidMaze(maze: string[][]): boolean {
    var s = false, e = false;

    for (var i=0;i<maze.length;i++) {
      for (var j=0;j<maze[i].length;j++) {
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

  private getMaze(): void {
    this.mazeService.getMaze().subscribe({
      next: (response: any[]) => {
        this.mazeChange(response);
        this.setMazeStartMessage();
        this.logger.log('Got maze from server');
      },
      error: (error) => {
        this.logger.error('Error getting maze: ', error);
      },
    });
  }

  private saveMaze() {
    this.mazeService.saveMaze(this.maze).subscribe({
      next: (response: any[]) => {
        this.mazeChange(response);
        this.setMazeStartMessage();
        this.logger.log('Successfully saved maze');
      },
      error: (error) => {
        this.logger.error('Error getting maze: ', error);
      },
    })
  }

  private setMazeStartMessage() {
    const [i, j] = this.mazeService.getMazeStartCoords(this.maze);
    this.messageService.setCoords(i, j);
  }

}
