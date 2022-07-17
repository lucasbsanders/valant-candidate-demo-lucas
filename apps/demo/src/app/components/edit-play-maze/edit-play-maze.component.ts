import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../../services/logging/logging.service';
import { MazeService } from '../../services/maze.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'valant-edit-play-maze',
  templateUrl: './edit-play-maze.component.html',
  styleUrls: ['./edit-play-maze.component.less'],
})
export class EditPlayMazeComponent implements OnInit {

  public maze: string[][];
  public editOrPlay = false;
  public isValidMaze = false;
  public showInput = false;

  public get message() {
    return this.messageService.message;
  }

  constructor(
    private mazeService: MazeService,
    private messageService: MessageService,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.getMaze();
  }

  public toggleEditOrPlay() {
    this.editOrPlay = !this.editOrPlay;
    this.messageService.setMessage('');

    if (this.editOrPlay)
      this.messageService.setMessage('Click each square to cycle through options, or');
    else {
      this.showInput = false;
      this.saveMaze();
    }
  }

  public mazeChange(maze: string[][]) {
    this.maze = maze;
    this.isValidMaze = this.mazeService.isValidMaze(maze);
  }

  public getMaze(): void {
    this.mazeService.getMaze().subscribe({
      next: (response: string[][]) => {
        this.mazeChange(response);
        this.setMazeStartMessage();
        this.logger.log('Successfully got maze');
      },
      error: (error) => {
        this.logger.error('Error getting maze: ', error);
      },
    });
  }

  public saveMaze() {
    this.mazeService.saveMaze(this.maze).subscribe({
      next: (response: string[][]) => {
        this.mazeChange(response);
        this.setMazeStartMessage();
        this.logger.log('Successfully saved maze');
      },
      error: (error) => {
        this.logger.error('Error saving maze: ', error);
      },
    });
  }

  private setMazeStartMessage() {
    this.messageService.setMessage('Option 1: use arrow keys to move. Option 2: click the arrow buttons on the square.');
  }
}
