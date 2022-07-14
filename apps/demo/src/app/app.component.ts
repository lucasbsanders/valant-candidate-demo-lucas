import { Component, OnInit } from '@angular/core';
import { LoggingService } from './services/logging/logging.service';
import { MazeService } from './services/maze.service';

@Component({
  selector: 'valant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {

  public title = 'Lucas demo for Valant';
  public moves: string[];

  constructor(private logger: LoggingService,
    private mazeService: MazeService) {}

  ngOnInit() {
    this.logger.log('Welcome to the AppComponent');
    this.getMoves();
  }

  

  

  private getMoves(): void {
    this.mazeService.getMoves().subscribe({
      next: (response: any[]) => {
        this.moves = response;
      },
      error: (error) => {
        this.logger.error('Error getting moves: ', error);
      },
    });
  }
}
