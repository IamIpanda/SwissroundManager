import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Data } from '../../app/data/data'
import { Player } from '../../app/data/player'
import {PlayerPage} from "../player/player";

@Component({
    selector: 'page-list',
    templateUrl: 'players.html'
})
export class PlayersPage {
    players: Array<Player>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        Data.sortPlayers();
        this.players = Data.players;
    }

    itemTapped(event, item) {
        this.navCtrl.push(PlayerPage, { player : item } )
    }
}
