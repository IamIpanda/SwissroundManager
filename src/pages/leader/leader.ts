import { Component, ViewChild } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import { LeaderPlayerPage } from './players/players'
import { LeaderRulePage } from './rule/rule'
import { Config } from "../../app/data/config";
import { Game } from "../../app/data/game";
import { Data } from "../../app/data/data";
import { MatchesPage } from "../matches/matches";
import { ArchivesPage } from "./archives/archives"

@Component({
  selector: 'page-list',
  templateUrl: 'leader.html'
})
export class LeaderPage {
  config: any;
  @ViewChild('gameName') gameNameInputbox;
  @ViewChild('gameRoundCount') gameRoundCountInputBox;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.config = Config;
    setTimeout(() => {
      this.gameRoundCountInputBox.placeholder = Math.max(Math.round(Data.players.length / 2), 2).toString();
    }, 150);
  }

  playersTapped(event) {
    this.navCtrl.push(LeaderPlayerPage);
  }

  ruleTapped(event) {
    this.navCtrl.push(LeaderRulePage);
  }

  startGameTapped(event) {
    this.setGameRoundCount();
    this.setGameName();
    Data.newRound();
    this.navCtrl.setRoot(MatchesPage, {}, { animate: true });
  }

  matchNameChanged(event) {
    this.setGameName();
  }

  roundCountChanged(event) {
    this.setGameRoundCount();
  }

  setGameName()
  {
    if (this.gameNameInputbox.value == "")
      Game.gameName = this.gameNameInputbox.placeholder;
    else
      Game.gameName = this.gameNameInputbox.value;
  }

  setGameRoundCount()
  {
    if (!this.gameRoundCountInputBox || !this.gameRoundCountInputBox.value || this.gameRoundCountInputBox.value <= 0)
      Game.rounds = parseInt(this.gameRoundCountInputBox.placeholder);
    else
      Game.rounds = parseInt(this.gameRoundCountInputBox.value);
  }

  showLoadButton()
  {
      //return Data.getDataList().length > 0;
  }

  onLoadButtonTapped()
  {
      // this.navCtrl.push(MatchPage, { match: item });
      let modal = this.modalCtrl.create(ArchivesPage, {} );
      modal.present();

  }
}
