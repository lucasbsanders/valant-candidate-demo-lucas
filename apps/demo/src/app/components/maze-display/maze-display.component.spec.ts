import { Shallow } from 'shallow-render';
import { AppModule } from '../../app.module';
import { MazeService } from '../../services/maze.service';
import { MessageService } from '../../services/message/message.service';
import { SilentMessage } from '../../services/message/silent-message.service';
import { MazeDisplayComponent } from './maze-display.component';

describe('MazeDisplayComponent', () => {
  let shallow: Shallow<MazeDisplayComponent>;
  const defaultMaze = [['S', 'O'], ['X', 'E']];

  beforeEach(() => {
    shallow = new Shallow(MazeDisplayComponent, AppModule)
    .mock(MazeService, {
      getMazeStartCoords: () => [0, 0]
    })
    .provideMock({ provide: MessageService, useClass: SilentMessage });
  });

  it("displays a layout corresponding to the dimensions of the input maze", async () => {
    const { find } = await shallow.render({bind: { maze: defaultMaze, editOrPlay: false }});

    expect(find("div.square").length).toBe(defaultMaze.length * defaultMaze[0].length);
  });

});
