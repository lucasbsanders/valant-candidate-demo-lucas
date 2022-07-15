import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppModule } from '../../app.module';
import { LoggingService } from '../../services/logging/logging.service';
import { SilentLogger } from '../../services/logging/silent-logger';
import { MazeService } from '../../services/maze.service';
import { MessageService } from '../../services/message/message.service';
import { SilentMessage } from '../../services/message/silent-message.service';
import { EditPlayMazeComponent } from './edit-play-maze.component';

const mockMazeService = {
  getMaze: jest.fn(() => of([])),
  saveMaze: jest.fn((input) => of(input))
};

describe('EditPlayMazeComponent', () => {
  let component: Shallow<EditPlayMazeComponent>;
  let fixture: ComponentFixture<EditPlayMazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlayMazeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    component = new Shallow(EditPlayMazeComponent, AppModule)
      .provideMock({ provide: MazeService, useValue: mockMazeService })
      .provideMock({ provide: MessageService, useClass: SilentMessage })
      .provideMock({ provide: LoggingService, useClass: SilentLogger});
    jest.clearAllMocks();
    fixture = TestBed.createComponent(EditPlayMazeComponent);
  });

  it('should render', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('gets stuff from the API on init', async () => {
    await component.render();
    expect(mockMazeService.getMaze).toHaveBeenCalledTimes(1);
  });

  it('saves stuff from the API on save', async () => {
    await component.render();
    fixture.componentInstance.saveMaze();
    expect(mockMazeService.saveMaze).toHaveBeenCalledTimes(1);
  });
});
