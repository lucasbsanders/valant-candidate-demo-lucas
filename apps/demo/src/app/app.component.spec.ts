import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { LoggingService } from './services/logging/logging.service';
import { SilentLogger } from './services/logging/silent-logger';
import { MazeService } from './services/maze.service';

const mockMazeService = { getMaze: jest.fn(() => of([])) };

describe('AppComponent', () => {
  let component: Shallow<AppComponent>;

  beforeEach(() => {
    component = new Shallow(AppComponent, AppModule)
      .provideMock({ provide: MazeService, useValue: mockMazeService })
      .provideMock({ provide: LoggingService, useClass: SilentLogger });
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('should have as title "Valant demo"', async () => {
    const { instance } = await component.render();
    expect(instance.title).toBe('Lucas demo for Valant');
  });

  it('gets stuff from the API on init', async () => {
    await component.render();
    expect(mockMazeService.getMaze).toHaveBeenCalledTimes(1);
  });
});
