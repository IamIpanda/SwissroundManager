import { Player } from './player'

export enum MatchState
{
    Win,
    Lose,
    Peace,
    Bye,
    Matching,
    Waiting
}

export class Match {
    player1: Player;
    player2: Player;
    order: number;
    actualState: MatchState;

    public constructor(player1: Player, player2: Player, order: number)
    {
        this.player1 = player1;
        this.player2 = player2;
        this.order = order;
        player1.matches.push(this);
        if (player2 != null)
            player2.matches.push(this);
        this.actualState = MatchState.Waiting;
    }

    protected getState() : MatchState { return this.actualState }
    protected setState(state : MatchState)
    {
        if (state == MatchState.Win || state == MatchState.Lose || state == MatchState.Peace)
        {
            this.player1.rollback();
            this.player2.rollback();
        }
        switch(state)
        {
            case MatchState.Win:
                this.player1.win();
                this.player2.lose();
                break;
            case MatchState.Lose:
                this.player1.lose();
                this.player2.win();
                break;
            case MatchState.Peace:
                this.player1.peace();
                this.player2.peace();
            case MatchState.Bye:
                this.player1.bye();
        }
        this.actualState = state;
    }

    public get state() : MatchState { return this.getState(); }
    public set state(value: MatchState) { this.setState(value); }

    public containPlayer(player: Player) : boolean { return this.player1 == player || this.player2 == player; }
    public containPlayers(player1: Player, player2: Player) : boolean { return (this.player1 == player1 && this.player2 == player2) || (this.player1 == player2 && this.player2 == player1); }

    public get str() : string { return this.player1.name + '对阵' + this.player2,name; }
    public get stateStr() : string {
        switch (this.state)
        {
            case MatchState.Win:
                return this.player1.name + '胜利';
            case MatchState.Lose:
                return this.player2.name + '胜利';
            case MatchState.Peace:
                return '双方平局';
            case MatchState.Bye:
                return '本轮轮空';
            case MatchState.Waiting:
                return '等待开始';
            case MatchState.Matching:
                return '正在进行';
        }
    }

    public anotherPlayer(player: Player) : Player
    {
        if (!player) return this.player1;
        if (player != this.player1 && player != this.player2) return null;
        return player == this.player1 ? this.player2 : this.player1;
    }

    public resultStr(player : Player) : string
    {
        if (!player) player = this.player1;
        if (player != this.player1 && player != this.player2) return '';
        switch (this.state)
        {
            case MatchState.Win:
                return this.player1 == player ? '胜利' : '败北';
            case MatchState.Lose:
                return this.player2 == player ? '胜利' : '败北';
            case MatchState.Peace:
                return '平局';
            case MatchState.Bye:
                return '轮空';
            case MatchState.Matching:
                return '正在进行';
            case MatchState.Waiting:
                return '等待开始';
        }
        return '';
    }

    public get reportStr() : string
    {
        switch(this.state)
        {
            case MatchState.Win:
                return this.player1.name + '战胜了' + this.player2.name;
            case MatchState.Lose:
                return this.player2.name + '战胜了' + this.player1.name;
            case MatchState.Bye:
                return this.player1.name + '本轮轮空';
            case MatchState.Peace:
                return this.player1.name + '与' + this.player2.name + '战平';
            case MatchState.Matching:
                return this.player1.name + '与' + this.player2.name + '正在进行对局';
            case MatchState.Waiting:
                return this.player1.name + '与' + this.player2.name + '正在等待开始';
        }
        return '';
    }
}