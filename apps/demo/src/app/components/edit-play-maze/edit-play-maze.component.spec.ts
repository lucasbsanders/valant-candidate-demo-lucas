import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayMazeComponent } from './edit-play-maze.component';

describe('EditPlayMazeComponent', () => {
  let component: EditPlayMazeComponent;
  let fixture: ComponentFixture<EditPlayMazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlayMazeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlayMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
