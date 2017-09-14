import { Round } from './round'
import { Player } from './player'
import { Match } from './match'

export class Data
{
    static players : Player[] = [];
    static rounds: Round[] = [];

    public static searchPlayerMatch(player: Player) : Match[]
    {
    	let matches : Match[] = [];
    	for (let round of this.rounds)
    		matches.push(round.searchPlayer(player));
    	return matches;
    }

    public static searchPlayers(player1: Player, player2: Player): Match
    {
    	for (let round of this.rounds)
    	{
    		let match = round.searchPlayers(player1, player2);
    		if (match != null) return match;
    	}
    	return null;
    }

    public static newRound() : Round
    {
    	let newRound = new Round(this.rounds.length + 1);
    	let ret = newRound.generate(this.players);
    	if (ret == null) return null;
    	Data.rounds.push(newRound);
    	return newRound;
    }

    public static get runningRound() : Round { return this.rounds[this.rounds.length - 1]; }

    public static addPlayer(name: string) { this.players.push(new Player(name)); }

    public static hasMet(player1: Player, player2: Player) : boolean
    {
    	if (!player1 || !player2) return null;
    	for(let match of player1.matches)
    		if (match != null)
    			if (match.anotherPlayer(player1) == player2)
    				return true;
    	return false;
    }

    public static sortPlayers()
	{
		this.players.sort((playerA, playerB) => {
			let distance = playerB.score - playerA.score;
			if (distance == 0) return playerB.smallScore - playerA.smallScore;
			return distance;
		});
	}

	public static getRank(player: Player)
	{
		if (!player) return -1;
		Data.sortPlayers();
		return this.players.indexOf(player) + 1;
	}
}