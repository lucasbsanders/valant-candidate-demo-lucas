import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ValantDemoApiClient } from '../api-client/api-client';
import { MazeService } from './maze.service';

describe('MazeService', () => {
  let service: MazeService;
  const defaultMaze = [['S', 'O'], ['X', 'E']];
  const ApiMock = {
    mazeAll: () => defaultMaze,
    maze: () => defaultMaze
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: ValantDemoApiClient.Client, useValue: ApiMock}]
    });
    service = TestBed.inject(MazeService);
  });

  it('should validate a correct maze', () => {
    expect(service.isValidMaze(defaultMaze)).toBeTruthy();
  });

  describe('should invalidate an incorrect maze - ', () => {
    it('multiple S or E', () => {
      let badMaze = [['S', 'S'], ['X', 'E']];
      expect(service.isValidMaze(badMaze)).toBeFalsy();
  
      badMaze = [['S', 'O'], ['E', 'E']];
      expect(service.isValidMaze(badMaze)).toBeFalsy();
    });
  
    it('no S or E', () => {
      let badMaze = [['O', 'X'], ['X', 'E']];
      expect(service.isValidMaze(badMaze)).toBeFalsy();
  
      badMaze = [['S', 'O'], ['X', 'X']];
      expect(service.isValidMaze(badMaze)).toBeFalsy();
    });
  
    it('row size mismatch', () => {
      const badMaze = [['S', 'O'], ['E']];
      expect(service.isValidMaze(badMaze)).toBeFalsy();
    });
  
    it('invalid letters', () => {
      let badMaze = [['S', 'x'], ['O', 'E']];
      expect(service.isValidMaze(badMaze)).toBeFalsy();
  
      badMaze = [['a', 'b'], ['S', 'E']];
      expect(service.isValidMaze(badMaze)).toBeFalsy();
    });
  });

  it('invalid letters', () => {
    let badMaze = [['S', 'x'], ['O', 'E']];
    expect(service.isValidMaze(badMaze)).toBeFalsy();

    badMaze = [['a', 'b'], ['S', 'E']];
    expect(service.isValidMaze(badMaze)).toBeFalsy();
  });

});
