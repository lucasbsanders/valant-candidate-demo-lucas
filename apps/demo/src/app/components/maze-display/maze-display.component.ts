import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'valant-maze-display',
  templateUrl: './maze-display.component.html',
  styleUrls: ['./maze-display.component.less'],
})
export class MazeDisplayComponent implements OnInit, OnChanges {

  @Input() maze: string[][];
  @Input() editOrPlay: boolean;
  @Output() mazeChange = new EventEmitter<string[][]>();

  public coords: number[] = [0, 0];

  constructor(private mazeService: MazeService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.startMazeGame(this.maze);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.maze) {
      this.startMazeGame(changes.maze.currentValue);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key) {
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

  public moveFromSpaceIfValid(i: number, j: number, dir: string) {
    if (this.isValidMove(i, j, dir)) {
      this.coords = this.getCoordsOfDir(i, j, dir);

      if (this.maze[this.coords[0]][this.coords[1]] === 'E') {
        this.messageService.setAlert('Congratulations, you finished the maze!');
      } else {
        this.messageService.setMessage('Option 1: use arrow keys to move. Option 2: click the arrow buttons on the square.');
      }
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

  public isValidMove(i: number, j: number, dir: string) {
    if (this.isSelectedSquare(i, j) && !this.editOrPlay) {
      const [idir, jdir] = this.getCoordsOfDir(i, j, dir);
      return this.isValidSpace(idir, jdir);
    } else return false;
  }

  private startMazeGame(maze: string[][]) {
    this.coords = this.mazeService.getMazeStartCoords(maze);
  }

  private isValidSpace(i: number, j: number) {
    return i >= 0 && i < this.maze.length && j >= 0 && j < this.maze[i].length && this.maze[i][j] !== 'X';
  }

  private getCoordsOfDir(i: number, j: number, dir: string) {
    switch (dir) {
      case 'up':
        return [i - 1, j];
      case 'down':
        return [i + 1, j];
      case 'left':
        return [i, j - 1];
      case 'right':
        return [i, j + 1];
      default:
        return [];
    }
  }
}
