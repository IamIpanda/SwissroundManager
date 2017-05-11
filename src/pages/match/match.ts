import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Match, MatchState } from "../../app/data/match";
import {PlayerPage} from "../player/player";

@Component({
    selector: 'page-list',
    templateUrl: 'match.html'
})
export class MatchPage {
    match: Match;
    MatchState: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log(navParams);
        this.match = navParams.get('match');
        this.MatchState = MatchState;
    }

    matchWinClick(event) {
        this.match.state = MatchState.Win;
    }

    matchPeaceClick(event) {
        this.match.state = MatchState.Peace;
    }

    matchLoseClick(event) {
        this.match.state = MatchState.Lose;
    }

    onPlayer1Click(event) {
        this.navCtrl.push(PlayerPage, { player : this.match.player1 });
    }

    onPlayer2Click(event) {
        this.navCtrl.push(PlayerPage, { player : this.match.player2 });
    }
}

