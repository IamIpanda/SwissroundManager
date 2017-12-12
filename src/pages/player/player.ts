import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MatchState } from '../../app/data/match';
import { Player } from '../../app/data/player';
import { MatchPage } from '../match/match';

@Component({
    selector: 'page-list',
    templateUrl: 'player.html'
})
export class PlayerPage {
    player: Player;
    matchState: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.player = navParams.get("player");
        this.matchState = MatchState;
    }

    itemTapped(event, item) {
        console.log(item);
        this.navCtrl.push(MatchPage, { match: item });
    }
}
