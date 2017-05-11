import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import {Data} from "../../../app/data/data";
import { Config, PeaceMode } from "../../../app/data/config";
import {MatchState} from "../../../app/data/match";

@Component({
  selector: 'page-list',
  templateUrl: 'rule.html'
})
export class LeaderRulePage {
  matchState: any;
  score: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.matchState = MatchState;
    this.score = Config.score;
  }

  defaultsTapped(event) {
    let actionsheet = this.actionSheetCtrl.create({
      title: '选择预设',
      buttons: [
        {
          text: '瑞士轮',
          handler: function () {
            Config.score[MatchState.Win] = 1;
            Config.score[MatchState.Lose] = 0;
            Config.score[MatchState.Peace] = 0;
            Config.score[MatchState.Bye] = 0;
            this.refreshThisPage();
          }.bind(this)
        },
        {
          text: '锦标赛',
          handler: function() {
            Config.score[MatchState.Win] = 3;
            Config.score[MatchState.Lose] = 0;
            Config.score[MatchState.Peace] = 1;
            Config.score[MatchState.Bye] = 1;
            this.refreshThisPage();
          }.bind(this)
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionsheet.present();
  }

  peaceTapped(event) {
    let actionsheet = this.actionSheetCtrl.create({
      title: '选择平局模式',
      buttons: [
        {
          text: '允许平局',
          handler: () => { Config.peaceMode = PeaceMode.CanPeace }
        },
        {
          text: '平局双败',
          handler: function() {
            Config.peaceMode = PeaceMode.PeaceWithLose;
            Config.score[MatchState.Peace] = 0;
            this.refreshThisPage();
          }.bind(this)
        },
        {
          text: '不允许平局',
          handler: () => { Config.peaceMode = PeaceMode.CantPeace }
        }
      ]
    });
    actionsheet.present();
  }

  inputValueChanged(event, status: MatchState) {
    Config.score[status] = parseInt(event.target.value);
  }

  refreshThisPage()
  {
  }
}
