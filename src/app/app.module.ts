import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LeaderPage } from '../pages/leader/leader';
import { LeaderRulePage } from '../pages/leader/rule/rule';
import { LeaderPlayerPage } from '../pages/leader/players/players'
import { PlayersPage } from '../pages/players/players';
import { PlayerPage } from '../pages/player/player';
import { MatchesPage } from '../pages/matches/matches';
import { MatchPage } from '../pages/match/match';
import { HistoryPage } from '../pages/history/history'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LeaderPage,
    LeaderRulePage,
    LeaderPlayerPage,
    PlayersPage,
    PlayerPage,
    MatchesPage,
    MatchPage,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      LeaderPage,
      LeaderRulePage,
      LeaderPlayerPage,
      PlayersPage,
      PlayerPage,
      MatchesPage,
      MatchPage,
      HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
