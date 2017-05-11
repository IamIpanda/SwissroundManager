import {Component, ChangeDetectorRef, Inject, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Data } from "../../../app/data/data"
import { Player } from "../../../app/data/player";

@Component({
  selector: 'page-list',
  templateUrl: 'players.html'
})
export class LeaderPlayerPage {
  players: Array<Player>;
  isAddingUser: boolean = false;
  editingPlayer: Player;
  // ref: ChangeDetectorRef;
  @ViewChild('newPlayerInput') newPlayerInput;
  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject(ChangeDetectorRef) cd) {
    this.players = Data.players;
    // this.ref = cd;
  }

  playerFocused(event, player) {
    this.editingPlayer = player;
    console.log("Signed" + player.name);
  }

  playerBlured(event, player) {
    this.editingPlayer = null;
    player.name = event.target.value;
  }

  editPlayer(event, player) {

  }

  removePlayer(event, player) {
    this.players.splice(this.players.indexOf(player), 1);
  }

  addPlayer(event) {
    this.isAddingUser = true;
    setTimeout(() => { this.newPlayerInput.setFocus() }, 150);
  }

  addingUserEdited(event)
  {
    this.isAddingUser = false;
    if (event.target.value == '') return;
    this.players.push(new Player(event.target.value));
  }
}
