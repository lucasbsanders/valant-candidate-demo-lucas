import { Shallow } from 'shallow-render';
import { AppModule } from '../../app.module';
import { MazeService } from '../../services/maze.service';
import { InputMazeComponent } from './input-maze.component';

describe('InputMazeComponent', () => {
  let shallow: Shallow<InputMazeComponent>;
  const defaultMaze = [['S', 'O'], ['X', 'E']];

  beforeEach(() => {
    shallow = new Shallow(InputMazeComponent, AppModule)
    .mock(MazeService, {
      isValidMaze: () => true
    });
  });

  it("displays a textarea with the input maze content", async () => {
    const { find } = await shallow.render({bind: { maze: defaultMaze }});

    expect(find("textarea").nativeElement.value)
      .toBe(defaultMaze.map(row => row.join('')).join('\n'));
  });
});
