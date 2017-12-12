import { Round } from './round'
import { Player } from './player'
import { Match } from './match'
import {Game} from "./game";

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

	static cachedCycleData : Map<Player, Array<Match>> = new Map();
	private static decycleData()
    {
        Data.cachedCycleData.clear();
        for(let player of Data.players)
        {
            // Data.cachedCycleData.set(player, player.matches);
            player.matches.length = 0;
        }
    }

    private static recycleData()
    {
        for (let round of Data.rounds)
            for(let match of round.matches)
            {
                match.player1.matches.push(match);
                match.player2.matches.push(match);
            }
    }

    public static saveData(dataName: string)
    {
        let data = Data.readStorageData();
        Data.decycleData();
        data[dataName] = { name: Game.gameName, roundCount: Game.rounds, players: Data.players, rounds: Data.rounds };
        console.log(data[dataName]);
        window.localStorage.savedData = JSON.stringify(data);
        Data.recycleData();
    }

    public static loadData(dataName: string): boolean
    {
        let data = Data.readStorageData()[dataName];
        if (data)
        {
            Data.players = data.players;
            Data.rounds = data.rounds;
            Game.gameName = data.name;
            Game.rounds = data.roundCount;
            Data.recycleData();
            return true;
        }
        else
            return false;
    }

    public static getDataList()
    {
        return Object.keys(Data.readStorageData());
    }

    public static removeData(dataName: string)
    {
        let data = Data.readStorageData();
        data.dataName = null;
        window.localStorage.savedData = JSON.stringify(data);
    }


    public static readStorageData()
    {
        let str = window.localStorage.savedData;
        if (str) return JSON.parse(str);
        else return {}
    }
}