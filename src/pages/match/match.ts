import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { Match, MatchState } from "../../app/data/match";
import {PlayerPage} from "../player/player";

@Component({
    selector: 'page-list',
    templateUrl: 'match.html'
})
export class MatchPage {
    match: Match;
    MatchState: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
        console.log(navParams);
        this.match = navParams.get('match');
        this.MatchState = MatchState;
    }

    matchWinClick(event) {
        this.match.state = MatchState.Win;
        this.dismiss()
    }

    matchPeaceClick(event) {
        this.match.state = MatchState.Peace;
        this.dismiss()
    }

    matchLoseClick(event) {
        this.match.state = MatchState.Lose;
        this.dismiss()
    }

    onPlayer1Click(event) {
        this.navCtrl.push(PlayerPage, { player : this.match.player1 });
    }

    onPlayer2Click(event) {
        this.navCtrl.push(PlayerPage, { player : this.match.player2 });
    }

    dismiss()
    {
        this.viewCtrl.dismiss();
    }
}

