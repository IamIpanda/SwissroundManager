import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Data } from '../../app/data/data'
import { Round } from '../../app/data/round'

@Component({
    selector: 'page-list',
    templateUrl: 'history.html'
})
export class HistoryPage {
    rounds: Array<Round>;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.rounds = Data.rounds;
    }

    itemTapped(event, item) {

    }
}
