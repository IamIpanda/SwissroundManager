import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../../app/data/data';
import { MatchesPage } from "../../matches/matches";

@Component({
    selector: 'page-list',
    templateUrl: 'archives.html'
})
export class ArchivesPage {
    data: any;
    constructor(public navCtrl: NavController) {
        this.data = Data.getDataList();
    }

    itemTapped(event, name)
    {
        Data.loadData(name);
        this.navCtrl.setRoot(MatchesPage, {}, { animate: true });
    }
}
