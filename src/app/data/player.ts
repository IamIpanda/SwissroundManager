import { Match, MatchState } from './match'
import { Config } from './config'
import {Data} from "./data";

// 对牌手的抽象
export class Player
{
    name: string;
    results: MatchState[];
    matches: Match[];

    constructor(name: string) {
        this.name = name ? name : '无名牌手';
        this.results = [];
        this.matches = [];
    }

    public win() : void { this.results.push(MatchState.Win); }
    public bye() : void { this.results.push(MatchState.Bye); }
    public lose() : void { this.results.push(MatchState.Lose); }
    public peace() : void { this.results.push(MatchState.Peace); }

    public rollback() : void { this.results.pop(); }

    protected getScore() : number
    {
        let sum = 0;
        for (let result of this.results)
            sum += Config.ResultScore(result);
        return sum;
    }
    public get score() : number { return this.getScore(); }

    public getResultCount(searchingResult : MatchState) : number
    {
        let count = 0;
        for (let result of this.results)
            if (result == searchingResult)
                count += 1;
        return count;
    }

    public get winCount(): number { return this.getResultCount(MatchState.Win); }
    public get loseCount(): number { return this.getResultCount(MatchState.Lose); }
    public get peaceCount(): number { return this.getResultCount(MatchState.Peace); }
    public get byeCount(): number { return this.getResultCount(MatchState.Bye); }

    public get winLoseStr() : string
    {
        let str = this.winCount.toString() + '-';
        if (this.peaceCount != 0 || this.byeCount != 0)
            str += (this.peaceCount + this.byeCount).toString() + '-';
        str += this.loseCount.toString();
        return str;
    }

    protected getSmallScore() : number {
        let sum = 0;
        for (let match of this.matches)
            if (match.state == MatchState.Win && this == match.player1)
                sum += match.player2.score;
            else if (match.state == MatchState.Lose && this == match.player2)
                sum += match.player1.score;
            else if (match.state == MatchState.Peace)
                sum += match.anotherPlayer(this).score / 2;
        return sum;
    }

    public get smallScore() : number { return this.getSmallScore(); }

    public get rank() { return Data.getRank(this); }
}