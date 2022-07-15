import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { ValantDemoApiClient } from './api-client/api-client';
import { AppComponent } from './app.component';
import { EditPlayMazeComponent } from './components/edit-play-maze/edit-play-maze.component';
import { InputMazeComponent } from './components/input-maze/input-maze.component';
import { MazeDisplayComponent } from './components/maze-display/maze-display.component';
import { LoggingService } from './services/logging/logging.service';
import { MazeService } from './services/maze.service';

export function getBaseUrl(): string {
  return environment.baseUrl;
}

@NgModule({
  declarations: [
    AppComponent,
    EditPlayMazeComponent,
    InputMazeComponent,
    MazeDisplayComponent
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    LoggingService,
    MazeService,
    ValantDemoApiClient.Client,
    { provide: ValantDemoApiClient.API_BASE_URL, useFactory: getBaseUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
