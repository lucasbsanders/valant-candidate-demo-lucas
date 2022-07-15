import { Component, OnInit } from '@angular/core';
import { LoggingService } from './services/logging/logging.service';
import { MazeService } from './services/maze.service';

@Component({
  selector: 'valant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {

  public title = 'Lucas Maze Demo';

  constructor(private logger: LoggingService) {}

  ngOnInit() {
    this.logger.log('Welcome to the AppComponent');
  }

}
