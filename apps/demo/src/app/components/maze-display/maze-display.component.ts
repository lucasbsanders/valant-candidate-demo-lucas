import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { LoggingService } from '../../services/logging/logging.service';
import { MazeService } from '../../services/maze.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'valant-maze-display',
  templateUrl: './maze-display.component.html',
  styleUrls: ['./maze-display.component.less']
})
export class MazeDisplayComponent implements OnInit {
  
  @Input() maze: string[][];
  @Input() editOrPlay: boolean;
  @Output() mazeChange = new EventEmitter<string[][]>();
  
  public coords: number[] = [0, 0];

  constructor(private mazeService: MazeService,
    private messageService: MessageService,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.coords = this.mazeService.getMazeStartCoords(this.maze);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.maze) {
      this.coords = this.mazeService.getMazeStartCoords(changes.maze.currentValue);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowUp':
        this.moveFromSpaceIfValid(this.coords[0], this.coords[1], 'up');
        break;
      case 'ArrowDown':
        this.moveFromSpaceIfValid(this.coords[0], this.coords[1], 'down');
        break;
      case 'ArrowLeft':
        this.moveFromSpaceIfValid(this.coords[0], this.coords[1], 'left');
        break;
      case 'ArrowRight':
        this.moveFromSpaceIfValid(this.coords[0], this.coords[1], 'right');
        break;
      default:
        return;
    }
  }

  public isSelectedSquare(i: number, j: number) {
    return i === this.coords[0] && j === this.coords[1];
  }

  public isValidMove(i: number, j: number, dir: string) {
    if (this.isSelectedSquare(i, j) && !this.editOrPlay) {
      const [idir, jdir] = this.getCoordsOfDir(i, j, dir);
      return this.isValidSpace(idir, jdir);
    }
    else
      return false;
  }

  public isValidSpace(i: number, j: number) {
    return i >= 0 && i < this.maze.length &&
      j >= 0 && j < this.maze[i].length && this.maze[i][j] !== 'X';
  }

  public moveFromSpaceIfValid(i: number, j: number, dir: string) {
    if (this.isValidMove(i, j, dir)) {
      const [idir, jdir] = this.getCoordsOfDir(i, j, dir);
      this.moveToValidSpace(idir, jdir);
    }
  }

  public moveToValidSpace(i: number, j: number) {
    this.coords = [i, j];

    if (this.maze[i][j] === 'E') {
      this.messageService.message = 'Congratulations, you finished the maze!';
    } else {
      this.messageService.setCoords(i, j);
    }
  }

  public clickEditSpace(i: number, j: number) {
    if (this.editOrPlay) {
      switch (this.maze[i][j]) {
        case 'X':
        default:
          this.maze[i][j] = 'O';
          break;
        case 'O':
          this.maze[i][j] = 'S';
          break;
        case 'S':
          this.maze[i][j] = 'E';
          break;
        case 'E':
          this.maze[i][j] = 'X';
          break;
      }

      this.mazeChange.emit(this.maze);
    }
  }

  private getCoordsOfDir(i: number, j: number, dir: string) {
    switch(dir) {
      case 'up':
        return [i-1, j];
      case 'down':
        return [i+1, j];
      case 'left':
        return [i, j-1];
      case 'right':
        return [i, j+1];
      default:
        return [];
    }
  }

}
