import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameButtonsComponent } from './game-buttons/game-buttons.component';
import { GameAreaComponent } from './game-area/game-area.component';
import { GameFooterComponent } from './game-footer/game-footer.component';
import { GameHeaderComponent } from './game-header/game-header.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';
import { GameCelluleComponent } from './game-cellule/game-cellule.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    GameButtonsComponent,
    GameAreaComponent,
    GameFooterComponent,
    GameHeaderComponent,
    GameOfLifeComponent,
    GameCelluleComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
