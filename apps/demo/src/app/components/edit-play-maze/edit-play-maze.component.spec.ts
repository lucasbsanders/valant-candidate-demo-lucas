import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppModule } from '../../app.module';
import { LoggingService } from '../../services/logging/logging.service';
import { SilentLogger } from '../../services/logging/silent-logger';
import { MazeService } from '../../services/maze.service';
import { MessageService } from '../../services/message/message.service';
import { SilentMessage } from '../../services/message/silent-message.service';
import { EditPlayMazeComponent } from './edit-play-maze.component';

describe('EditPlayMazeComponent', () => {
  let shallow: Shallow<EditPlayMazeComponent>;
  const defaultMaze = [['S', 'O'], ['X', 'E']];
  const silentMessageMock = new SilentMessage();

  beforeEach(() => {
    shallow = new Shallow(EditPlayMazeComponent, AppModule)
    .mock(MazeService, {
      getMaze: () => of(defaultMaze),
      saveMaze: (maze: string[][]) => of(maze),
      isValidMaze: () => true
    })
    .provideMock({ provide: MessageService, useValue: silentMessageMock })
    .provideMock({ provide: LoggingService, useClass: SilentLogger });
  });

  it("displays an Edit Maze button by default", async () => {
    const { find } = await shallow.render();

    expect(find("button.link").nativeElement.textContent).toContain("Edit Maze");
  });

  it("displays the message from the message service", async () => {
    const { find } = await shallow.render();

    expect(find("p#message").nativeElement.textContent).toBe(silentMessageMock.message);
  });

});