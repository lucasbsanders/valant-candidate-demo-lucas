import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../../services/logging/logging.service';
import { MazeService } from '../../services/maze.service';

@Component({
  selector: 'valant-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.less']
})
export class MazeComponent implements OnInit {

  public maze: string[][];
  public editMode = false;

  constructor(private mazeService: MazeService,
    private logger: LoggingService) { }

  ngOnInit(): void {
    this.getMaze();
  }

  public toggleEditMode() {
    this.editMode = !this.editMode;
  }

  private getMaze(): void {
    this.mazeService.getMaze().subscribe({
      next: (response: any[]) => {
        this.maze = response;
      },
      error: (error) => {
        this.logger.error('Error getting stuff: ', error);
      },
    });
  }

}
