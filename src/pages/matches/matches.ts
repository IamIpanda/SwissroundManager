import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import { Data } from '../../app/data/data'
import { Match } from "../../app/data/match";
import { Round } from "../../app/data/round";
import { Game } from "../../app/data/game";
import { MatchPage } from "../match/match";
import { PlayersPage } from "../players/players"

@Component({
    selector: 'page-list',
    templateUrl: 'matches.html'
})
export class MatchesPage {
    matches: Array<Match>;
    round: Round;
    game: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {
        this.round = Data.runningRound;
        this.matches = Data.runningRound.matches;
        this.game = Game;
    }

    itemTapped(event, item) {
        // this.navCtrl.push(MatchPage, { match: item });
        let modal = this.modalCtrl.create(MatchPage, { match: item });
        modal.present();
    }

    startAllTapped(event) {
        if (!this.round.canStart()) {
            let alert = this.alertCtrl.create({
                title: '开始全部对局',
                message: '部分对局已经存在结果。要擦除这些对局结果么？',
                buttons: [
                    { text: '擦除', handler: function(data) { this.round.forceStartAll() }.bind(this) },
                    { text: '保留', handler: function(data) { this.round.startAll() }.bind(this) },
                    { text: '取消' }
                ]
            });
            alert.present();
        }
        else
            this.round.startAll();
    }

    endThisRoundTapped(event) {
        if (!this.round.canFinish()) {
            let alert = this.alertCtrl.create({
                title: '结束本轮',
                message: '部分对局还没有给出结果。要立即结束本轮么？',
                buttons: [
                    { text: '是', handler: function(data) { this.round.finish(); this.newRound() }.bind(this) },
                    { text: '否' }
                ]
            });
            alert.present();
        }
        else
            this.newRound();
    }

    newRound()
    {
        if (this.round.order >= this.game.rounds)
        {
            let alert = this.alertCtrl.create({
                title: '瑞士轮结束',
                message: '瑞士轮已经结束了所有轮次。',
                buttons: [
                    {
                        text: '确定',
                        handler: () => {
                            alert.dismiss().then(() => {
                                this.navCtrl.setRoot(PlayersPage, { animation: true })
                            });
                            return false;
                        }
                    }
                ]
            });
            alert.present();
        }
        else {
            // 新一轮
            let ret = Data.newRound();
            if (!ret)
            {
                let alert = this.alertCtrl.create({
                    title: '无法排出足够数量的对局',
                    message: '瑞士轮应当结束了所有轮次。'
                });
                alert.present();
            }
            // 数据同步
            this.round = Data.runningRound;
            this.matches = Data.runningRound.matches;
        }
    }
}
