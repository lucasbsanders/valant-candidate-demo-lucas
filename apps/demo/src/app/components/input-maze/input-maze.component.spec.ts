import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMazeComponent } from './input-maze.component';

describe('InputMazeComponent', () => {
  let component: InputMazeComponent;
  let fixture: ComponentFixture<InputMazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMazeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
