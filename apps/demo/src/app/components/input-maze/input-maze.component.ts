import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'valant-input-maze',
  templateUrl: './input-maze.component.html',
  styleUrls: ['./input-maze.component.less']
})
export class InputMazeComponent implements OnInit {

  @Input() maze: string[][];
  @Output() mazeChange = new EventEmitter<string[][]>();

  constructor() { }

  ngOnInit(): void {
  }

}
