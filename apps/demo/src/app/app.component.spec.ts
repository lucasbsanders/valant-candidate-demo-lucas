import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {

  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    shallow = new Shallow(AppComponent, AppModule);
  });

  it("renders a title", async () => {
    const { find } = await shallow.render();

    expect(find("h1").nativeElement.textContent).toContain("Lucas Maze Demo");
  });

});
