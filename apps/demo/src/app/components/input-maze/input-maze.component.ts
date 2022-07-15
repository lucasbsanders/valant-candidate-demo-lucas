import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MazeService } from '../../services/maze.service';

@Component({
  selector: 'valant-input-maze',
  templateUrl: './input-maze.component.html',
  styleUrls: ['./input-maze.component.less']
})
export class InputMazeComponent implements OnInit {

  @Input() maze: string[][];
  @Output() mazeChange = new EventEmitter<string[][]>();
  @Output() close = new EventEmitter<void>();

  public validInput = false;
  public mazeAsText = '';
  public instructions = 'Type rows of letters with no spaces. Use any number of \'X\' and \'O\', and 1 each of \'S\' and \'E\'. For example:';

  constructor(private mazeService: MazeService) { }

  ngOnInit(): void {
    this.mazeAsText = this.maze.map((row: string[]) => row.join('')).join('\n');
    this.validInput = this.mazeService.isValidMaze(this.maze);
  }

  public inputMaze(event: any) {
    const inputMaze = event.target.value.trim()
      .split('\n')
      .map((row: string) => row.trim().split(''));

    this.validInput = this.mazeService.isValidMaze(inputMaze);
    if (this.validInput) {
      this.maze = inputMaze;
    }
  }

  public saveMaze() {
    if (this.mazeService.isValidMaze(this.maze)) {
      this.mazeChange.emit(this.maze);
      this.close.emit();
    }
  }

  public closeBox() {
    this.close.emit();
  }

}
