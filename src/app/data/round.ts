import { Data } from './data'
import { Match, MatchState } from './match'
import { Player } from './player'

export class Round
{
    matches : Match[];
    byePlayer : Player;
    order: number;

    public constructor(order : number)
    {
        this.matches = [];
        this.byePlayer = null;
        this.order = order;
    }

    public generate(players : Player[]) : Match[]
    {
        console.log('');
        let operatingPlayers = players.slice(0); // clone;
        // 随机决定轮空玩家
        if (players.length % 2 == 1)
        {
            let byeIndex = Math.floor(Math.random() * players.length);
            this.byePlayer = players[byeIndex];
            operatingPlayers.splice(byeIndex, 1);
            let byeMatch = new Match(this.byePlayer, null, 0);
            byeMatch.state = MatchState.Bye;
        }
        // 为玩家排序
        operatingPlayers = this.sort(operatingPlayers);
        // 贪心匹配
        while (operatingPlayers.length > 0)
        {
            let matchingPlayerA = operatingPlayers[0];
            let matchingPlayerBIndex = 1;
            while(Data.hasMet(matchingPlayerA, operatingPlayers[matchingPlayerBIndex]))
            {
                matchingPlayerBIndex += 1;
                if (matchingPlayerBIndex >= operatingPlayers.length)
                    return null;
            }
            let matchingPlayerB = operatingPlayers[matchingPlayerBIndex];
            this.matches.push(new Match(matchingPlayerA, matchingPlayerB, this.matches.length + 1));
            operatingPlayers.splice(matchingPlayerBIndex, 1);
            operatingPlayers.splice(0, 1);
        }
        return this.matches;
    }

    public sort(players : Player[]) : Player[]
    {
        players.sort(
            function(playerA, playerB) : number {
                if (playerA.score == playerB.score)
                    return Math.random() > 0.5 ? 1 : -1;
                else
                    return playerB.score - playerA.score;
            }
        );
        return players;
    }

    public startAll() : void
    {
        for (let match of this.matches)
            if (match.state == MatchState.Waiting)
                match.state = MatchState.Matching;
    }

    public forceStartAll() : void
    {
        for (let match of this.matches)
                match.state = MatchState.Matching;
    }

    public canStart() : boolean
    {
        for (let match of this.matches)
            if (match.state != MatchState.Waiting)
                return false;
        return true;
    }

    public canFinish() : boolean
    {
        for (let match of this.matches)
            if (match.state == MatchState.Waiting || match.state == MatchState.Matching)
                return false;
        return true;
    }

    public finish() : void {
        for (let match of this.matches)
            if (match.state == MatchState.Waiting || match.state == MatchState.Matching)
                match.state = MatchState.Peace;
    }

    public searchPlayer(player: Player): Match
    {
        if (player == this.byePlayer)
            return null;
        for (let match of this.matches)
            if (match.containPlayer(player))
                return match;
        return null;
    }

    public searchPlayers(player1 : Player, player2: Player) : Match
    {
        for (let match of this.matches)
            if (match.containPlayers(player1, player2))
                return match;
        return null;
    }
}